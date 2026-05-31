import {server} from "../constants"

export const postRegistration = (data) => (
    fetch(`http://${server.ip}:${server.port}/auth/register`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        }).then(loaded => loaded.json())
)