import React, { Component } from 'react';
import { validateFields } from './Validation';
import classnames from 'classnames';
import axios from 'axios';
import './Register.css';

const initialState = {
    name: {
        value: '',
        validateOnChange:
            false,
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    registerFunction(name, email, password) {
        var defaultStock = {
            Ticker: "AAPL",
            Market: "NASDAQ",
            Notes: ["Buy"]
        }
        
        var name = name
        var email= email
        var pass = password
        
        
        axios.post(`/api/users/register/${name}/${email}/${pass}/${defaultStock}`).then(res => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    /*
     * validates the field onBlur if sumbit button is not clicked
     * set the validateOnChange to true for that field
     * check for error
     */
    handleBlur(validationFunc, evt) {
        const field = evt.target.name;
        // validate onBlur only when validateOnChange for that field is false
        // because if validateOnChange is already true there is no need to validate onBlur
        if (
            this.state[field]['validateOnChange'] === false &&
            this.state.submitCalled === false
        ) {
            this.setState(state => ({
                [field]: {
                    ...state[field],
                    validateOnChange: true,
                    error: validationFunc(state[field].value)
                }
            }));
        }
        return;
    }

    /*
     * update the value in state for that field
     * check for error if validateOnChange is true
     */
    handleChange(validationFunc, evt) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
            [field]: {
                ...state[field],
                value: fieldVal,
                error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
            }
        }));
    }

    handleConfirmPassChange(validationFunc, evt, pass) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        console.log(`confirmPassChange ${pass} ${fieldVal} `);
        this.setState(state => ({
            [field]: {
                ...state[field],
                value: fieldVal,
                error: state[field]['validateOnChange'] ? validationFunc(pass, fieldVal) : ''
            }
        }));
    }

    handleConfirmPassBlur(validationFunc, evt, pass) {

        const field = evt.target.name;
        // validate onBlur only when validateOnChange for that field is false
        // because if validateOnChange is already true there is no need to validate onBlur
        if (
            this.state[field]['validateOnChange'] === false &&
            this.state.submitCalled === false
        ) {
            this.setState(state => ({
                [field]: {
                    ...state[field],
                    validateOnChange: true,
                    error: validationFunc(pass, state[field].value)
                }
            }));
        }
        return;
    }

    /*
     * validate all fields
     * check if all fields are valid if yes then submit the Form
     * otherwise set errors for the feilds in the state
     */
    handleSubmit(evt) {
        evt.preventDefault();
        // validate all fields
        const { name, email, password, confirmPassword } = this.state;
        const nameError = validateFields.validateName(name.value);
        const emailError = validateFields.validateEmail(email.value);
        const passwordError = validateFields.validatePassword(password.value);
        console.log(`handle submit ${confirmPassword.value} ${password.value} `)
        const confirmPasswordError = validateFields.validateConfirmPassword(password.value, confirmPassword.value);
        if ([nameError, emailError, passwordError, confirmPasswordError].every(e => e === false)) {
            // no errors submit the form
            this.registerFunction(name.value, email.value, password.value);

            // clear state and show all fields are validated
            this.setState({ ...initialState, allFieldsValidated: true });
            this.showAllFieldsValidated();
        } else {
            // update the state with errors
            this.setState(state => ({
                name: {
                    ...state.name,
                    validateOnChange: true,
                    error: nameError
                },
                email: {
                    ...state.email,
                    validateOnChange: true,
                    error: emailError
                },
                password: {
                    ...state.password,
                    validateOnChange: true,
                    error: passwordError
                },
                confirmPassword: {
                    ...state.confirmPassword,
                    validateOnChange: true,
                    error: confirmPasswordError
                }
            }));
        }
    }

    showAllFieldsValidated() {
        setTimeout(() => {
            this.setState({ allFieldsValidated: false });
        }, 1500);
    }

    moveToLogin() {
        window.location.href = "/login/"
    }



    render() {
        const { name, email, password, confirmPassword, allFieldsValidated } = this.state;
        return (
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
                        <form onSubmit={evt => this.handleSubmit(evt)}>

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
                                        this.handleChange(validateFields.validateName, evt)
                                    }
                                    onBlur={evt =>
                                        this.handleBlur(validateFields.validateName, evt)
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
                                        this.handleChange(validateFields.validateEmail, evt)
                                    }
                                    onBlur={evt =>
                                        this.handleBlur(validateFields.validateEmail, evt)
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
                                        this.handleChange(validateFields.validatePassword, evt)
                                    }
                                    onBlur={evt =>
                                        this.handleBlur(validateFields.validatePassword, evt)
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
                                        this.handleConfirmPassChange(validateFields.validateConfirmPassword, evt, password.value)
                                    }
                                    onBlur={evt =>
                                        this.handleConfirmPassBlur(validateFields.validateConfirmPassword, evt, password.value)
                                    }
                                />
                                <div className="invalid-feedback">{confirmPassword.error}</div>
                            </div>


                            <button className="btn btn-light "
                                onClick={this.moveToLogin}
                                style={{ margin: '25px' }}>
                                Login
                            </button>



                            <button
                                type="submit"
                                className="btn btn-primary "
                                onMouseDown={() => this.setState({ submitCalled: true })}>
                                Sign Up
                            </button>



                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;