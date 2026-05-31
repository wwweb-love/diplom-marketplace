import {server} from "../constants"

export const deleteAdminDataId = (adminDataType, id) => (
    fetch(`http://${server.ip}:${server.port}/admin/${adminDataType}/${id}`, {
        credentials: 'include',
        method: "DELETE"
    })
        .then(loaded => loaded.json())
)
