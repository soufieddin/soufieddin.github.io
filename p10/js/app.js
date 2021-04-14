// IMPORTS START -->

import { APP_TITLE } from './consts.js';
import { getQuestions } from './api.js';
import { createElement, createOption, createSelect, createAnswerElement} from './elementsHtml.js';
import { saveArrayInLocalStorage , getArrayFromLocalStorage, deleteArrayInLocalStorage  } from "./localstorage.js";

// <-- IMPORTS END

const app = {
    async init(){
        document.title = APP_TITLE;
        this.categories = ['Code','Docker', 'Linux', 'SQL', 'DevOps', 'CMS', 'bash'];
        this.levels = ['Easy', 'Medium','Hard '];
        this.amounts = [5, 10, 15, 20];
        this.level;
        this.category;
        this.amount = 10;
        this.questions = [];
        this.answers = [];
        this.quiz;
        this.seconds = 30 * 1000;
        this.cacheElements();
        this.registerListeners();
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = 0;
        this.timeLeft = 0;
    },
    cacheElements(){
        this.$appContainer = document.querySelector('#appOptions');
        this.$splashContainer = document.querySelector('#splash');
        this.$optionsSection = document.querySelector('.options');
    },
    registerListeners(){
        //splash screen
        document.addEventListener('DOMContentLoaded',(e)=>{
          setTimeout(()=>{
            this.$splashContainer.classList.add('splash-end')
          },3500);
          this.createUserOptions();
        })
    },
    createUserOptions(){
        const levels = this.levels;
        const categories = this.categories.sort();
        const amount = this.amounts;
    
        //create levels options
        createOption("div","h4","div",levels,"levels",'Сhoose difficulty:',this.$optionsSection,"radio","level",this.level);
    
        //toggle active class between levels and get choosen level value
        const MyLevels = document.querySelector('.levels');
        MyLevels.addEventListener('click',(i)=>{
            i.preventDefault();
            const activated = document.querySelector(".levels .active");
            if(activated){  
                activated.classList.remove('active');
                activated.style.color = '#FFBB00';
            }
            i.target.classList.add('active');
            i.target.style.color = '#441D4F';
            this.level = i.target.innerText;
            console.log(this.level);
            })
    
        // create amout options
        createOption("div","h4","div",amount,"amount",'Сhoose the number of questions:',this.$optionsSection,"radio","amount",this.amount);
    
        //toggle active class between amounts and get choosen amount value
        const MyAmounts = document.querySelector('.amount');
        MyAmounts.addEventListener('click',(i)=>{
            i.preventDefault();
            const activated = document.querySelector(".amount .active");
            if(activated){
                activated.classList.remove('active');
                activated.style.color = '#FFBB00';
            }
            i.target.classList.add('active');
            i.target.style.color = '#441D4F';
            this.amount = i.target.innerText;
            console.log(this.amount);
            })
        
        // create dropdown list of categories
        createSelect (categories,this.$optionsSection,"div",'categories','select','Сhoose category:')
        const mySelection = document.querySelector('.select');
        mySelection.addEventListener('change',(e)=>{
            this.category = e.target.value;
        });
        let btn = createElement('button',['btn-start'],{});
        btn.innerHTML = 'Start';
        this.$optionsSection.appendChild(btn);
        const startBtn = document.querySelector('.btn-start'); //create quiz starts after click on start
        let clicked = false;// to avoid double click
        startBtn.addEventListener('click',async(e)=>{
            if(!clicked){
                clicked = true;
                this.questions = await getQuestions(this.amount,this.category,this.level); //api
                saveArrayInLocalStorage(this.questions); //save quiz in localStorage
                this.quiz = getArrayFromLocalStorage('quiz');
                this.createQuiz();
                }
          });
      },
      createQuiz(){
        this.$optionsSection.innerHTML = ""; //make this section empty
        let timeDiv = createElement('div',['timer']); //create field for coutdown
        let timer = createElement('h6',['time']);
        timeDiv.appendChild(timer);
        this.$appContainer.appendChild(timeDiv);
        let infoDiv = createElement('div',['info']); //create field for number of current question of all questions
        this.$appContainer.appendChild(infoDiv);
        let btns = createElement('div',["btns"]); //create field for buttons (next and stop)
        let nextBtn = createElement('button', ['next'], {});//create next button
    
        nextBtn.innerText = "Next";
        nextBtn.addEventListener('click', () => {
            this.processAnswer(true); // by clicking on next we count answer and moveing on
        });
    
        let stopBtn = createElement('button', ['btn'], {}); //create stop button
        stopBtn.innerText = "Stop";
        stopBtn.addEventListener('click', () => { //by clicking on stop button:
            this.$optionsSection.innerHTML = ""; //make this section empty
            this.currentQuestion = 0; //retutn current question to 0
            this.answers = [];            
            clearTimeout(this.timer);// clear question timer
            clearInterval(this.timeLeft);// clear question countdown
            btns.remove();// delete buttons field(next and stop) because we create it for every quiz
            infoDiv.remove();// delete info div because we create it for every quiz
            timeDiv.remove();// delete countdown div because we create it for every quiz
            this.score = 0;//return score to zero 
            deleteArrayInLocalStorage('quiz');// empty localstorage because we will create new quiz and will save it in localstorage
            this.createUserOptions();// after stoping we create options again because it was deleted
    
        });
        btns.appendChild(nextBtn)
        btns.appendChild(stopBtn);
    
        this.$appContainer.appendChild(btns);
        this.createQuestion(); //create option for every quiz 
      },
      processAnswer(fromUi) { //by clicking on next fromUi is true(answer choosed or missed)
        clearInterval(this.timeLeft); //clear coutdown
        const timerEl = document.querySelector('.timer');
        timerEl.innerHtml = ""; //make html firld of countdown empty to fill it again in new question
        if(fromUi) {
          clearTimeout(this.timer);//clear question timer
        }
        //calculate score
        this.calculateScore();
        this.currentQuestion++;//add point 
        if(this.currentQuestion < this.quiz.length) {
          this.createQuestion();//make new question while there are question an array
        } else {//if no more questions remove all this(what you see below) to start from scratch again in new quiz and create field to display score and field to display quiz overview
            this.$optionsSection.innerHTML = "";
            this.currentQuestion = 0;
            clearTimeout(this.timer);
            const nx = document.querySelector('.next');
            const t = document.querySelector('.timer');
            const i = document.querySelector('.info');
            const b = document.querySelector('.btn');
            b.innerText = "Play again";
            b.style.marginRight = "0";
            nx.remove();
            t.remove();
            i.remove();
            let sc = createElement('div',['score']);
            let details = createElement('article', ['details']);
            let detailsTitle = createElement('h4');
            detailsTitle.innerText ='Quiz Overview';
            details.appendChild(detailsTitle);
            sc.innerHTML = `your score is ${this.score} of ${this.amount}`;
            this.$optionsSection.appendChild(sc);
            this.$optionsSection.appendChild(details);
            this.createDetails();
        }
      },
      createDetails(){
        const detailsContainer = document.querySelector('.details');
        const myDetails = this.answers;
        let str = '';
        //array of objects
        myDetails.forEach((e)=>{
            let correct = e.correct;//multiple_correct_answers in array , single correct answer is string
            if(correct && correct instanceof Array){
                correct = correct.join('<br><br>');//linebreak instead of comma for multiple correct answers
            }else{
              correct =correct;
            }
            let actual = e.actual;
            if(e.actual  && actual instanceof Array){ 
                actual = actual.join('<br><br>');
            }else{
              actual = actual;
            }
            //if user didnt answer replace undefined with "string"
            str+=`
            <div class='detailItem'>
                <h5>${e.questionTitle.replaceAll('<','&lt;').replaceAll('>','&gt;')}</h5>
                <span>Your answer:</span>
                <h6>${actual && actual != undefined ? actual.replaceAll('<','&lt;').replaceAll('>','&gt;') : 'you did not answer on this question'}</h6>
                <span>Correct answer:</span>
                <h6>${correct.replaceAll('<','&lt;').replaceAll('>','&gt;')}</h6>
            </div>
            `;
        });
        detailsContainer.innerHTML = str;
        const myDetailsItem = document.querySelectorAll('.detailItem');
        for(const [i, v] of myDetailsItem.entries()){
            if (i%2==0){
                v.style.backgroundColor = '#FFBB00';
                v.style.color = '#441D4F';
            }else{
                v.style.backgroundColor = '#441D4F';
                v.style.color = '#FFBB00';
            }
        }
        console.log(myDetails)
      },
      createQuestion() {
        let innerSeconds = this.seconds;//amount of seconds for timer and countdown
        let updateTimeLeft = () => {
            const timerEl = document.querySelector('.timer');
            timerEl.innerHTML = innerSeconds / 1000;
            innerSeconds -= 1000;
        }
        this.timer = setTimeout(() => this.processAnswer(false), innerSeconds);
        updateTimeLeft();
        this.timeLeft = setInterval(updateTimeLeft, 1000);
        this.$optionsSection.innerHTML = "";
        const item = this.quiz[this.currentQuestion];
        const inputType = item.multiple_correct_answers === "true" ? "checkbox" : "radio"; //make checkbox answers for multiple_correct_answers questions, and radio buttons answers sor singel correct answer questions
        const question = createAnswerElement(item, inputType, 'quest', 'div', 'h5', 'answerOption')
        this.$optionsSection.appendChild(question);
        const info = document.querySelector('.info');
        info.innerHTML= `${this.currentQuestion+1} out of ${this.amount} questions`;//start from one instead of zero
        if(this.currentQuestion > this.quiz.length){
            this.currentQuestion = 0;
        }
      },
      parseAnswerTitle(answer) {
        return answer.substring(0, answer.lastIndexOf('_'));//return just answer_a from answer_a_correct
      },
      calculateScore() {
        const question = this.quiz[this.currentQuestion];
        if(!question) {
          console.log(`ERROR:  current question: ${this.currentQuestion}`);
          return;
        }
        if(question.multiple_correct_answers === "false"){//make object of question, correct answer, users answer for single correct answer question
          let correctAnswerId = "";
          this.answers[this.currentQuestion] = {
            questionTitle: question.question
          };
          for(const key in question.correct_answers){
            if(question.correct_answers[key] === "true"){
              correctAnswerId = key;
              this.answers[this.currentQuestion].correct = question.answers[this.parseAnswerTitle(correctAnswerId)];
              break;
            }
          }
          const answerElement = document.getElementById(correctAnswerId);          
          if(answerElement && answerElement.checked) {//user gets point if his answer/s is/are the same as correct answers
            this.score++;
          }      
          const allAnswers = document.querySelectorAll('.answerOption');
          this.answers[this.currentQuestion].actual = //using 'call' makes using find in nodelist possible (find() for arrays), go inside my answers if input checked get the value of label
            [].find.call(allAnswers,n => [].find.call(n.children, c => c.checked))?.lastElementChild?.innerText;
          
        } else {//make object of question, correct answers, users answers for multiple correct answers question
          let correctAnswerIds = [];
          this.answers[this.currentQuestion] = {
            questionTitle: question.question,
            correct: [],
            actual: []
          };
          for(const key in question.correct_answers){
            if(question.correct_answers[key] === "true"){
              correctAnswerIds.push(key);
              this.answers[this.currentQuestion].correct.push(question.answers[this.parseAnswerTitle(key)]);
            }
          }
          let valid = true; //for counting score 
          for (const key in correctAnswerIds) {
            const answerElement = document.getElementById(correctAnswerIds[key]);
            if(!answerElement || !answerElement.checked) {
              valid = false;
            }
          }
          const allAnswers = document.querySelectorAll('.answerOption');
          const filteredOptions = [].filter.call(allAnswers,n => [].find.call(n.children, c => c.checked));//using 'call' makes using find ,filter and map in nodelist possible, we go here inside my answers -> filter them -> get all answers with checked inputs -> map them and return the value of label for each of them
          this.answers[this.currentQuestion].actual = [].map.call(filteredOptions, opt => opt?.lastElementChild?.innerText);
            
          valid && this.score++;// if valid is true +point
        }    
      }
}

// start the app
app.init();