import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Header from '../../containers/Header/Header';
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
                <Header collapse={this.state.showSlideMenu} slideToggleClicked={this.slideMenuToggleHandler} />
                <Overlay show={this.state.showSlideMenu} />
                <SlideMenu
                    open={this.state.showSlideMenu}
                    closed={this.slideMenuClosedHandler} />
                <main className="container mx-auto lg:mt-24">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
