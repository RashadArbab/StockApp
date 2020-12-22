import React, { Component } from 'react';
import { validateFields } from './Validation';
import classnames from 'classnames';
import './Login.css' ;

const initialState = {
    
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

    submitCalled: false,
    allFieldsValidated: false
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    loginFunction(email, password) {
        return console.log(`setup Login function: ${email.value} ${password.value}`);
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

   

    

    /*
     * validate all fields
     * check if all fields are valid if yes then submit the Form
     * otherwise set errors for the feilds in the state
     */
    handleSubmit(evt) {
        evt.preventDefault();
        // validate all fields
        const {  email, password } = this.state;
        const emailError = validateFields.validateEmail(email.value);
        const passwordError = validateFields.validatePassword(password.value);
      
        if ([emailError, passwordError].every(e => e === false)) {
            // no errors submit the form
            this.loginFunction( email, password);

            // clear state and show all fields are validated
            this.setState({ ...initialState, allFieldsValidated: true });
            this.showAllFieldsValidated();
        } else {
            // update the state with errors
            this.setState(state => ({
              
                email: {
                    ...state.email,
                    validateOnChange: true,
                    error: emailError
                },
                password: {
                    ...state.password,
                    validateOnChange: true,
                    error: passwordError
                }
            }));
        }
    }

    showAllFieldsValidated() {
        setTimeout(() => {
            this.setState({ allFieldsValidated: false });
        }, 1500);
    }

    moveToRegister() {
        window.location.href = "/Register/"
    }



    render() {
        const {email, password, allFieldsValidated } = this.state;
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
                            


                            <button className="btn btn-light "
                                onClick={this.moveToRegister}
                                style={{margin: '25px'}}>
                                Sign Up
                            </button>



                            <button
                                type="submit"
                                className="btn btn-primary "
                                onMouseDown={() => this.setState({ submitCalled: true })}>
                                Login
                            </button>



                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;