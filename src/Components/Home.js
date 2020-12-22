import React,{useState} from "react"; 
import './Home.css'
import TradingViewWidget, {Themes, BarStyles, HEIKIN_ASHI} from 'react-tradingview-widget';
function Home() {
    
    const symbol = "NASDAQ:TSLA"
    const[theme, setTheme] = useState('light'); 
    const[themeString , setThemeString] = useState("Dark Mode"); 
    const[indicatorString , setIndicatorString] = useState("Indicators On"); 
    const[indicators , setIndicators] = useState('false');
    const indicatorsOn = ["BB@tv-basicstudies", "MACD@tv-basicstudies","MASimple@tv-basicstudies"]
    const [buttonColor , setButtonColor] = useState('btn btn-light') ; 

    function changeTheme() {
        if(theme === 'light'){
        setTheme('dark'); 
        setThemeString('Light Mode');
        setButtonColor('btn btn-dark')
        }
        else {
            setTheme('light');
            setThemeString("Dark Mode")
            setButtonColor('btn btn-light');
        }
        console.log("Attempted theme change"); 
    }

    function changeIndicators(){
        if (indicatorString === "Indicators On"){
            setIndicators(indicatorsOn); 
            setIndicatorString("Indicators Off");

        }
        else {
            setIndicators('false'); 
            setIndicatorString("Indicators On"); 
        }
    }
   

    return (
    <div className="chart">
        
            <div className="tradingView">
            <TradingViewWidget 
            symbol={symbol}
            theme= {theme} 
            locale="en"
            autosize 
            BarStyles="HEIKIN_ASHI"
            studies = {indicators} 
            />
            
            </div>
            <div class ="chartButtons">
                <div class="changeButton">
                    <button className={buttonColor} onClick={changeTheme}>{themeString}</button>
                </div>
                <div class="changeButton">
                    <button className={buttonColor} onClick={changeIndicators}>{indicatorString}</button>
                </div> 
            </div>
        
    </div>
    );
}export default Home; 