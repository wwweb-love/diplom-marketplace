import {server} from "../constants"

export const getAdminDataId = (adminDataType, id) => (
    fetch(`http://${server.ip}:${server.port}/admin/${adminDataType}/${id}`, { credentials: 'include' }).then(loaded => loaded.json())
)
