import {Helmet} from "react-helmet" ; 
import './Home.css'
import TradingViewWidget, {Themes, BarStyles, HEIKIN_ASHI} from 'react-tradingview-widget';
function Home() {
    
    const symbol = "NYSE:PLTR"
   

    return (
    <div className="chart">
        
           
            <TradingViewWidget 
            symbol={symbol}
            theme={Themes.Light}
            locale="en"
            autosize 
            BarStyles={HEIKIN_ASHI}/>
           
        
    </div>
    );
}export default Home; 