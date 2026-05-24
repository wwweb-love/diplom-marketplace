export const postLogout = (formData) => (
    fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({})
    }).then(loaded => loaded.json())
)