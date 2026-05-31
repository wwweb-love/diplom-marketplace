import server from "../constants"

export const putEditUserPassAdminData = (data) => (
    fetch(`http://${server.ip}:${server.port}/admin/users/${data.id}/pass`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
)
