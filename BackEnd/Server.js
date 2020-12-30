const express = require("express")
const bodyParser = require ("body-parser")
const users = require('./Users')
var app = express() ; 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 


app.use('/api/users' , users)  ;


var port = process.env.PORT || 15663
app.listen(port) 
