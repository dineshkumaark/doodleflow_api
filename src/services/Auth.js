import { getToken } from "./helpers";

const Auth = (url, method, content, payload) => {
    let promise = new Promise(async (resolve, reject) => {
        let response = await fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': content,
                "x-access-token": getToken(),
                "platform": "web"
            }
        })

        let json = await response.json();

        // console.log(window.location.replace('/'))

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            // history.push('/');
            window.location.replace('/')
        }

        if (!response.ok) {
            console.log(response.status)
            // localStorage.removeItem('token');
            // localStorage.removeItem('name');

        }

        if (!response.ok) {
            reject(json);
        } else {
            resolve(json);
        }
    })

    return promise;
}

export default Auth;