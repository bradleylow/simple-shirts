import React from 'react';

const menuToggle = (props) => {
    return (
        <div className={props.active ? 'nav-toggle lg:hidden active' : 'nav-toggle lg:hidden'} onClick={props.clicked}>
            <div className="nav-toggle__bar nav-toggle__bar--top"></div>
            <div className="nav-toggle__bar nav-toggle__bar--bottom"></div>
        </div>
    );
};

export default menuToggle;
