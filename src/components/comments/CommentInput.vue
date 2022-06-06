<template>
  <div class="card-footer">
    <form @submit.prevent="commentPostForm">
      <img class="img-fluid img-circle img-sm" src="/admin/dist/img/user4-128x128.jpg" alt="Alt Text">
      <div class="img-push">
        <input
            type="text"
            v-model="comment.comment_text"
            @keyup.enter="commentPost()"
            class="form-control form-control-sm"
            placeholder="Press enter to post comment"
        />
      </div>
    </form>
  </div>
</template>

<script>
import CommentService from "@/services/comment.service";
export default {
  name: 'CommentInput',
  props: {
    postId: Number,
  },
  data(){
    return {
      comment: {
        user_id: parseInt(localStorage.id),
        post_id: this.postId,
        comment_text: '',
      }
    }
  },
  methods: {
    async commentPost() {
      const data = this.comment;
      await CommentService.create(data).then((response) => {
        this.comment.comment_text = '';
        this.$emit('loadPosts');
        console.log(response.data)
      }).catch((error) => {
        console.log(error);
      })
    },
  }
}
</script>