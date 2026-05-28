export const putEditUserPassAdminData = (data) => (
    fetch(`http://localhost:3000/admin/users/${data.id}/pass`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
)
