import React, { useEffect , useState } from 'react';

function TestPage(props){
    const script = document.createElement('script');
   
    useEffect( ()=> {
        const symbol = props.name; 
        console.log(symbol);
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
        script.async = true;
        script.innerHTML = JSON.stringify({ 
            "symbol": symbol,
            "width": 200,
            "height": 100,
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "light",
            "trendLineColor": "#37a6ef",
            "underLineColor": "#E3F2FD",
            "isTransparent": false,
            "autosize": false,
            "largeChartUrl": "" })
            document.getElementById("myContainer").appendChild(script);
    }, []) ; 
    

  
        return(
      <div id="myContainer">
        <div className="tradingview-widget-container">
           <div className="tradingview-widget-container__widget">
               
            </div>
        </div>
     </div>
        );
 
    } export default TestPage;