import React from 'react';

const slideMenu = (props) => {
    return (
        <div className="slide-menu">
            <nav className="slide-menu__nav">
                <ul>
                    <li>
                        <a href="/">Shop</a>
                    </li>
                    <li>
                        <a href="#">Account</a>
                    </li>
                    <li>
                        <a href="#">Checkout</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default slideMenu;
