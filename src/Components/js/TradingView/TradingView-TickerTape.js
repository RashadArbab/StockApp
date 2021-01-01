import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import axios from 'axios';


function TickerTape() {


    const [user, setUser] = useState({
        name: sessionStorage.getItem('sessionName'),
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword'),
        authenticated: sessionStorage.getItem('sessionAuthenticated')
    });

    useEffect(() => {
        console.log(user.name);



        if (!Cookies.get('tickerList')) {
            const script = document.createElement('script');

            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
            script.async = true;
            
            /*

            var array = new Array(sessionList.length);
            for (let index = 0; index < sessionList.length; index++) {
                var string = `NASDAQ:${Cookies.get('watchlist').[index].Ticker.toUpperCase()}`
                array[index] = {

                    "proName": string,
                    "title": string
                }

            }
           */

            script.innerHTML = JSON.stringify({

                "symbols": [
                    { "proName": "NASDAQ:AAPL", "title": "AAPL" },
                    { "proName": "NYSE:PLTR", "title": "PLTR" },
                    { "proName": "NASDAQ:TSLA", "title": "TSLA" }],
                "showSymbolLogo": true,
                "colorTheme": "dark",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "en"
            })
            document.getElementById("myContainer").appendChild(script);
        }

        else {
            console.log(`else{}`);
            const script = document.createElement('script');

            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
            script.async = true;

            const watchlist = Cookies.get("tickerList")
            console.log (`stringified: ${watchlist}`) 
            

            console.log(`parsed ${JSON.parse(watchlist)}`);

            console.log(Array.from(watchlist))
           
            var newWatchlist = JSON.parse(watchlist);
           
            console.log(`this is the formed array ${Array.from(newWatchlist)}`); 

            newWatchlist = Array.from(newWatchlist); 
            
            
            var array = new Array(newWatchlist.length);
            console.log(newWatchlist.length) ; 
        
            for (let index = 0; index < newWatchlist.length; index++) {
                var string = `${newWatchlist[index].toUpperCase()}`
                array[index] = {
                    "proName": string,
                    "title": newWatchlist[index].toUpperCase()
                }

            }
            console.log(`this is array: `);
            console.log(array);

            script.innerHTML = JSON.stringify({

                "symbols": array,
                "showSymbolLogo": true,
                "colorTheme": "dark",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "en"
            })



           

            document.getElementById("myContainer").appendChild(script);

        }
        








    }, []);



    return (
        <div id="myContainer">
            <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">

                </div>
            </div>
        </div>
    );

} export default TickerTape;