import server from "../constants"

export const getAdminData = (adminDataType) => (
    fetch(`http://${server.ip}:${server.port}/admin/${adminDataType}`, { credentials: 'include' }).then(loaded => loaded.json())
)
