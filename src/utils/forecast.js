const request = require('request')

const forecast = (latitude, longitude, callback) => {
 
    const url = 'http://api.weatherstack.com/current?access_key=f4ca8240eb09dda102f030a214c5523c&query=' + latitude + ',' + longitude + '&units=f'

 request({url, json:true}, (error, {body}) => {
     if(error){
         callback('Unable to connect to weather service!', undefined)
         
     }
     else if(body.error){
         callback('Unable to find location', undefined)

     }
     else{

         var current = body.current
         var location = body.location
         callback(undefined, {
             temperature :  current.temperature,
             feelslike: current.feelslike,
             description: current.weather_descriptions[0],
             name: location.name,
             country: location.country,
             region: location.region

         })
       

     }

 })

}


module.exports = forecast