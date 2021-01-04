import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
function Financials(props) {
    const script = document.createElement('script');
    const width = visualViewport.width.valueOf() * 0.75;
   
    useEffect(() => {
        const symbol = Cookies.get("currentStock");
 
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
        script.async = true;

        script.innerHTML = JSON.stringify({
            "symbol": `${Cookies.get('currentStock')}`,
            "height": "500",
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
        document.getElementById("financialContainer").appendChild(script);
    }, []);



    return (
        <section id="Financials">
            <div id="financialContainer">
                <div className="tradingview-widget-container" >
                    <div className="tradingview-widget-container__widget" >

                    </div>
                </div>
            </div>
        </section>
    );

} export default Financials;