
import axios from 'axios';
import Navbar from './LoginNavbar';
import { UserContext } from './UserContext';
import React, { useContext, useState, useEffect, map } from 'react'
import TradingViewWidget from 'react-tradingview-widget';
import {createChart} from 'lightweight-charts'
import TestPage from './TestPage';
function Watchlist() {

    var data = (['test 1', 'test 2']);


    const [user, setUser] = useState({
        name: sessionStorage.getItem('sessionName'),
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword'),
        authenticated: sessionStorage.getItem('sessionAuthenticated')
    });

    const [watchlist, setWatchlist] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [display, setDisplay] = useState(['placeholder']);

    useEffect(() => {
        console.log(`axios.post ${sessionStorage.getItem('sessionEmail')} `);
        axios.post(`/api/users/watchlist/id/${user.email}/${user.password}`).then((res) => {
            if (res) {
                console.log(`user.name ${user.name}`)
                console.log(`sessionStorage ${sessionStorage.getItem('sessionName')}`)
                setWatchlist(res.data);



                console.log(` This is the res.data: ${JSON.stringify(res.data)}`);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const [arr, setArr] = useState([]);

    const tickerList = watchlist.map((element) => {
        
        return <li class="list-group-item ">
            <div>
                
                {element.Ticker}
                
                </div>
                    
        </li>
    })






















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
            </div>


    )


} export default Watchlist; 