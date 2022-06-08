import Axios from 'axios'
import HttpCommon from "@/common/http-common"

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/post'
const RESOURCE_NAME_USER_POSTS = process.env.VUE_APP_ROOT_API + '/v1/view-user-posts'
const USER_ID = localStorage.id

export default {
    getAllPosts() {
        return Axios.get(RESOURCE_NAME, HttpCommon.setHeaders())
    },

    getAllUserPosts() {
        return Axios.get(RESOURCE_NAME_USER_POSTS + '/' + USER_ID, HttpCommon.setHeaders())
    },

    delete(id) {
        return Axios.delete(RESOURCE_NAME + '/' + id, HttpCommon.setHeaders())
    },

    create(data) {
        return Axios.post(RESOURCE_NAME, data, HttpCommon.setHeaders())
    },

    getPostById(post_id) {
        return Axios.get(RESOURCE_NAME + '/' + post_id, HttpCommon.setHeaders())
    },

    update(post_id, data) {
        return Axios.post(RESOURCE_NAME + '/' + post_id, data, HttpCommon.setHeaders())
    },

    loadMorePosts(nextPage) {
        return Axios.get(RESOURCE_NAME + `?page=${nextPage}`, HttpCommon.setHeaders())
    },

    loadMoreUserPosts(nextPage) {
        return Axios.get(RESOURCE_NAME_USER_POSTS + '/' + USER_ID + `?page=${nextPage}`, HttpCommon.setHeaders())
    }
}