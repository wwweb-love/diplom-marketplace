export const getAdminDataId = (adminDataType, id) => (
    fetch(`http://localhost:3000/admin/${adminDataType}/${id}`, { credentials: 'include' }).then(loaded => loaded.json())
)
