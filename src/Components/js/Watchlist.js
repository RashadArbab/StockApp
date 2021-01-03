
import axios from 'axios';
import Navbar from './LoginNavbar';
import { UserContext } from './UserContext';
import React, { useContext, useState, useEffect, map } from 'react'
import TradingViewWidget from 'react-tradingview-widget';
import { createChart } from 'lightweight-charts'
import TestPage from './TestPage';
import classnames from 'classnames';
import { validateFields } from './Validation';
import Cookies from 'js-cookie';
import '../css/Watchlist.css';
function Watchlist() {

    var data = (['test 1', 'test 2']);




    const [ticker, setTicker] = useState('');
    const [run, setRun] = useState(0);

    const [user, setUser] = useState({
        name: sessionStorage.getItem('sessionName'),
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword'),
        authenticated: sessionStorage.getItem('sessionAuthenticated')
    });

    const [watchlist, setWatchlist] = useState([]);


    useEffect(() => {
        getWatchlist()
    }, [])


    function getWatchlist() {
        console.log(`get watchlist running`);

        axios.post(`/api/users/watchlist/id/${Cookies.get("email")}/${Cookies.get("pass")}`).then((res) => {
            if (res) {
                setWatchlist(res.data)
                console.log(`user.name ${Cookies.get("name")}`)
                console.log(` This is the res.data: ${JSON.stringify(res.data)}`)
                console.log("setting watchlist to data")
                Cookies.set("watchlist", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })


        console.log(`run added ${run}`);


    }
    const [tickerList, setTickerList] = useState();

    useEffect(() => {
        var tickerArray = [];
        setTickerList(watchlist.map((element, num) => {
            console.log("setTickerList is running")
            tickerArray[num] = element.Ticker;
            return (

                <a class="list-group-item" key={element._id} onClick={() => {
                    console.log("selectStock: ");
                    Cookies.set('currentStock', `${element.Ticker.toUpperCase()}`, { sameSite: 'strict', expires: 1 })
                    console.log("current stock: " + JSON.stringify(Cookies.get("currentStock")));
                    window.location.href = '/home'

                }}>

                    <div>
                        {element.Ticker.toUpperCase()}
                    </div>

                </a>
            )
        }))

        Cookies.set('tickerList', JSON.stringify(tickerArray));

    }, [watchlist])



    const [feedback, setFeedback] = useState("");

    function addToList() {
        console.log(ticker);
        axios.post(`/api/users/watchlist/add/${ticker}/${Cookies.get("email")}/${Cookies.get("pass")}`).then((res) => {
            console.log(res)
            setFeedback(res.data)

        }).then(getWatchlist).catch((err) => {
            console.log(err)
        })


        setRun(run + 1);


    }

    function handleSubmit(props) {
        props.preventDefault();
        console.log(`${ticker} ${Cookies.get("email")} ${Cookies.get("pass")}`)

        addToList();
    }






    return (




        <div>
            <Navbar />

            <div className="row" style={{ justifyItems: 'center' }}>
                <div class="card col-6" >
                    <h3 class="card-title">Watchlist</h3>
                    <div class="card-body">
                        <ul className="col-7-md list-group list-group-flush">
                            {tickerList}
                        </ul>

                    </div>
                </div>
            </div>


            <div className="card">
                <h3 className="card-title text-center">Add To Watchlist</h3>
                <div className="form" onSubmit={evt => handleSubmit(evt)}>
                    <div className="form-group">
                        <div className="form-group">
                            <div className="input-text">
                                <input
                                    type="text"
                                    name="ticker"
                                    value={ticker.value}
                                    placeholder={"Enter Ticker Here"}
                                    className="form-control"
                                    onChange={(evt) => { setTicker(evt.target.value) }}
                                />
                            </div>
                            <div >{feedback}</div>
                        </div>
                        <button className="btn btn-light "
                            type="submit"
                            onClick={addToList}
                            style={{ margin: '25px' }}>
                            Add Stock
                            </button>
                    </div>
                </div>
            </div>
        </div>


    )


} export default Watchlist; 