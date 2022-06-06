<template>
  <button
      type="button"
      class="btn btn-sm"
      @click="doLike()"><i class="far fa-thumbs-up"></i> Like
  </button>
</template>

<script>
import LikeService from "@/services/like.service";
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
  methods:  {
    async doLike() {
      const data = this.like;
      await LikeService.likePost(data).then((response) => {
        this.$emit('loadPosts');
        console.log(response.data)
      }).catch((error) => {
        console.log(error);
      })
    },
  },
  props: {
    postId: Number
  }
}
</script>