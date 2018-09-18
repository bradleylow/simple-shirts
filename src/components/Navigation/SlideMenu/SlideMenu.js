import React from 'react';
import { NavLink } from 'react-router-dom';

const slideMenu = (props) => {
    return (
        <div className={props.open ? 'slide-menu active' : 'slide-menu'}>
            <nav className="slide-menu__nav">
                <ul>
                    <li>
                        <NavLink to="/" exact>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" exact>Account</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" exact>Cart</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default slideMenu;
