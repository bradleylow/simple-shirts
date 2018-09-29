import axios from 'axios';

import * as actions from './actions';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    };
};

export const authSuccess = (token, userId, email) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isLogin) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAtsvroI5P9VcX7eIDjttRofpXWplECZlk';

        if (!isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAtsvroI5P9VcX7eIDjttRofpXWplECZlk';
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};
