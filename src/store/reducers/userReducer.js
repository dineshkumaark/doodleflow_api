import { LOGIN_USER, BAD_REQUEST } from '../actionTypes';

let initialState = {
    users: [],
    currentUser: '',
    err: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state
            }
        case BAD_REQUEST:
            return {
                ...state,
                err: action.payload
            }
        default:
            return state
    }
}