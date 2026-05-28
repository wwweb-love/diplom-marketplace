export const postCreateAdminData = (adminDataType, data) => (
    fetch(`http://localhost:3000/admin/${adminDataType}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            }).then(loaded => loaded.json())
)
