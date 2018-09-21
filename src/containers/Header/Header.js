import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';

class Header extends Component {

    render () {
        return (
            <header className="flex justify-between items-center px-6 lg:px-12 py-6 lg:py-6">
                <NavLink to='/' exact className="logo p-2">
                    <h4>SS</h4>
                </NavLink>
                <MenuToggle active={this.props.collapse} clicked={this.props.slideToggleClicked} />
                <nav className="main-nav list-reset hidden lg:block">
                    <ul className="flex">
                        <li>
                            <NavLink to='/' exact>Shop</NavLink>
                        </li>
                        <li>
                            <NavLink to='/account' exact>Account</NavLink>
                            
                        </li>
                        <li>
                            <NavLink to='/checkout' exact>Cart</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
