import React from 'react';

const overlay = (props) => {
    return (
        <div className={props.show ? 'overlay active' : 'overlay'}></div>
    );
};

export default overlay;
