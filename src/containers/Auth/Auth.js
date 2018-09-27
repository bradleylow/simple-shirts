import React, { Component } from 'react';

import Input from '../../components/UI/FormElements/Input/Input';

class Auth extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
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
                    placeholder: 'Password'
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
        formIsValid: false
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

        console.log(this.state.loginForm[inputName].validation);

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

    loginHandler (e) {
        e.preventDefault();
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
            <form className="form" onSubmit={this.loginHandler}>
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
                    <button type="submit" className="button button--blue">Login</button>
                </div>
            </form>
        );

        return (
            <div className="login">
                <div className="login__wrapper">
                    {form}
                </div>
            </div>
        );
    }
}

export default Auth;
