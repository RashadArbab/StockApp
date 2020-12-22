const express = require("express")
const bodyParser = require ("body-parser")
const users = require('./Users')
var app = express() ; 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 


app.use('/api/users' , users)  ;

var port = 15663 || process.env.PORT
app.listen(port) 
