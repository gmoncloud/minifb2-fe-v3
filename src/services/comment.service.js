import Axios from 'axios'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/comment'
const OPTIONS = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.access_token
    }
}

export default {
    create(data) {
        return Axios.post(RESOURCE_NAME, data, OPTIONS);
    }
}