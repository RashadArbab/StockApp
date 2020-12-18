import logo from './logo.svg';
import Home from './Components/Home'; 
import Navbar from './Components/Navbar';
import {BrowserRouter, Switch,  Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App"> 
     <Navbar/> 
     <BrowserRouter>
      <Switch>
        <Route path="/home/" component={Home} exact/> 
      </Switch>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
