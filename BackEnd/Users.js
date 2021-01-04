const e = require('express');
var app = e();
const router = e.Router();
const mongo = require('mongoose');

const bcrypt = require('bcrypt');


var userModel = mongo.model('users', {
    name: String, email: String, pass: String,
    stock: [{ Ticker: String, Market: String, Notes: [String] }]
});

mongo.connect('mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/StockApp?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('mongodb connection successful');
        }
    });


router.post(`/register/newUser/:name/:email/:pass/stock/:ticker/:market/Notes/:note`, (req, res) => {
    console.log(`users-22: 
    ${req.params.name}
    ${req.params.email}
    ${req.params.pass}
    ${req.params.ticker}
    ${req.params.market}
    ${req.params.note.split(',')} `);
    var name = req.params.name;
    var email = req.params.email;
    var pass = bcrypt.hashSync(req.params.pass, 5);
    var stock = {
        Ticker: req.params.ticker,
        Market: req.params.market,
        Notes: req.params.note.split(',')
    }
    var newUser = new userModel({ name: name, email: email, pass: pass, stock: stock });

    newUser.save((err) => {
        if (err) {
            res.send("error creating user: users-30");
        }
        else {
            res.send(`user registration successful: welcome ${name}`);
        }
    })
});

router.post(`/login/id/:email/:password`, (req, res) => {
    var email = req.params.email;
    var password = req.params.password;
    console.log(`login request ${email} ${password}`)


    userModel.findOne({ email: email }, (err, documents) => {
        if (err) {
            res.send(err);
        }
        else if (documents === null) {
            res.send('user does not exist');
        } else {
            if (bcrypt.compareSync(password, documents.pass)) {
                console.log(`authenticated user ${email} ${password}`)
                res.send([`access granted`, documents.name]);
            }
            else {
                console.log(documents.pass)
                console.log(password);
                console.log('incorrect passoword');
                res.send('incorrect password');
            }


        }
    })
});

router.post(`/watchlist/id/:email/:password`, (req, res) => {
    var email = req.params.email;
    var password = req.params.password;
    console.log(`watchlist request ${email} ${password}`)


    userModel.findOne({ email: email }, (err, documents) => {
        if (err) {
            res.send(err);
        }
        else if (documents === null) {
            res.send([{ Ticker: 'aapl', Market: 'NASDAQ' }, { Ticker: 'pltr', Market: 'NYSE' }, { Ticker: 'tsla', Market: 'NASDAQ' }]);
        } else {
            if (bcrypt.compareSync(password, documents.pass)) {
                console.log(`authenticated user ${email} ${password}`)
                res.send(documents.stock);
            }
            else {
                res.send('incorrect password');
            }

        }
    })
});

router.post(`/watchlist/add/:ticker/:email/:pass`, (req, res) => {
    var password = req.params.pass;
    var email = req.params.email;
    var ticker = req.params.ticker;

    console.log(`attempting to add stock ${email} ${password} ${ticker}`);
    userModel.findOne({ email: email }, (err, documents) => {
        if (err) {
            console.log('ran into err')
            res.send(err);
        }
        else if (documents.length === 0) {
            console.log('no userfound')
            res.send("no user found");
        } else {
            if (bcrypt.compareSync(password, documents.pass)) {

                var tempStock = {
                    Notes: [],
                    Ticker: ticker.toUpperCase(),
                    Market: "NASDAQ"
                }
                console.log("Attempting to add stock");
                if (documents.stock.some(stock => stock.Ticker === ticker)) {
                    console.log('repeat');
                    res.send('ticker already exists');
                } else {
                    userModel.findOneAndUpdate({ email: email }, { $push: { stock: tempStock } }, (err) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.send("Successfully added stock");
                        }
                    })
                    console.log(`end of adding`)
                }

            } else {
                console.log('password incorrect')
                res.send("passowrd incorrect");
            }

        }
    })
})

router.post(`/notes/add/:email/:pass/:stock/:note`, (req, res) => {
    var email = req.params.email
    var pass = req.params.pass
    var note = req.params.note
    var tempStock = req.params.stock


    userModel.findOne({ email: email, 'stock.Ticker': tempStock }, (err, documents) => {
        if (err) {
            res.send(err);
        }
        else if (documents === null) {
            res.send('user not found');
        } else if (bcrypt.compareSync(pass, documents.pass)) {
            userModel.findOneAndUpdate({ email: email, "stock.Ticker": tempStock }, { $push: { "stock.$.Notes": note } }, (documents, err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(documents.stock);
                }
            })
        }
    })
})



router.post(`/notes/get/:email/:pass/:stock`, (req, res) => {
    var email = req.params.email
    var pass = req.params.pass
    var tempStock = req.params.stock
    console.log("get working")
    userModel.findOne({ email: email, 'stock.Ticker': tempStock }, (documents, err) => {
        if (err) {
            res.send(err)
        } else {
            res.send(documents.email)

        }
    })
})

router.post(`/notes/remove/:email/:pass/:stock/:note`, (req, res) => {
    var email = req.params.email
    var pass = req.params.pass
    var note = req.params.note
    var tempStock = req.params.stock

    console.log(`remove api`)

    userModel.findOneAndUpdate({ email: email }, { $pull: { "stock.$.Notes": note } }, (documents, err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('it worked');
        }
    })
})


router.post(`/watchlist/remove/:email/:pass/:stock`, (req, res) => {
    var email = req.params.email
    var pass = req.params.pass
    var tempStock = req.params.stock

    

    userModel.findOneAndUpdate({ email: email }, { $pull : {stock : {Ticker : tempStock}} } ,     (documents, err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(documents)
        }
    })
})








module.exports = router;

//mongodb+srv://RashadArbab:Admn6392!@cluster0.3gbxy.mongodb.net/<YOUR_DB>?retryWrites=true&w=majority