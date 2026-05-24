export const putAdminData = (activeSection, data) => (
    fetch(`http://localhost:3000/admin/${activeSection}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(loaded => loaded.json())
)
