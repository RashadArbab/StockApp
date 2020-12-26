import React, { useEffect, useContext, useState } from "react";
import '../css/Home.css'
import Navbar from './LoginNavbar';
import TradingViewWidget, { Themes, BarStyles, HEIKIN_ASHI } from 'react-tradingview-widget';
import Register from "./Register";
import { UserContext } from "./UserContext";
import MainChart from "./TradingView/TradingView-MainChart"
import Financials from "./TradingView/TradingView-Financials";
import Profile from "./TradingView/TradingView-Profile";
function Home(props) {



    const { user, setUser } = useContext(UserContext);
    var localUse = {
        name: sessionStorage.getItem('sessionName'),
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword'),
        authenticated: sessionStorage.getItem('sessionAuthenticated')
    }
    console.log(`Home: sessionStorage: ${sessionStorage.getItem("sessionName")}`)
    console.log(`Home: sessionStorage: ${sessionStorage.getItem("sessionEmail")}`)















    return (
        <div>
            <Navbar />
            <div class="MainChart" >
                <MainChart name={"tsla"} />


            </div>


            <div className="row">
                <div className="profile" style={{ width: "100%", height: "100%" }}>
                    <Profile name={"tsla"} />


                    <Financials name={"tsla"} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>



        </div>







    );
} export default Home; 