import server from "../constants"

export const postCreateAdminData = (adminDataType, data) => (
    fetch(`http://${server.ip}:${server.port}/admin/${adminDataType}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            }).then(loaded => loaded.json())
)
