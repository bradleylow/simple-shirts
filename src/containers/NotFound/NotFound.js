import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NotFound extends Component {

    render () {

        return (
            <div className="page-not-found">
                <h1>Oops!</h1>
                <p>We can't seem to find what you're looking for.</p>
                <div className="button-wrapper my-12">
                    <NavLink to="/" className="button button--small button--blue">See the Shop</NavLink>
                </div>
            </div>
        );
    }
}

export default NotFound;
