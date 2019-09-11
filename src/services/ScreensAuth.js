import { getToken } from "./helpers"

const ScreensAuth = (url, method, payload) => {
    let promise = new Promise(async (resolve, reject) => {
        let response = await fetch(url, {
            method: method,
            body: payload,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": getToken(),
                "platform": "web"
            }
        })
        let json = await response.json();

        if (!localStorage.getItem('token')) {
            localStorage.removeItem('name');
            window.location.replace('/');
        }

        if (response.status === 413) {
            return reject('Image Too Large');
        }
        if (!response.ok) {
            reject(json);
        } else {
            resolve(json);
        }
    });

    return promise;
}

export default ScreensAuth;