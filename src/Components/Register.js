import React, { useState } from 'react';
import validator from 'validator'; 
import Navbar from './Navbar'

import './Register.css'
function Register() {

    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    function loginFunction(event) {
        event.preventDefault();
        console.log("this is pass" + pass);
    }

    function validateName(name) {

        if (validator.isEmpty(name)){
            return "Name is required"; 
        }
        else {
            return false; 
        }
    }

    function validateEmail(email){
        if (validator.isEmpty(email)){
            return "Email is required"
        }
        else if (!validator.isEmail(email)){
            return "Invalid Email"
        }
        else {
            return false; 
        }
    }

    function validatePassword(pass, confirmPass){
        if (validator.isEmpty(pass)){
            return "Password is required"
        }
        else if (!validator.isLength(pass, {min : 8})){
            return "Password must be a minimum of 8 characters"
        }
        else if (!validator.equals(pass, confirmPass)){
            return "Passwords must match"
        }
    }

    return (
        <div className="Login" style={{ padding: '15px' }}>

            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div className="box">
                        <form class="needs-validation" onSubmit={loginFunction} novalidate>
                            <div class="form-floating">
                                <input type="text" for="validationCustom01" value={name} onChange={(e) => { setName(e.target.value) }} class="form-control" id="floatingInput" placeholder="Name" style={{ backgroundColor: "rgb(238,238,238)" }} />
                            </div>
                            <div class="form-floating md-3">
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }}
                                    class="form-control" id="floatingInput" placeholder="Email"
                                    style={{ backgroundColor: "rgb(238,238,238)" }} />
                            </div>
                            <div class="form-floating">
                                <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }}
                                    class="form-control" id="floatingPassword" placeholder="Password"
                                    style={{ backgroundColor: "rgb(238,238,238)" }} />
                            </div>
                            <div class="form-floating">
                                <input type="password" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }}
                                    class="form-control" id="floatingPassword" placeholder="Confirm Password"
                                    style={{ backgroundColor: "rgb(238,238,238)" }} />
                            </div>
                            <div class="submit">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register; 
