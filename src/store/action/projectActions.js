import { getToken } from '../../services/helpers';
import { api } from '../../services/api';
import ScreensAuth from '../../services/ScreensAuth';

export const createProject = (payload) => (dispatch) => {

    return api({
        url: 'http://api.doodleflow.io/api/v1/project/createNew', payload, method: 'POST', headers: {
            "x-access-token": getToken(),
            "platform": "web"
        }
    });

}

export const listIndustries = (payload) => (dispatch) => {

    return api({ url: 'http://api.doodleflow.io/v1/project/industry', method: 'GET' });
}

export const listProjects = (payload) => (dispatch) => {

    return api({
        url: 'http://api.doodleflow.io/api/v1/project/list?page=1&offset=10&query=&limit=20', method: 'GET', headers: {
            "x-access-token": getToken(),
            "platform": "web"
        }
    });
}

export const projectDetails = (payload) => (dispatch) => {

    return api({
        url: `http://api.doodleflow.io/api/v1/project/detail/${payload}`, method: 'GET', headers: {
            "x-access-token": getToken(),
            "platform": "web"
        }
    });
}

export const uploadScreens = (payload) => dispatch => {

    return ScreensAuth('http://api.doodleflow.io/api/v1/screens/project', 'POST', payload)
}

export const listScreens = (payload) => dispatch => {

    return api({
        url: `http://api.doodleflow.io/api/v1/projects/getScreens?projectId=${payload}&type=saved&screenName=&deviceType=mobile`, method: 'GET', headers: {
            "x-access-token": getToken(),
            "platform": "web"
        }
    });
}