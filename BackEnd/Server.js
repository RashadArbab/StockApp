const express = require("express")
const bodyParser = require ("bodyParser")
const users = require('Users')
var app = express() ; 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 

//mongodb+srv://RashadArbab:<password>@cluster0.3gbxy.mongodb.net/<dbname>?retryWrites=true&w=majority
app.use('/user' , users)  

var port = 4000 || process.env.PORT
app.listen(port) 
