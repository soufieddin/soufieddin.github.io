'use strict';
let startCalc = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, date;

startCalc.addEventListener('click', function(){
    date = prompt("Enter the date in format YYYY-MM-DD", '');
    money = +prompt("What's your budget for the month?", '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("What's your budget for the month?", '');
    }
    appData.budget = money;
    appData.timeData = date;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(date)).getFullYear();
    monthValue.value = new Date(Date.parse(date)).getMonth() +1;
    dayValue.value = new Date(Date.parse(date)).getDate();

});

expensesItemBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let q = expensesItem[i].value,
            a = expensesItem[++i].value;

        if ((typeof (q)) === 'string' && (typeof (q)) != null && (typeof (a)) != null && q != '' && a != '' && q.length < 50) {
            console.log("done");
            appData.expenses[q] = a;
            sum += +a;
        } else {
            console.log ("bad result");
            i--;
        }
    }
    expensesValue.textContent = sum;
});
optionalExpensesBtn.addEventListener('click', function(){
    for (let i=0; i<optionalExpensesItem.length; i++){
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ', ';
    }
});
countBudgetBtn.addEventListener('click', function(){
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed(1);
        daybudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Minimum level";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 300) {
            levelValue.textContent = "Middle level";
        } else if (appData.moneyPerDay > 300) {
            levelValue.textContent = "High level";
        } else {
            levelValue.textContent = "fault";
        }
    } else {
        daybudgetValue.textContent = "something went wrong !!!"
    }


});

chooseIncome.addEventListener('input', function(){
    let incoms = chooseIncome.value;
    appData.income = incoms.split(", ");
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){
    if (appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
chooseSum.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +chooseSum.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

    }
});
percentValue.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +chooseSum.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: date,
    savings: false
};
