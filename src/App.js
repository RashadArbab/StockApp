import logo from './logo.svg';
import Home from './Components/Home'; 
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register' ; 
import {BrowserRouter, Switch,  Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App"> 
     <Navbar/> 
     <BrowserRouter>
      <Switch>
        <Route path="/home/" component={Home} exact/> 
        <Route path="/login/" component={Login} exact/> 
        <Route path="/register" component={Register} exact/> 
      </Switch>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
