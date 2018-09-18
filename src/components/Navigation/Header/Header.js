import React from 'react';

import MenuToggle from './MenuToggle/MenuToggle';

const header = (props) => {
    return (
        <header className="flex justify-between items-center px-6 lg:px-12 py-6 lg:py-6">
            <a href="/" className="logo p-2">
                <h4>SS</h4>
            </a>
            <MenuToggle active={props.collapse} clicked={props.slideToggleClicked} />
            <nav className="main-nav list-reset hidden lg:block">
                <ul className="flex">
                    <li>
                        <a href="/">Shop</a>
                    </li>
                    <li>
                        <a href="#">Account</a>
                    </li>
                    <li>
                        <a href="#">Cart</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default header;
