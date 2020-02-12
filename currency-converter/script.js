const currencyOne = document.getElementById("currency-one")
const currencyTwo = document.getElementById("currency-two")

const amountOne = document.getElementById("amount-one")
const amountTwo = document.getElementById("amount-two")

const swapButton = document.querySelector("button")
const rate = document.getElementById("rate")

//fetchjes and updates
function calculate(){
  console.log("DUDE")

  const currencyOne_value = currencyOne.value
  const currencyTwo_value = currencyTwo.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne_value}`)
    .then(res=>res.json())
    .then(data=>{
      const rateValue= data.rates[currencyTwo_value]
      //console.log(data)
      console.log(rateValue)

      rate.innerText = `${currencyOne_value} = ${rateValue} ${currencyTwo_value}`
      amountTwo.value = (amountOne.value * rateValue).toFixed(2) //2 decimal
    })
}


//Eventlisteners at bottom
currencyOne.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
currencyTwo.addEventListener('change', calculate)
amountTwo.addEventListener('change', calculate)

swapButton.addEventListener('click',()=>{
  let temp= currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = temp
  calculate()
})

calculate;
