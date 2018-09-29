import React from 'react';

const overlay = (props) => {
    return (
        <div className={props.show ? 'overlay active' : 'overlay'} onClick={props.clicked}></div>
    );
};

export default overlay;
