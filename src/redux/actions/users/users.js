import axios from "axios";
import { 
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
    GET_DOCENTE_LIST_SUCCESS,
    GET_DOCENTE_LIST_FAIL,
    GET_ESTUDENT_LIST_SUCCESS,
    GET_ESTUDENT_LIST_FAIL,
    GET_PERSONAL_LIST_SUCCESS,
    GET_PERSONAL_LIST_FAIL
 } from "./types";
 
 export const get_user_list = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
 
     try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/admin-users`, config);
         if (res.status === 200) {
            dispatch({
                type: GET_USER_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_USER_LIST_FAIL
            });
        }
     } catch (err) {
         let errorMessage;
         if (err.response && err.response.data && err.response.data.message) {
             errorMessage = err.response.data.message;
         } else {
             errorMessage = "Ocurrió un error al intentar obtener la lista de usuarios";
         }
         dispatch({
             type: GET_USER_LIST_FAIL,
             payload: errorMessage
         });
     }
 };
 

export const get_docentes_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/admin-docentes`, config)
        if (res.status === 200) {
            dispatch({
                type: GET_DOCENTE_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_DOCENTE_LIST_FAIL
            })
        }
    } catch (err) {
        let errorMessage;
         if (err.response && err.response.data && err.response.data.message) {
             errorMessage = err.response.data.message;
         } else {
             errorMessage = "Ocurrió un error al intentar obtener la lista de usuarios";
         }
         dispatch({
             type: GET_DOCENTE_LIST_FAIL,
             payload: errorMessage
         });
    }
}

export const get_estudiantes_list = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/admin-estudiantes`, config)
        if (res.status === 200) {
            dispatch({
                type: GET_ESTUDENT_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ESTUDENT_LIST_FAIL
            })
        }
    } catch (err) {
        let errorMessage;
         if (err.response && err.response.data && err.response.data.message) {
             errorMessage = err.response.data.message;
         } else {
             errorMessage = "Ocurrió un error al intentar obtener la lista de usuarios";
         }
         dispatch({
             type: GET_ESTUDENT_LIST_FAIL,
             payload: errorMessage
         });
    }
}

export const get_personal_list = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/admin-personal`, config)
        if (res.status === 200) {
            dispatch({
                type: GET_PERSONAL_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PERSONAL_LIST_FAIL
            })
        }
    } catch (err) {
        let errorMessage;
        if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
        } else {
            errorMessage = "Ocurrió un error al intentar obtener la lista de usuarios";
        }
        dispatch({
            type: GET_PERSONAL_LIST_FAIL,
            payload: errorMessage
        });
    }
}