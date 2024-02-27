import { 
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
    GET_DOCENTE_LIST_SUCCESS,
    GET_DOCENTE_LIST_FAIL,
    GET_ESTUDENT_LIST_SUCCESS,
    GET_ESTUDENT_LIST_FAIL,
    GET_PERSONAL_LIST_SUCCESS,
    GET_PERSONAL_LIST_FAIL
 } from "../actions/users/types";

const initialState = {
    user_list: null,
    lista_docentes: null,
    lista_estudiantes: null,
    lista_personal: null
}

export default function users(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                user_list: payload.users,
            }
        case GET_USER_LIST_FAIL:
            return {
                ...state,
                user_list: null,
            }
        case GET_DOCENTE_LIST_SUCCESS:
            return {
                ...state,
                lista_docentes: payload.docentes,
            }
        case GET_DOCENTE_LIST_FAIL:
            return {
                ...state,
                lista_docentes: null,
            }
        case GET_ESTUDENT_LIST_SUCCESS:
            return {
                ...state,
                lista_estudiantes: payload.estudiantes,
            }
        case GET_ESTUDENT_LIST_FAIL:
            return {
                ...state,
                lista_estudiantes: null,
            }
        case GET_PERSONAL_LIST_SUCCESS:
            return {
                ...state,
                lista_personal: payload.personals,
            }
        case GET_PERSONAL_LIST_FAIL:
            return {
                ...state,
                lista_personal: null,
            }
        default:
            return state;
    }
}