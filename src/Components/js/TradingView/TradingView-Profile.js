import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap';
import Cookies from 'js-cookie'
function Profile(props) {
    const script = document.createElement('script');
    const width = visualViewport.width.valueOf() * 0.75; 

    
    useEffect(() => {
        const symbol = Cookies.get("currentStock"); 
        console.log(symbol);
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": `${Cookies.get('currentStock')}`,
            "height": "300",
            "width": `${width}`,
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "dark",
            "trendLineColor": "#37a6ef",
            "underLineColor": "#E3F2FD",
            "isTransparent": false,
            "autosize": true,
            "largeChartUrl": "",
            "displayMode": "compact"

        })
        document.getElementById("profileContainer").appendChild(script);
    }, []);



    return (
        <section id="Profile">
            <div id="profileContainer" >
                <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget">

                    </div>
                </div>
            </div>
        </section>

    );

} export default Profile;