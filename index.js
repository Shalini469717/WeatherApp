const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
// const path = require('path')

const app = express()
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post('/',(req,res)=>{
    const apikey = "{your api key}"
    const cityname = req.body.cityname
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apikey+"&units=metric",(response) =>{
        response.on('data',(data)=>{
        const weatherapp =JSON.parse(data)
        const temp = weatherapp.main.temp
        const mintemp = weatherapp.main.temp_min
        const maxtemp = weatherapp.main.temp_max
        const pressure = weatherapp.main.pressure
        const humidity = weatherapp.main.humidity
        const desc = weatherapp.weather[0].description
        const icon = weatherapp.weather[0].icon
        const iconurl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
        res.write("<h1>The temp in " + cityname + " is " + temp + " degree celcius</h1>")
        res.write("<h2> min temp : "+mintemp+"</h2>")
        res.write("<h2> max temp : " + maxtemp + "</h2>")
        res.write("<h2> pressure : " + pressure + "</h2>")
        res.write("<h2> humidity : " + humidity + "</h2>")
        res.write("<h2> " + desc + "</h2>")
        res.write("<img src = " + iconurl + ">")
        res.send()})
    })

})


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
