import React, { useEffect, useContext, useState } from "react";
import '../css/Home.css'
import Navbar from './LoginNavbar';
import TradingViewWidget, { Themes, BarStyles, HEIKIN_ASHI } from 'react-tradingview-widget';
import Register from "./Register";
import { UserContext } from "./UserContext";
import MainChart from "./TradingView/TradingView-MainChart"
import Financials from "./TradingView/TradingView-Financials";
import Profile from "./TradingView/TradingView-Profile";
import TickerTape from "./TradingView/TradingView-TickerTape";
import bootstrap, { Card, Body } from 'bootstrap';
import Cookies from 'js-cookie'; 
function Home() {
    const stock = Cookies.get("currentStock"); 
    console.log(stock);
    function changeIndicators() {
        if (indicatorString === "Indicators On") {
            setIndicators(indicatorsOn);
            setIndicatorString("Indicators Off");

        }
        else {
            setIndicators('false');
            setIndicatorString("Indicators On");
        }
    }

    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark');
            setTheme2("dark");
            console.log(theme);
            setThemeString('Light Mode');
            setButtonColor('btn btn-dark')
        }
        else {
            setTheme('light');
            setTheme2("light");
            setThemeString("Dark Mode")
            setButtonColor('btn btn-light');
        }
        console.log("Attempted theme change");
    }

    const { user, setUser } = useContext(UserContext);
    var localUse = {
        name: sessionStorage.getItem('sessionName'),
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword'),
        authenticated: sessionStorage.getItem('sessionAuthenticated')
    }
    console.log(`Home: sessionStorage: ${sessionStorage.getItem("sessionName")}`)
    console.log(`Home: sessionStorage: ${sessionStorage.getItem("sessionEmail")}`)


    
    const [theme, setTheme] = useState('dark');
    const [theme2, setTheme2] = useState('Dark');
    const [themeString, setThemeString] = useState("Dark Mode");
    const [indicatorString, setIndicatorString] = useState("Indicators On");
    const [indicators, setIndicators] = useState('false');
    const indicatorsOn = ["BB@tv-basicstudies", "MACD@tv-basicstudies", "MASimple@tv-basicstudies"]
    const [buttonColor, setButtonColor] = useState('btn btn-light');











    return (
        <div>
            <Navbar />


            <div className="StickyNav">
            <nav className="navbar  navbar-expand-sm  navbar-dark bg-dark">

                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <a href="#MainChart" className="nav-link">Chart</a>
                        </li>
                        <li className="nav-item">
                            <a href="#Financials" className="nav-link">Financials</a>
                        </li>
                        <li className="nav-item">
                            <a href="#Profile" className="nav-link">Profile</a>
                        </li>
                        
                    </ul>
                    <ul className="navbar-nav justify-content-end">

                        <li className="nav-item justify-content-end">
                            <div class="chartButtons">
                                <div class="changeButton">

                                    <a className="nav-link" onClick={changeIndicators}>{indicatorString}</a>

                                </div>
                            </div>

                        </li>

                    </ul>
                </div>



            </nav>
            <TickerTape />
            </div>

           






            <MainChart name={stock} theme={theme} indicators={indicators} />




            <div className="contain">


                <Financials name={stock} theme={theme} />

            </div>


            <div className="contain2">
                <Profile name={stock} theme={theme} />
            </div>


        </div>





















    );
} export default Home; 