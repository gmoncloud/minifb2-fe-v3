<template>
  <button
      type="button"
      class="btn btn-sm"
      @click="doLike()"><i class="far fa-thumbs-up"></i> Like
  </button>
</template>

<script>
import LikeService from "@/services/like.service";
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'LikeInput',
  data() {
    return {
      like: {
        user_id: parseInt(localStorage.id),
        post_id: this.postId,
        like: '',
      }
    }
  },
  methods: {
    async doLike() {
      const data = this.like;
      await LikeService.likePost(data).then((response) => {
        if(response.data){
          this.$emit('loadPosts')
        }
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message
        toaster.show(this.message)
      })
    },
  },
  props: {
    postId: Number
  }
}
</script>