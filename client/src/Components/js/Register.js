import React, { Component, useContext, useState } from 'react';
import { validateFields } from './Validation';
import classnames from 'classnames';
import axios from 'axios';
import '../css/Register.css';
import Navbar from './LoginNavbar';
import Cookies from 'js-cookie'; 
import { UserContext } from './UserContext';






function Register() {

    const { user, setUser } = useContext(UserContext);

    const initialState = {
        name: {
            value: '',
            validateOnChange: false,
            error: ''
        },
        email: {
            value: '',
            validateOnChange: false,
            error: ''
        },
        password: {
            value: '',
            validateOnChange: false,
            error: ''
        },
        confirmPassword: {
            value: "",
            validateOnChange: false,
            error: ""
        },

        submitCalled: false,
        allFieldsValidated: false
    };

    const [name, setName] = useState({
        value: '',
        validateOnChange: false,
        error: ''
    });

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

    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        validateOnChange: false,
        error: ''
    });

    const [submitCalled, setSubmitCalled] = useState(false);
    const [allFieldsValidated, setAllFieldsValidated] = useState(false);

    function registerFunction(name, email, pass) {
        var Ticker = "AAPL"
        var Market = "NASDAQ"
        var Notes = [
            "Buy",
            "Sell"
        ]




        console.log('register function called')
        axios.post(`/api/users/register/newUser/${name}/${email}/${pass}/stock/${Ticker}/${Market}/Notes/${Notes}`).then(res => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        //const [user, setUser] = this.context; 

        //setUser({

    }

    /*
     * validates the field onBlur if sumbit button is not clicked
     * set the validateOnChange to true for that field
     * check for error
     */
    function handleBlur(validationFunc, evt) {
        const field = evt.target.name;

        if (field === 'name' && name.validateOnChange === false && submitCalled === false) {
            var temp = {
                value: name.value,
                validateOnChange: true,
                error: validationFunc(name.value)
            }
            setName(temp);
        }
        else if (field === 'email' && email.validateOnChange === false && submitCalled === false) {
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
        else if (field === 'confirmPassword' && password.validateOnChange === false && submitCalled === false) {
            var temp = {
                value: password.value,
                validateOnChange: true,
                error: validationFunc(password.value, confirmPassword.value)
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

        if (field === 'name' && name.validateOnChange === true) {

            var temp = {
                value: fieldVal,
                validateOnChange: name.validateOnChange,
                error: validationFunc(fieldVal)
            }
            setName(temp)
        }
        else if (field === 'name' && name.validateOnChange === false) {

            var temp = {
                value: fieldVal,
                validateOnChange: name.validateOnChange,
                error: ''
            }

            setName(temp);
        }

        else if (field === 'email' && email.validateOnChange === true) {

            var temp = {
                value: fieldVal,
                validateOnChange: email.validateOnChange,
                error: validationFunc(fieldVal)
            }
            setEmail(temp)
        }
        else if (field === 'email' && email.validateOnChange === false) {

            var temp = {

                value: fieldVal,
                validateOnChange: email.validateOnChange,
                error: ''
            }
            setEmail(temp);
        }
        else if (field === 'password' && password.validateOnChange === true) {

            var temp = {
                value: fieldVal,
                validateOnChange: password.validateOnChange,
                error: validationFunc(fieldVal)
            }
            setPassword(temp)
        }
        else if (field === 'password' && password.validateOnChange === false) {

            var temp = {
                value: fieldVal,
                validateOnChange: password.validateOnChange,
                error: ''
            }
            setPassword(temp);
        }
        else if (field === 'confirmPassword' && confirmPassword.validateOnChange === true) {

            var temp = {
                value: fieldVal,
                validateOnChange: confirmPassword.validateOnChange,
                error: validationFunc(password.value, fieldVal)
            }
            setConfirmPassword(temp)
        }
        else if (field === 'confirmPassword' && confirmPassword.validateOnChange === false) {

            var temp = {
                value: fieldVal,
                validateOnChange: confirmPassword.validateOnChange,
                error: ''
            }
            setConfirmPassword(temp);
        }

    }





    /*
     * validate all fields
     * check if all fields are valid if yes then submit the Form
     * otherwise set errors for the feilds in the state
     */
    function handleSubmit(evt) {
        evt.preventDefault();
        // validate all fields
        console.log('handle submit called'); 

        const nameError = validateFields.validateName(name.value);
        const emailError = validateFields.validateEmail(email.value);
        const passwordError = validateFields.validatePassword(password.value);
        const confirmPasswordError = validateFields.validateConfirmPassword(password.value, confirmPassword.value);
        if ([nameError, emailError, passwordError, confirmPasswordError].every(e => e === false)) {
            console.log("no errors found before submission")
            // no errors submit the form
            registerFunction(name.value, email.value, password.value);
            Cookies.set("name" , name.value); 
            Cookies.set("email" , email.value); 
            Cookies.set("pass" , password.value); 



            // clear state and show all fields are validated
            setName(initialState.email);
            setEmail(initialState.email);
            setPassword(initialState.password);
            setConfirmPassword(initialState.confirmPassword);
            setSubmitCalled(false);
            setAllFieldsValidated(true)
            showAllFieldsValidated();

            window.location.href = "/watchlist"

        } else {
            // update the state with errors

            var n = {
                value: name.value,
                validateOnChange: true,
                error: nameError
            }
            setName(n)
            var e = {
                value: email.value,
                validateOnChange: true,
                error: emailError
            }
            setEmail(e)
            var p = {
                value: password.value,
                validateOnChange: true,
                error: passwordError
            }
            setPassword(p)
            var cp = {
                value: confirmPassword.value,
                validateOnChange: true,
                error: confirmPasswordError
            }
            setConfirmPassword(cp)
        }

    }

    function showAllFieldsValidated() {
        setTimeout(() => {
            setAllFieldsValidated(false);
        }, 1500);
    }

    function moveToLogin() {
        window.location.href = "/login/"
    }







    return (
        <div>

            <Navbar />
            <div className="Form col-md-8 col-lg-6">
                <div className="card">

                    <h4 className="card-title text-center">Sign Up</h4>


                    <div className="card-body">
                        {allFieldsValidated && (
                            <p className="text-success text-center">
                                Success, All fields are validated
                            </p>
                        )}

                        {/* Form Starts Here */}
                        <form onSubmit={evt => handleSubmit(evt)}>

                            {/* Name field */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={name.value}
                                    placeholder="Enter your name"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': name.error === false },
                                        { 'is-invalid': name.error }
                                    )}
                                    onChange={evt =>
                                        handleChange(validateFields.validateName, evt)
                                    }
                                    onBlur={evt =>
                                        handleBlur(validateFields.validateName, evt)
                                    }
                                />
                                <div className="invalid-feedback">{name.error}</div>
                            </div>

                            {/* Email field */}
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={email.value}
                                    placeholder="Enter your email"
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
                            {/* ConfirmPassword field */}
                            <div className="form-group">

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword.value}
                                    placeholder="Confirm"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': confirmPassword.error === false },
                                        { 'is-invalid': confirmPassword.error }
                                    )}
                                    onChange={evt =>
                                        handleChange(validateFields.validateConfirmPassword, evt)
                                    }
                                    onBlur={evt =>
                                        handleBlur(validateFields.validateConfirmPassword, evt)
                                    }
                                />
                                <div className="invalid-feedback">{confirmPassword.error}</div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary col-sm-2"
                                onMouseDown={() => handleSubmit}>
                                Sign Up
                            </button>

                            <div className="btn btn-secondary col-sm-2"
                                onClick={moveToLogin}
                                style={{ margin: '25px' }}>
                                Login
                            </div>






                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;