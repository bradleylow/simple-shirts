import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/FormElements/Input/Input';
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
        // const updatedLoginForm = {
        //     ...this.state.loginForm
        // };
        //
        // const updatedFormElement = {
        //     ...updatedLoginForm[inputIdentifier]
        // };
        //
        // updatedFormElement.value = e.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        // updatedLoginForm[inputIdentifier] = updatedFormElement;
        //
        // let formIsValid = true;
        //
        // for (let inputIdentifier in updatedLoginForm) {
        //     formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        // }
        // this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});

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
                <div className="form__row text-center">
                    <button type="submit" className="button button--blue">
                        {this.state.isLogin === true ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </form>
        );

        let authState = (
            <div className="auth-state">
                <p className="mb-2">
                    {this.state.isLogin === true ? 'Don\'t have an account?' : 'Already have an account?'}
                </p>
                <span onClick={this.switchAuthStateHandler}>
                    {this.state.isLogin === true ? 'Create an Account' : 'Login into Account'}
                </span>
            </div>
        )

        return (
            <div className="login">
                <div className="login__wrapper">
                    {form}
                    <div className="button-wrapper text-center mt-12">
                        {authState}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isLogin) => dispatch(actions.auth(email, password, isLogin))
    };
}

export default connect(null, mapDispatchToProps)(Auth);
