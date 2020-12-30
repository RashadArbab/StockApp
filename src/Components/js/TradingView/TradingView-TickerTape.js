import React, { useEffect, useState } from 'react';
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
       
       

        if (!sessionStorage.getItem(`sessionWatchlist`) === null) {
            const script = document.createElement('script');

            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
            script.async = true;
            console.log(`if{}`)
            var sessionList = sessionStorage.getItem(`sessionWatchList`);

            var array = new Array(sessionList.length);
            for (let index = 0; index < sessionList.length; index++) {
                var string = `NASDAQ:${sessionList[index].Ticker.toUpperCase()}`
                array[index] = {

                    "proName": string,
                    "title": string
                }

            }
            console.log(`this is session storage ` + sessionStorage.getItem(`sessionWachtlist`));

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
            axios.post(`/api/users/watchlist/id/${user.email}/${user.password}`).then((res) => {
                if (res) {
                    console.log(`user.name ${user.name}`)
                    console.log(`sessionStorage ${sessionStorage.getItem('sessionName')}`)
                    const watchlist = res.data
                    console.log(JSON.stringify(watchlist))

                    var array = new Array(watchlist.length);
                    for (let index = 0; index < watchlist.length; index++) {
                        var string = `${watchlist[index].Ticker.toUpperCase()}`
                        array[index] = {

                            "proName": string,
                            "title": watchlist[index].Ticker.toUpperCase()
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



                    console.log(` This is the res.data: ${JSON.stringify(res.data)}`);
                   

                }
                document.getElementById("myContainer").appendChild(script);
            }).catch((err) => {
                console.log(err);
            })
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