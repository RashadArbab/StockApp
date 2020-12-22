const express = require("express")
const bodyParser = require ("bodyParser")
const users = require('Users')
var app = express() ; 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 

//mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/<YOUR_DB>?retryWrites=true&w=majority
app.use('/users' , users)  

var port = 4000 || process.env.PORT
app.listen(port) 
