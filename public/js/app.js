console.log('Client side file script is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

//messageOne.textContent = 'From'

weatherForm.addEventListener('submit', (e) => {
    // prevents auto postback
    e.preventDefault()

    const location = searchElement.value
    
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    const url = '/weather?address=' + location
    fetch(url).then((response) => {

    response.json().then((data) => {

        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.name + ', ' + data.region + ', ' + data.country
            messagetwo.textContent = data.forecast
           
        }
        
    })

})

})