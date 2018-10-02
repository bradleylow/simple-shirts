import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Dashboard extends Component {

    componentDidMount () {
        
    }

    logoutHandler = () => {
        this.props.onLogout();
        this.props.history.push('/');
    }

    render () {
        return (
            <div className="dashboard">
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
        userEmail: state.auth.email,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
