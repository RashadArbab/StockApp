import logo from './logo.svg';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProvider } from './Components/UserContext'; 
import './App.css';

function App() {

  return (
    <UserProvider>
      <div className="App">

        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route path="/home/"  exact >
              <Home/> 
            </Route>
            <Route path="/login/"  exact >
              <Login/> 
            </Route>
            <Route path="/register"  exact >
              <Register/>
            </Route>
          </Switch>

        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
