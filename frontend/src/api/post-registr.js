export const postRegistr = (formData) => (
    fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(formData)
    }).then(loaded => loaded.json())
)