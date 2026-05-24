export const getUsers = () => (
    fetch(`http://localhost:3000/users`, {credentials: 'include'}).then(loaded => loaded.json())
)
