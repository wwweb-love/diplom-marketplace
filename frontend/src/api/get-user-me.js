export const getUserMe = () => (
    fetch("http://localhost:3000/auth/me", { credentials: 'include' })
        .then(loaded => loaded.json())
)
