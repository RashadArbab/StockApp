import React,{useState} from 'react' ; 
import Navbar from  './Navbar'
import './Login.css'
function Login() {

    const[pass , setPass] = useState('');  
    const[email , setEmail] =useState('') ;
    
    function loginFunction(event){
        event.preventDefault(); 
        console.log("this is pass" + pass) ;
    }

    return(
        <div className="Login"  style={{padding:'15px'}}>
       
        <div class="row justify-content-center">
        <div class="col-md-4">
        <div className="box">
        <form onSubmit={loginFunction}>
        <div class="form-floating mb-3">
        <input type="username" value={email} onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="floatingInput" placeholder="username" style={{backgroundColor: "#eeeeee"}}/>
        </div>
        <div class="form-floating">
        <input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} class="form-control" id="floatingPassword" placeholder="Password" style={{backgroundColor: "#eeeeee"  }}/>
        <div class="submit">
        <button type="submit" class="btn btn-primary" >Submit</button>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
        </div>
    ); 
}


export default Login; 
