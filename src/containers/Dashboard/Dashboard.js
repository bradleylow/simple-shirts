import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render () {

        return (
            <div className="dashboard">
                <h5>Logged in as {this.props.userEmail}</h5>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userEmail: state.auth.email
    };
}

export default connect(mapStateToProps)(Dashboard);
