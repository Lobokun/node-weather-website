const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        // arguments use in the handle bar file index.hbs
        title: 'Weather',
        name: 'Lobo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'lobo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus, diam id vehicula vestibulum, orci mauris pellentesque orci, aliquet efficitur lorem turpis ut nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam sed vulputate eros. Pellentesque dignissim mi a dui suscipit, non laoreet dolor aliquam. Nam id massa elit. Aliquam id ligula in dolor ornare malesuada. Praesent laoreet mi a velit iaculis egestas. Morbi metus metus, placerat et sodales sed, cursus ut erat. Integer a molestie lorem. Ut ac diam nec erat porttitor maximus at nec justo. Nullam fermentum egestas elit sed auctor. Morbi aliquet sodales nisi vel imperdiet. Curabitur lacinia gravida purus, quis elementum turpis tincidunt eu. Aenean a aliquam sapien.',
        name: 'lobo'
    })
})

app.get('/weather', (req, res) => {
    var address= req.query.address
    if(!address){
        return res.send({
            error: 'You must provide an address term'
        })
    }

    // Add Geocode and Forcast methods
    geocode(address, (error, {latitude, longitude} = {}) => {

        if(error){
            return res.send({
                error: error
            })
        }
    
         forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            
            res.send({
                description: forecastData.description, 
                name: forecastData.name,
                region: forecastData.region,
                country: forecastData.country,
                temperature: forecastData.temperature,
                forecast: forecastData.forecast
            })

          })
     })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

// 404 page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'lobo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not Found',
        name: 'lobo'
    })
})

// visit expressjs.com => api reference for documentation when using express
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})