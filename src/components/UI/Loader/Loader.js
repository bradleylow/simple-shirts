import React from 'react';

const loader = (props) => {
    return (
        <div className={'loader loader--' + props.type}>
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    );
};

export default loader;
