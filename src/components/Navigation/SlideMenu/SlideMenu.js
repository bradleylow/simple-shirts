import React from 'react';
import { NavLink } from 'react-router-dom';

const slideMenu = (props) => {
    return (
        <div className={props.open ? 'slide-menu active' : 'slide-menu'}>
            <nav className="slide-menu__nav">
                <ul onClick={props.closed}>
                    <li>
                        <NavLink to="/" exact>Shop</NavLink>
                    </li>
                    { !props.isAuth
                        ? <li><NavLink to='/login' exact>Login</NavLink></li>
                        : <li><NavLink to='/dashboard' exact>Dashboard</NavLink></li>
                    }
                    <li>
                        <NavLink to="/checkout" exact>Cart</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default slideMenu;
