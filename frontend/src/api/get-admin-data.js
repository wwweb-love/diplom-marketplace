export const getAdminData = (adminDataType) => (
    fetch(`http://localhost:3000/admin/${adminDataType}`, { credentials: 'include' }).then(loaded => loaded.json())
)
