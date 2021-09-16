const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibG9ib2t1biIsImEiOiJja3JjcDAyaWEzN25jMnVuM3V5cHFwYXFiIn0.MnA131GCHCE6P4FCc3oonA&limit=1'

   request({url, json: true}, (error, {body}) => {

       if(error){
           callback('Unable to connect to location services!', undefined)
       } else if(body.features.length === 0){
           callback('Unable to find location. Try another search', undefined)

       } else {
           var features = body.features[0]
           callback(undefined, {
               latitude: features.center[1],
               longitude:  features.center[0],
               location: features.place_name

           })
       }


   })

}


module.exports = geocode