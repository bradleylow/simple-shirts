import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class Dashboard extends Component {

    logoutHandler = () => {
        this.props.onLogout();
        this.props.history.push('/');
    }

    render () {

        let authRedirect = null;

        if (!this.props.isAuth) {
            authRedirect = <Redirect to='/login'/>
        }

        return (
            <div className="dashboard">
                {authRedirect}
                <h5>Logged in as {this.props.userEmail}</h5>
                <div className="button__wrapper mt-12 text-center lg:text-left">
                    <button className="button button--small button--danger" onClick={this.logoutHandler}>Logout</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null || localStorage.getItem('token') !== null,
        userEmail: state.auth.email
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
