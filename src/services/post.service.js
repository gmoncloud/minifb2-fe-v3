import Axios from 'axios'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/post'
const RESOURCE_NAME_USER_POSTS = process.env.VUE_APP_ROOT_API + '/v1/view-user-posts'
const USER_ID = localStorage.id
const OPTIONS = {
  headers: {
    'Content-Type': 'multipart/form-data', 
    'Authorization' : 'Bearer ' + localStorage.access_token
  }
}

export default {
  getAllPosts() {
    return Axios.get(RESOURCE_NAME, OPTIONS);
  },

  getAllUserPosts() {
    return Axios.get(RESOURCE_NAME_USER_POSTS + '/' + USER_ID, OPTIONS);
  },

  delete(id) {
    return Axios.delete(RESOURCE_NAME + '/' + id, OPTIONS)
  },

  create(data) {
    return Axios.post(RESOURCE_NAME, data, OPTIONS);
  },

  getPostById(post_id) {
    return Axios.get(RESOURCE_NAME + '/' + post_id, OPTIONS);
  },

  update(post_id, data) {
    return Axios.post(RESOURCE_NAME + '/' + post_id, data, OPTIONS);
  },

  loadMorePosts(nextPage) {
    return Axios.get(RESOURCE_NAME + `?page=${nextPage}`, OPTIONS);
  },

  loadMoreUserPosts(nextPage) {
    return Axios.get(RESOURCE_NAME_USER_POSTS + '/' + USER_ID + `?page=${nextPage}`, OPTIONS);
  }
}