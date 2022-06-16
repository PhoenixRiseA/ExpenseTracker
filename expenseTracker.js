function saveToLocalStorage(event) {
    event.preventDefault();
    var amount = event.target.amount.value;
    var description = event.target.description.value;
    var typeOfExpense = event.target.typeOfExpense.value;
    
    const obj = {
        amount,
        description,
        typeOfExpense
    }
    localStorage.setItem(obj.amount,JSON.stringify(obj));

    showExpenses(obj);
}

window.addEventListener("DOMContentLoaded", ()=>{
    var localStorageObj = localStorage;
    var localStorageKeys = Object.keys(localStorageObj)

    for(let i=0; i< localStorageKeys.length; i++){
        var key = localStorageKeys[i];
        var expenseDetailsString = localStorageObj[key];
        var expenseDetailsObj = JSON.parse(expenseDetailsString);
        showExpenses(expenseDetailsObj)
    }
})

function showExpenses(expense){

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('typeOfExpense').value = '';

    

    var parentNode = document.getElementById("listOfExpenses");
    var childHTML = `<li id = ${expense.amount}>${expense.amount}-${expense.description}-${expense.typeOfExpense}<button onclick=deleteExpense('${expense.amount}')>del</button><button onclick=editExpense('${expense.amount}','${expense.description.replaceAll(/\s/g,'')}','${expense.typeOfExpense}')>edit</button></li>`;
    parentNode.innerHTML = childHTML + parentNode.innerHTML;
}

function deleteExpense(amount){
    console.log(amount);
    localStorage.removeItem(amount);
    removeExpenseFromScreen(amount);
}

function removeExpenseFromScreen(amount){
    var parentNode = document.getElementById('listOfExpenses');
    var childNodeToBeDeleted = document.getElementById(amount);

    parentNode.removeChild(childNodeToBeDeleted)
}

function editExpense(amount, description, typeOfExpense){
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('typeOfExpense').value = typeOfExpense;
    
    deleteExpense(amount);
    
    
}
