import React, { useEffect, useContext, useState } from "react";
import '../css/Home.css'
import { UserContext } from "./UserContext";
import MainChart from "./TradingView/TradingView-MainChart"
import Financials from "./TradingView/TradingView-Financials";
import Profile from "./TradingView/TradingView-Profile";
import TickerTape from "./TradingView/TradingView-TickerTape";
import Cookies from 'js-cookie';
import Notes from "./Notes";

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

    
    const { user, setUser } = useContext(UserContext);
    var localUse = {
        name: sessionStorage.getItem('sessionName'),
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword'),
        authenticated: sessionStorage.getItem('sessionAuthenticated')
    }
    console.log(`Home: sessionStorage: ${sessionStorage.getItem("sessionName")}`)
    console.log(`Home: sessionStorage: ${sessionStorage.getItem("sessionEmail")}`)



    const [indicatorString, setIndicatorString] = useState("Indicators On");
    const [indicators, setIndicators] = useState('false');
    const indicatorsOn = ["BB@tv-basicstudies", "MACD@tv-basicstudies", "MASimple@tv-basicstudies"]
    const [buttonColor, setButtonColor] = useState('btn btn-light');











    return (
        <div>



            <div className="StickyNav">
                <nav className="navbar  navbar-expand-sm ">

                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li class="nav-item active">
                                <a class="nav-link" href="/watchlist">Watchlist</a>
                            </li>
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








            <MainChart name={stock} indicators={indicators} />




            <div className="contain">


                <Financials name={stock} />

            </div>


            <div className="contain2">
                <Profile name={stock}  />
            </div>
            <div className="row">
                <div className="col-xl-6 justify-content-center">
                    <Notes />
                </div>
            </div>


        </div>





















    );
} export default Home; 