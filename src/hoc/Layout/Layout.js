import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import SlideMenu from '../../components/Navigation/SlideMenu/SlideMenu';
import Overlay from '../../components/UI/Overlay/Overlay';

class Layout extends Component {

    state = {
        showSlideMenu: false
    }

    slideMenuClosedHandler = () => {
        this.setState({ showSlideMenu: false });
    }

    slideMenuToggleHandler = () => {
        this.setState((prevState) => {
            return { showSlideMenu: !prevState.showSlideMenu };
        });
    }

    render () {
        return (
            <Aux>
                <Header
                    collapse={this.state.showSlideMenu}
                    slideToggleClicked={this.slideMenuToggleHandler}
                    isAuth={this.props.isAuth}
                />
                <Overlay show={this.state.showSlideMenu} clicked={this.slideMenuClosedHandler} />
                <SlideMenu
                    open={this.state.showSlideMenu}
                    closed={this.slideMenuClosedHandler}
                    isAuth={this.props.isAuth}
                />
                <main className="container mx-auto lg:mt-24">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);
