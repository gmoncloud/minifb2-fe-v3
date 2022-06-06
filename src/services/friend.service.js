import Axios from 'axios'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/friend'
const RESOURCE_NAME_FIND_FRIENDS = process.env.VUE_APP_ROOT_API + '/v1/find-friends'
const USER_ID = localStorage.id
const OPTIONS = {
  headers: {
    'Content-Type': 'multipart/form-data', 
    'Authorization' : 'Bearer ' + localStorage.access_token
  }
}

export default {
  getAll() {
    return Axios.get(RESOURCE_NAME + '/' + USER_ID, OPTIONS)
  },

  delete(friend_id) {
    return Axios.delete(RESOURCE_NAME + '/' + friend_id, OPTIONS)
  },

  findFriends() {
    return Axios.get(RESOURCE_NAME_FIND_FRIENDS + '/' + USER_ID, OPTIONS)
  },

  create(data) {
    return Axios.post(RESOURCE_NAME, data, OPTIONS)
  }
}