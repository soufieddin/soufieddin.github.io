  
export const saveArrayInLocalStorage = (quiz) => {
    const quizString = JSON.stringify(quiz);
    localStorage.setItem('quiz', quizString);
  }

  export const deleteArrayInLocalStorage = (quiz) => {
    const quizString = JSON.stringify(quiz);
    localStorage.removeItem('quiz', quizString);
    return JSON.parse(quizString);
  }
  
  export const getArrayFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    if(!data) return [];
  
    return JSON.parse(data);
  }
