import React, { useEffect, useState } from 'react';

function Financials(props) {
    const script = document.createElement('script');

    useEffect(() => {
        const symbol = props.name;
        console.log(symbol);
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
        script.async = true;

        script.innerHTML = JSON.stringify({
            "symbol": symbol,
            "width": "600",
            "height": "600",
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "dark",
            "trendLineColor": "#37a6ef",
            "underLineColor": "#E3F2FD",
            "isTransparent": false,
            "autosize": "true",
            "largeChartUrl": ""
        })
        document.getElementById("financialContainer").appendChild(script);
    }, []);



    return (
        <section id="Financials">
            <div id="financialContainer">
                <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget">

                    </div>
                </div>
            </div>
        </section>
    );

} export default Financials;