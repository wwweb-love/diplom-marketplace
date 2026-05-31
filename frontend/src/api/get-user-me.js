import server from "../constants"

export const getUserMe = () => (
    fetch(`http://${server.ip}:${server.port}/auth/me`, { credentials: 'include' })
        .then(loaded => loaded.json())
)
