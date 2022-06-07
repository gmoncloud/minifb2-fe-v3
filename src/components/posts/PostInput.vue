<template>
  <div class="col-md-12">
    <div class="card card-danger direct-chat direct-chat-danger">
      <div class="card-footer">
        <form @submit.prevent="onSubmitPost" id="post-input" enctype="multipart/form-data">
          <div class="input-group">
            <input type="file" class="form-control" ref="fileupload" @change="onChange">
          </div>
          <div class="input-group">
            <textarea v-model="post.writtenText" name="written_text" class="comment float-start form-control"
                      placeholder="Whats on your mind"></textarea>
            <span class="input-group-append">
              <button type="submit" class="btn btn-primary">Post</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "@/services/post.service";
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'PostInput',
  data() {
    return {
      post: {
        writtenText: '',
      },
    }
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
    },

    clearForm() {
      this.post.writtenText = '';
      this.file = '';
      this.$refs.fileupload.value = null;
    },

    async onSubmitPost() {
      let data = new FormData()
      data.append('user_id', localStorage.id);
      data.append('written_text', this.post.writtenText);
      data.append('post_image', this.file);

      await PostService.create(data).then(() => {
        this.clearForm();
        this.$emit('loadPosts');
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message
        toaster.show(this.message)
      })
    },
  }
}
</script>