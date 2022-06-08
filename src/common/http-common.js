export default {
    setHeaders() {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.access_token
            }
        }
    }
}