import { CLEAR_SUCCESS, CURRENT, CURRENT_REQUEST, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, FAIL, GETALLUSERS, LOGIN, LOGIN_REQUEST, LOGOUT, REGISTER, REGISTER_REQUEST } from "../ActionTypes/authActionTypes"

const initiialState = {
    user: {},
    users: [],
    errors: [],
    loading: false,
    success: false
}


const AuthReducer = (state = initiialState, action) => {
    switch (action.type) {

        //loading states

        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case CURRENT_REQUEST:
        case EDIT_USER_REQUEST:
            return {
                ...state,
                loading: true,
                errors: [],
                success: false
            }

        //success states

        case REGISTER:
            
            return { ...state, user: action.payload.newUser, loading: false, errors: [], success: true }

        case LOGIN:
            
            return { ...state, user: action.payload.found, loading: false, errors: [], success: true }

        case CURRENT: return { ...state, user: action.payload, loading: false, errors: [] }

        case EDIT_USER_SUCCESS: return { ...state, user: action.payload, loading: false, errors: [], success: true }

        case FAIL:
        case EDIT_USER_FAIL:
            return {
                ...state, errors: action.payload,
                user: action.type === FAIL ? {} : state.user,
                loading: false,
                success: false
            }

        case LOGOUT:
            
            return {
                ...state, user: {}, errors: [], loading: false, success: true
            }


        case GETALLUSERS: return { ...state, users: action.payload, loading: false }

        case CLEAR_SUCCESS:
            return {
                ...state,
                success: false
            }

        default: return state
    }
}

export default AuthReducer