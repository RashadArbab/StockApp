const e = require('express');
var app = e(); 
const router = e.Router(); 
const mongo = require('mongoose');


var userModel = mongo.model('users' , {name: String , email: String, pass: String , 
    stock : [{Ticker: String, Market: String , Notes : [String]}]}) ; 

mongo.connect('mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/StockApp?retryWrites=true&w=majority' , 
{useNewUrlParser: true , useUnifiedTopology :true , useFindAndModify : false} ,(err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('mongodb connection successful'); 
    }
}); 


router.post(`/register/newUser/:name/:email/:pass/stock/:ticker/:market/Notes/:note` , (req,res)=>{
    console.log(`users-22: 
    ${req.params.name}
    ${req.params.email}
    ${req.params.pass}
    ${req.params.ticker}
    ${req.params.market}
    ${req.params.note.split(',')} `); 
    var name = req.params.name; 
    var email = req.params.email; 
    var pass = req.params.pass; 
    var stock = {
        Ticker: req.params.ticker ,
        Market: req.params.market ,
        Notes: req.params.note.split(',')
    }
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

router.post(`/login/id/:email/:password` , (req, res)=>{
    var email = req.params.email; 
    var password = req.params.password  ;
    console.log(`login request ${email} ${password}` )

    
    userModel.findOne({email:email} , (err, documents)=>{
        if(err){
            res.send(err); 
        }
        else if (documents === null){
            res.send('user does not exist'); 
        }else if(documents.pass !== password){
            res.send('incorrect password'); 
        }else {
            console.log(`authenticated user ${email} ${password}`)
            res.send([`access granted` , documents.name]);
        }
    })
}); 

router.post(`/watchlist/id/:email/:password` , (req, res)=>{
    var email = req.params.email; 
    var password = req.params.password  ;
    console.log(`watchlist request ${email} ${password}` )

    
    userModel.findOne({email:email} , (err, documents)=>{
        if(err){
            res.send(err); 
        }
        else if (documents === null){
            res.send([{Ticker: 'aapl'} , {Ticker: 'pltr'} , {Ticker:'tsla'}]); 
        }else if(documents.pass !== password){
            res.send('incorrect password'); 
        }else {
            console.log(`authenticated user ${email} ${password}`)
            res.send(documents.stock);
        }
    })
}); 


   



module.exports = router; 

//mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/<YOUR_DB>?retryWrites=true&w=majority