import Home from './Components/js/Home';
import Navbar from './Components/js/LoginNavbar';
import Login from './Components/js/Login';
import Register from './Components/js/Register';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from './Components/js/UserContext';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import Watchlist from './Components/js/Watchlist';

function App() {

  const [user, setUser] = useState({
    name: "default",
    email: "default@email.com",
    password: "password",
    authenticated: false

  });
  useEffect (()=>{sessionStorage.setItem("sessionName", user.name)} , [user.name])
  useEffect (()=>{sessionStorage.setItem("sessionEmail", user.email)} , [user.email])
  useEffect (()=>{sessionStorage.setItem("sessionPassword", user.password)} , [user.password])
  useEffect (()=>{sessionStorage.setItem("sessionAuthenticated", user.authenticated)} , [user.authenticated])
  
 

  const value = useMemo(() => ({ user, setUser }), [user, setUser])


  return (
    <UserContext.Provider value={value}>
      <div className="App">

      
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <Redirect to="/register" /> 
            </Route>
            <Route path="/home" exact >
              <Home />
            </Route>
            <Route path="/login" exact >
              <Login />
            </Route>
            <Route path="/register" exact >
              <Register/>
            </Route>
            <Route path="/watchlist" exact> 
              <Watchlist/> 
            </Route>
          </Switch>

        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
