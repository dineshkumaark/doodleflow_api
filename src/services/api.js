export const api = async (request = {}) => {
    const { url, method, payload, headers = {} } = request;
    let promise = new Promise(async (resolve, reject) => {
        let response = await fetch(url, {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            window.location.replace('/');
        }

        let json = await response.json();

        if (!response.ok) {
            reject(json)
        } else {
            resolve(json)
        }

    })
    return promise;
}