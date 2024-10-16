export default async function getHook(url: string) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer your-token-here'
        },
    });
    let data = await response.data
    if (response.status === 200) {
        return {success: data}
    }
    if (response.status === 200) {
        return {success: data}
    }
    if (response.status === 201) {
        return {warning: data}
    }
    if (response.status === 500) {
        return {error: data}
    }
    

}