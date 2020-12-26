import React, { Component, useContext, useEffect, useState } from 'react';
import { validateFields } from './Validation';
import classnames from 'classnames';
import { UserContext } from './UserContext';
import '../css/Login.css'
import axios from 'axios';
import { json } from 'body-parser';
import Navbar from './LoginNavbar';



function Login() {
    const { user, setUser } = useContext(UserContext);



    const callServer = false;


    const [email, setEmail] = useState({
        value: '',
        validateOnChange: false,
        error: ''
    });

    const [password, setPassword] = useState({
        value: '',
        validateOnChange: false,
        error: ''
    });
 
    const [submitCalled, setSubmitCalled] = useState(false);
    const [allFieldsValidated, setAllFieldsValidated] = useState(false);



    function loginFunction() {


        console.log(`password.value before sending api request ${password.value}`)
        axios.post(`/api/users/login/id/${email.value}/${password.value}`).then(res => {
            if (res.data[0] === `access granted`) {
                setUser({
                    name: res.data[1],
                    email: email.value,
                    password: password.value,
                    authenticated: true
                });
                console.log(`access granted ${res.data[1]}`);
                sessionStorage.setItem('sessionName', res.data[1]);
                
            }
        }).catch((err) => {
            console.log(err)
        });


        
        console.log(`Login: sessionStorage: ${sessionStorage.getItem("sessionName")}`)
        sessionStorage.setItem('sessionEmail', user.email);
        console.log(`Login: sessionStorage: ${sessionStorage.getItem("sessionEmail")}`)
        sessionStorage.setItem('sessionAuthenticated', user.authenticated);

        




    }






    /*
     * validates the field onBlur if sumbit button is not clicked
     * set the validateOnChange to true for that field
     * check for error
     */
    function handleBlur(validationFunc, evt) {
        const field = evt.target.name;

        if (field === 'email' && email.validateOnChange === false && submitCalled === false) {
            var temp = {
                value: email.value,
                validateOnChange: true,
                error: validationFunc(email.value)
            }
            setEmail(temp);
        }
        else if (field === 'password' && password.validateOnChange === false && submitCalled === false) {
            var temp = {
                value: password.value,
                validateOnChange: true,
                error: validationFunc(password.value)
            }
            setPassword(temp);
        }

        return;
    }



    /*
     * update the value in state for that field
     * check for error if validateOnChange is true
     */
    function handleChange(validationFunc, evt) {
        console.log(`handle change called`)
        const field = evt.target.name;
        console.log(field);
        const fieldVal = evt.target.value;
        console.log(email.value);


        if (field === 'email' && email.validateOnChange === true) {
            console.log('opta')
            var temp = {
                value: fieldVal,
                validateOnChange: email.validateOnChange,
                error: validationFunc(fieldVal)
            }
            setEmail(temp)
        }
        else if (field === 'email' && email.validateOnChange === false) {
            console.log('optb')
            var temp = {

                value: fieldVal,
                validateOnChange: email.validateOnChange,
                error: ''
            }

            setEmail(temp);
        }
        else if (field === 'password' && password.validateOnChange === true) {
            console.log('optc')
            var temp = {
                value: fieldVal,
                validateOnChange: email.validateOnChange,
                error: validationFunc(fieldVal)
            }
            setPassword(temp)
        }
        else if (field === 'password' && password.validateOnChange === false) {
            console.log('optd')
            var temp = {
                value: fieldVal,
                validateOnChange: email.validateOnChange,
                error: ''
            }
            setPassword(temp);
        }



    }





    /*
     * validate all fields
     * check if all fields are valid if yes then submit the Form
     * otherwise set errors for the feilds in the state
     */
    function handleSubmit(evt) {
        console.log("handle submit called");
        evt.preventDefault();
        // validate all fields
        console.log(`${email.value}  ${password.value}`);
        const emailError = validateFields.validateEmail(email.value);
        const passwordError = validateFields.validatePassword(password.value);

        if ([emailError, passwordError].every(e => e === false)) {
            // no errors submit the form
            console.log(`email error and pass word error are false`)
            loginFunction(email.value, password.value);

            // clear state and show all fields are validated
            setAllFieldsValidated(true);
            showAllFieldsValidated();
        } else {
            // update the state with errors

            setEmail(email.value, true, emailError);
            setPassword(password.value, true, passwordError);

        }
    }

    function showAllFieldsValidated() {
        setTimeout(() => {
            setAllFieldsValidated(false);
        }, 1500);
    }

    function moveToRegister() {
        window.location.href = "/Register/"
    }





    return (
        <div> 
            <Navbar/>
            <div className="Form col-md-8 col-lg-6">
                <div className="card">

                    <h4 className="card-title text-center">{user.email}</h4>


                    <div className="card-body">
                        {allFieldsValidated && (
                            <p className="text-success text-center">
                                Success, All fields are validated
                            </p>
                        )}

                        {/* Form Starts Here */}
                        <form onSubmit={evt => handleSubmit(evt)}>



                            {/* Email field */}
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={email.value}
                                    placeholder={"Enter email here"}
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': email.error === false },
                                        { 'is-invalid': email.error }
                                    )}
                                    onChange={evt =>
                                        handleChange(validateFields.validateEmail, evt)
                                    }
                                    onBlur={evt =>
                                        handleBlur(validateFields.validateEmail, evt)
                                    }
                                />
                                <div className="invalid-feedback">{email.error}</div>
                            </div>

                            {/* Password field */}
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={password.value}
                                    placeholder="Enter your password"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': password.error === false },
                                        { 'is-invalid': password.error }
                                    )}
                                    onChange={evt =>
                                        handleChange(validateFields.validatePassword, evt)
                                    }
                                    onBlur={evt =>
                                        handleBlur(validateFields.validatePassword, evt)
                                    }
                                />
                                <div className="invalid-feedback">{password.error}</div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary "
                                onMouseDown={() => setSubmitCalled(true)}>
                                Login
                            </button>

                            <button className="btn btn-light "
                                onClick={moveToRegister}
                                style={{ margin: '25px' }}>
                                Sign Up
                            </button>



                           



                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;