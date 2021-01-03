import React, { useEffect, useState } from 'react';
import TradingViewWidget, { Themes, BarStyles, HEIKIN_ASHI } from 'react-tradingview-widget'

function Chart(props) {
    const script = document.createElement('script');

    

   



    console.log("Main chart " + props.theme);
    return (
        
        <section id="MainChart">
            <div>
                <br/>
                
                <div className="tradingView">
                    <TradingViewWidget
                        symbol={props.name}
                        
                        theme='dark'
                        locale="en"
                        autosize
                        BarStyles={HEIKIN_ASHI}
                        studies={props.indicators}

                    />

                </div>
                
            </div>
        </section>

    );

} export default Chart;