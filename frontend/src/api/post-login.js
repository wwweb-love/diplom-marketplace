import {server} from "../constants"

export const postLogin = (data) => (
    fetch(`http://${server.ip}:${server.port}/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },

        body: JSON.stringify(data)
    }).then(loaded => loaded.json())
)