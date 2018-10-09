import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/FormElements/Input/Input';
import Loader from '../../components/UI/Loader/Loader';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    autoFocus: true
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                label: 'Password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isLogin: true
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler (e, inputName) {
        const updatedLoginForm = {
            ...this.state.loginForm,
            [inputName]: {
                ...this.state.loginForm[inputName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.loginForm[inputName].validation),
                touched: true
            }
        }

        this.setState({ loginForm: updatedLoginForm})
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isLogin);
    }

    switchAuthStateHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin}
        });
    }

    render () {
        const formElementsArray = [];

        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <div className="form__wrapper">
                <form className="form" onSubmit={this.submitHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            label={formElement.config.label}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(e) => this.inputChangedHandler(e, formElement.id)} />
                    ))}
                    <div className="form__row flex justify-between md:flex-wrap items-center">
                        <div className="button-wrapper w-1/2 md:w-full md:text-center">
                            <button type="submit" className="button button--blue">
                                {this.state.isLogin === true ? 'Login' : 'Sign Up'}
                            </button>
                        </div>
                        <div className="auth-state text-right md:text-center w-1/2 md:w-full md:mt-12">
                            <p className="mb-2 whitespace-no-wrap">
                                {this.state.isLogin === true ? 'Don\'t have an account?' : 'Already have an account?'}
                            </p>
                            <span onClick={this.switchAuthStateHandler}>
                                {this.state.isLogin === true ? 'Create an Account' : 'Login into Account'}
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        );

        if (this.props.loading) {
            form = <Loader type="inject" />
        }

        let errorMessage = null;

        if (this.props.error) {
            let message = this.props.error.message;

            switch (message) {
                case 'EMAIL_EXISTS':
                    message = 'Email is already in use';
                    break;
                case 'INVALID_EMAIL':
                    message = 'Email is invalid';
                    break;
                case 'MISSING_PASSWORD':
                    message = 'Password is missing';
                    break;
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    message = 'Incorrect email or password';
                    break;
                default:
                    return message;
            }

            errorMessage = (
                <div className="error-message">
                    <p>{message}</p>
                </div>
            )
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            this.props.onAuthSetCart(this.props.token, this.props.userId);
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className="login">
                {authRedirect}
                <div className="login__wrapper">
                    {errorMessage}
                    {form}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        userId: state.auth.userId,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isLogin) => dispatch(actions.auth(email, password, isLogin)),
        onAuthSetCart: (token, userId) => dispatch(actions.cartAuthCheckState(token, userId)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
