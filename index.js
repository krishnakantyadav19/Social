const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cookieParser())

app.use(express.static('./assets'))

app.use(expressLayouts)
//extract StyleSheet and Script from sub pages into layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use('/', require('./routes'))

app.set('view engine','ejs')
app.set('views','./views')


app.listen(port, function(err) {
    if(err){
        console.log(`Error in running in server: ${err}`)
    }
    console.log('Server start on http://localhost:8000')
})