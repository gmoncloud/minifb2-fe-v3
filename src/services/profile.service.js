import Axios from 'axios'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/profile'
const USER_ID = localStorage.id
const OPTIONS = {
  headers: {
    'Content-Type': 'multipart/form-data', 
    'Authorization' : 'Bearer ' + localStorage.access_token
  }
}

export default {
  getAll() {
    return Axios.get(RESOURCE_NAME + '/' + USER_ID, OPTIONS);
  },

  update(id, data) {
    return Axios.post(RESOURCE_NAME + '/' + USER_ID, data, OPTIONS);
  }
}