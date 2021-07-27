const express = require('express')
const app = express()
const port = 8000

app.use('/', require('./routes'))




app.listen(port, function(err) {
    if(err){
        console.log(`Error in running in server: ${err}`)
    }
    console.log('Server start on http://localhost:8000')
})