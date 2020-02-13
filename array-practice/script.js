const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//https://randomuser.me/api

let data = [];


async function getRandomUser(){
  // fetch('https://randomuser.me/api')
  // .then(res => res.json())
  // .then(console.log(data))
  const res = await fetch('https://randomuser.me/api')
  const dat = await res.json()
  //console.log(data)

  const randomUser = dat.results[0]
  const newUser = {
    name: `${randomUser.name.first} ${randomUser.name.last}`,
    money: Math.floor(Math.random()*1500000)
  }
  addData(newUser)

}


function addData(object){
  data.push(object)
  updateDOM()
}

function doubleMoney(){
  data = data.map(pers=>{
    return {name: pers.name, 
      money: pers.money*2}
    
      // return {...pers,
      // money: pers.money*2}
  })

  updateDOM()
}

//sort by richest dudes
function sortDudes(){
  data.sort((firstMon,nextMon)=>
    nextMon.money-firstMon.money

  )
  updateDOM()
}

function showMill(){
  data = data.filter(pers=>
    pers.money > 999999
  )
  updateDOM()
}


function totalMoney(){
  const total = data.reduce((tot, pers)=>(tot+=pers.money),0)

  
  const wealthElement =document.createElement('div')
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`
  main.appendChild(wealthElement)
}




//updating DOM
function updateDOM(origData =data){
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  origData.forEach(pers=>{
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${pers.name}</strong>${formatMoney(pers.money)
    }`
    
    main.appendChild(element)
  })
}

//formatting
function formatMoney(num){
  // from here: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}


addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortDudes)
showMillionairesBtn.addEventListener('click', showMill)
calculateWealthBtn.addEventListener('click', totalMoney)
