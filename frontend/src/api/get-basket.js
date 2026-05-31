import { server } from "../constants"

export const getBasket = () => (
    fetch(`http://${server.ip}:${server.port}/basket`, { credentials: 'include' }).then(loaded => loaded.json())
)