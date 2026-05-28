export const postLogout = () => (
    fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({})
    }).then(loaded => loaded.json())
)