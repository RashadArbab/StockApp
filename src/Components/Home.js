import {Helmet} from "react-helmet" ; 
import './Home.css'
import TradingViewWidget, {Themes} from 'react-tradingview-widget';
function Home() {
    
    const symbol = "NYSE:PLTR"
   

    return (
    <div className="chart">
        
           
            <TradingViewWidget
            symbol={symbol}
            theme={Themes.DARK}
            locale="fr"
            autosize />
           
        
    </div>
    );
}export default Home; 