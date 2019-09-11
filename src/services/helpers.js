import { createBrowserHistory } from "history";

export const getToken = () => {

    let token = localStorage.getItem('token')
    return token ? token : ""
}

export const history = createBrowserHistory()
