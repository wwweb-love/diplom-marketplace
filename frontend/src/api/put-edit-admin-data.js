import {server} from "../constants"

export const putEditAdminData = (adminDataType, data) => (
    fetch(`http://${server.ip}:${server.port}/admin/${adminDataType}/${data.id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(loaded => loaded.json())
)
