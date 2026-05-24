export const getAdminData = (activeSection) => (
    fetch(`http://localhost:3000/admin/${activeSection}`, {credentials: 'include'}).then(loaded => loaded.json())
)
