import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL
} from './types'

import axios from 'axios'

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, config);
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (username, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({
        username,
        password
    });
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, body, config);
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());

            dispatch({
                type: REMOVE_AUTH_LOADING
            });
        } else {
            const errorData = await res.json();
            dispatch({
                type: LOGIN_FAIL,
                payload: errorData.message
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
        }
    }catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

