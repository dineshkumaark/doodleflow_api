import { api } from '../../services/api';
import { getToken } from '../../services/helpers';

export const loginUser = (payload) => (dispatch) => {

    return api({ url: 'http://api.doodleflow.io/v1/auth/login', payload, method: 'POST' });
}

export const signupUser = (payload) => (dispatch) => {

    return api({ url: 'http://api.doodleflow.io/v1/auth/signup', payload, method: 'POST' });
}

export const getUserDetails = (payload) => (dispatch) => {

    return api({
        url: 'http://api.doodleflow.io/api/v1/user', method: 'GET', headers: {
            "x-access-token": getToken(),
            "platform": "web"
        }
    });
}
