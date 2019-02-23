export const request = async ({url, method, body, headers}) => {
    const response = await fetch(url, {
        method,
        headers: {
            ...headers
        },
        body,
    })
    if(!response.ok) {
        return
    }
    const data = response.json()
    return data
}

export default request