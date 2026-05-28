
export const deleteAdminDataId = (adminDataType, id) => (
    fetch(`http://localhost:3000/admin/${adminDataType}/${id}`, {
        credentials: 'include',
        method: "DELETE"
    })
        .then(loaded => loaded.json())
)
