import React from 'react';
import { Redirect } from 'react-router-dom';

const noAuth = (url, method, payload) => {
    let promise = new Promise(async (resolve, reject) => {
        let response = await fetch(url, {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json();
        if (response.status === 404) {
            return <Redirect to="/" />
        }
        if (!response.ok) {
            reject(json)
        } else {
            resolve(json);
        }
    })

    return promise;
}

export default noAuth;