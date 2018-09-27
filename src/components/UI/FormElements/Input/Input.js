import React from 'react';

const input = (props) => {

    return (
        <div className="form__row">
            <label className="form__label">{props.label}</label>
            <input
                className="form__input"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
        </div>
    );
};

export default input;
