import React from 'react';

const header = (props) => {
    return (
        <header className="flex justify-between items-center px-6 lg:px-12 py-6 lg:py-6">
            <a href="/" className="logo p-2">
                <h4>SS</h4>
            </a>
            <div className="nav-toggle lg:hidden">
                <div className="nav-toggle__bar nav-toggle__bar--top"></div>
                <div className="nav-toggle__bar nav-toggle__bar--bottom"></div>
            </div>
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
