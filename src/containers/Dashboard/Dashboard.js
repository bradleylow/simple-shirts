import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Dashboard extends Component {

    componentDidMount () {

    }

    logoutHandler = () => {
        this.props.onLogout();
        this.props.emptyCart(this.props.userId);
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
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        emptyCart: (userId) => dispatch(actions.emptyCart(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
