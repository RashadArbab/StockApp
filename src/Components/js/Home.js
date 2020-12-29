import React, { useEffect, useContext, useState } from "react";
import '../css/Home.css'
import Navbar from './LoginNavbar';
import TradingViewWidget, { Themes, BarStyles, HEIKIN_ASHI } from 'react-tradingview-widget';
import Register from "./Register";
import { UserContext } from "./UserContext";
import MainChart from "./TradingView/TradingView-MainChart"
import Financials from "./TradingView/TradingView-Financials";
import Profile from "./TradingView/TradingView-Profile";
import bootstrap, { Card, Body } from 'bootstrap';
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


            <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark">

                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#MainChart" className="nav-link">Chart</a>
                        </li>
                        <li className="nav-item">
                            <a href="#Profile" className="nav-link">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a href="#Financials" className="nav-link">Financials</a>
                        </li>

                    </ul>
                </div>

            </nav>



            <MainChart name={"CRM"} />


            <div className="first">
                <div className="card" style={{ alignItems: "center" }}>
                    <div className="card-body">

                        <Financials name={"CRM"} />

                    </div>
                </div>
            </div>
            <div className ="second">
                <div className="card card-dark bg-dark">
                    <div className="card-body">

                        <Profile name={"CRM"} />
                        Literally what the fuck? 
                    </div>
                </div>
            </div>






        </div>











    );
} export default Home; 