const e = require('express');
var app = e(); 
const router = e.Router(); 
const mongo = require('mongoose');


var userModel = mongo.model('users' , {name: String , email: String, pass: String , 
    Stocks : [{Ticker: String , Market: String , Notes : [String]}]}) ; 

mongo.connect('mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/StockApp?retryWrites=true&w=majority' , 
{useNewUrlParser: true , useUnifiedTopology :true , useFindAndModify : false} ,(err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('mongodb connection successful'); 
    }
}); 


router.post(`/register/:name/:email/:pass/:stock` , (req,res)=>{
    console.log("users-22: " + req.params.name); 
    var name = req.params.name; 
    var email = req.params.email; 
    var pass = req.params.pass; 
    var stock = req.params.stock; 
    var newUser = new userModel({name:name , email:email , pass:pass , stock:stock}); 

    newUser.save((err)=>{
        if(err){
            res.send("error creating user: users-30"); 
        }
        else {
            res.send(`user registration successful: welcome ${name}`); 
        }
    })
});
   



module.exports = router; 

//mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/<YOUR_DB>?retryWrites=true&w=majority