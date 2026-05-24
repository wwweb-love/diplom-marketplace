export const postAuth = (formData) => (
    fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        
        body: JSON.stringify(formData)
    }).then(loaded => loaded.json())
)