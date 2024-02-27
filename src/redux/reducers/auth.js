import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING, 
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL
} from '../actions/auth/types'

const initialState = {
    access: localStorage.getItem('access'),
    isAuthenticated: localStorage.getItem('access') ? true : false,
    user: null,
    loading: false,
    user_loading: true,
}

export default function auth(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                user_loading: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                user_loading: false
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.token);
            return {
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('access'),
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}