export const deleteAdminData = (activeSection, id) => (
    fetch(`http://localhost:3000/admin/${activeSection}/${id}`, {
        credentials: 'include',
        method: "DELETE"})
        .then(loaded => loaded.json())
)
