const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillsBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const CalcWealthBtn = document.getElementById("calc-wealth");

let data = [];

// fetch random user and add money
async function getRandomUser(){
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

function addData(obj){
    data.push(obj);

    updateDOM();
}

// update DOM
function updateDOM(providedData = data){

    // clear the main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    // you can include 'index' in the params if you need access to the index
    providedData.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    
        main.appendChild(element);
    });
}

// format number as money
/*
    currency values:
    - Kuwaiti Dinar (KWD) 
    - Bahraini Dinar (BHD) 
    - Omani Rial (OMR) 
    - Jordanian Dinar (JOD) 
    - British Pound (GBP) 
    - Gibraltar Pound (GIP) 
    - Cayman Islands Dollar (KYD) 
    - South African Rand (ZAR)
    - Swiss Franc (CHF) 
    - Euro (EUR) 
    - United States Dollar (USD) 

*/
function formatMoney(amount){
    const amountFormat = new Intl.NumberFormat("en-US",{
        style: "currency",
        currency: "EUR"
    });

    return amountFormat.format(amount);
}

// double amount of money
function doubleAmount(){
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });

    updateDOM();
    
}


// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleAmount);