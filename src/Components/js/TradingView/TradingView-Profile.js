import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap';
function Profile(props) {
    const script = document.createElement('script');

    useEffect(() => {
        const symbol = props.name;
        console.log(symbol);
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": symbol,
            "height": "400",
            "width": "600", 
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "dark",
            "trendLineColor": "#37a6ef",
            "underLineColor": "#E3F2FD",
            "isTransparent": true,
            "autosize": true,
            "largeChartUrl": ""
        })
        document.getElementById("myContainer").appendChild(script);
    }, []);



    return (

        <div id="myContainer" >
            <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">

                </div>
            </div>
        </div>

    );

} export default Profile;