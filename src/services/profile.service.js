import Axios from 'axios'
import HttpCommon from "@/common/http-common"

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/profile'
const USER_ID = localStorage.id

export default {
    getAll() {
        return Axios.get(RESOURCE_NAME + '/' + USER_ID, HttpCommon.setHeaders())
    },

    update(id, data) {
        return Axios.post(RESOURCE_NAME + '/' + USER_ID, data, HttpCommon.setHeaders())
    }
}