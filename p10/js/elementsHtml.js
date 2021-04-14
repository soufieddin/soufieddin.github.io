/**
 * 
 Function to create any html element
*/

export const createElement = function (el, classList = [], attrs = null) {
    const element = document.createElement(el);
    if(classList && classList.length > 0){
        element.classList.add(...classList)
    }
    if(attrs) {
        for(const key in attrs) element.setAttribute(key, attrs[key]);
    }
    return element;
}

/**
 * 
 Function to create options(radio buttons)
*/

export const createOption = function(parentType,titleType,childType,arr,classParentDiv,text = "",section,classChildDiv,inputName){
    let optionDiv = createElement(parentType,[classParentDiv]);
    let optionTitle = createElement(titleType);
    optionTitle.innerText = text;
    section.appendChild(optionTitle);
    arr.forEach((item)=>{
        let optionChoice = createElement(childType,[classChildDiv]);
        let optionInput = createElement('input',[],{type:'radio',name:inputName,value:`${item}`});
        let optionLabel = createElement('label',[],{for:`${item}`});
        optionLabel.innerHTML =`${item}`;
        optionChoice.appendChild(optionInput);
        optionChoice.appendChild(optionLabel);
        optionDiv.appendChild(optionChoice);
    });

    section.appendChild(optionDiv);
}

/**
 * 
 Function to create dropdown list
*/

export const createSelect = function (arr,section,parentType,parentCls,childCls,defaultOptionSelect){
    let selectDiv = createElement(parentType,[parentCls]);
    let listSelect = createElement('select',[childCls]);
    let defaultSelectOption = createElement('option');
    defaultSelectOption.innerText =defaultOptionSelect;
    listSelect.appendChild(defaultSelectOption);
    selectDiv.appendChild(listSelect);
    arr.forEach((item)=>{
        let option = createElement('option',[],{value:`${item}`});
        option.innerHTML = `${item}`;
        listSelect.appendChild(option);
    });
    section.appendChild(selectDiv);
}

/**
 * 
 Function to create answers for question
*/

export const createAnswerElement = function(item, type, cls, parentType, childType, answerCls) {
    let rootDiv = createElement(parentType,[cls]);
    let questionTitle = createElement(childType);
    questionTitle.innerText = item.question;
    rootDiv.appendChild(questionTitle);
    for(let option in item.answers){
      if(item.answers[option] === null){
        continue;
      }
      let optionDiv = createElement(parentType, [answerCls]);
      let optionElement = createElement('input', [], 
      { 
        type: type, 
        id: `${option}_correct`, //_correct added to compare it then with the right answer
        name: `group${item.id}`
      });
      let label = createElement('label', [], 
      {
        for: `${option}`
      });
      label.innerText = item.answers[option];
      optionDiv.appendChild(optionElement);
      optionDiv.appendChild(label);
      rootDiv.appendChild(optionDiv);
    }
    return rootDiv;
  }
