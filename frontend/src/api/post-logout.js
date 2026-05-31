import {server} from "../constants"

export const postLogout = () => (
    fetch(`http://${server.ip}:${server.port}/auth/logout`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({})
    }).then(loaded => loaded.json())
)