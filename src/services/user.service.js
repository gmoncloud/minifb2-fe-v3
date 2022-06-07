import Axios from 'axios'

const RESOURCE_NAME_LOGIN = process.env.VUE_APP_ROOT_API + '/v1/login'
const RESOURCE_NAME_REGISTER = process.env.VUE_APP_ROOT_API + '/v1/register'
const OPTIONS = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export default {
    login(data) {
        return Axios.post(RESOURCE_NAME_LOGIN, data, OPTIONS);
    },

    register(data) {
        return Axios.post(RESOURCE_NAME_REGISTER, data, OPTIONS);
    },

    getAvatar(username) {
        if (!username) {
            username = localStorage.username
        }
        return 'https://ui-avatars.com/api/?name=' + username + '&background=random&size=128&font-size=0.5&bold=true'
    }
}