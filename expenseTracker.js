function saveToCloud(event) {
    event.preventDefault();
    var amount = event.target.amount.value;
    var description = event.target.description.value;
    var typeOfExpense = event.target.typeOfExpense.value;
    
    const obj = {
        amount,
        description,
        typeOfExpense
    }
    
    axios.post("https://crudcrud.com/api/028b407c8e9e46d3b47ae9c5a2303daa/ExpenseData", obj)
        .then((response) => {
            showExpenses(response.data);
            //console.log(response);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
            console.log(err)
        })
    //localStorage.setItem(obj.amount,JSON.stringify(obj));
    // showExpenses(obj);
}

window.addEventListener("DOMContentLoaded", ()=>{
    // var localStorageObj = localStorage;
    // var localStorageKeys = Object.keys(localStorageObj)

    // for(let i=0; i< localStorageKeys.length; i++){
    //     var key = localStorageKeys[i];
    //     var expenseDetailsString = localStorageObj[key];
    //     var expenseDetailsObj = JSON.parse(expenseDetailsString);
    //     showExpenses(expenseDetailsObj)
    // }
    axios.get("https://crudcrud.com/api/028b407c8e9e46d3b47ae9c5a2303daa/ExpenseData")
    .then((response)=>{
        console.log(response);
        for(let i = 0; i< response.data.length; i++){
            showExpenses(response.data[i]);
        }
    })
    .catch((err) => console.log(err));
})

function showExpenses(expense){

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('typeOfExpense').value = '';

    

    var parentNode = document.getElementById("listOfExpenses");
    //var childHTML = `<li id = ${expense.amount}>${expense.amount}-${expense.description}-${expense.typeOfExpense}<button onclick=deleteExpense('${expense.amount}')>del</button><button onclick=editExpense('${expense.amount}','${expense.description.replaceAll(/\s/g,'')}','${expense.typeOfExpense}')>edit</button></li>`;
    var childHTML = `<li id = ${expense._id}>${expense.amount}-${expense.description}-${expense.typeOfExpense}<button onclick=deleteExpense('${expense._id}')>del</button><button onclick=editExpense('${expense._id}','${expense.amount}','${expense.description.replaceAll(/\s/g,'')}','${expense.typeOfExpense}')>edit</button></li>`
    parentNode.innerHTML = childHTML + parentNode.innerHTML;
}

function deleteExpense(_id){
    // console.log(amount);
    // localStorage.removeItem(amount);
    // removeExpenseFromScreen(amount);
    axios.delete(`https://crudcrud.com/api/028b407c8e9e46d3b47ae9c5a2303daa/ExpenseData/${_id}`)
        .then(() => {
            removeExpenseFromScreen(_id);
            //console.log(response);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
            console.log(err)
        })
}

function removeExpenseFromScreen(_id){
    var parentNode = document.getElementById('listOfExpenses');
    var childNodeToBeDeleted = document.getElementById(_id);

    parentNode.removeChild(childNodeToBeDeleted)
}

function editExpense(_id,amount, description, typeOfExpense){
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('typeOfExpense').value = typeOfExpense;
    
    deleteExpense(_id);
    
    
}
