<template>
  <div class="content-wrapper">
    <Post
        :postData="posts"
        :with-input="false"
        :more-exist="moreExist"
        @loadMore="loadMore"
    />
  </div>
</template>

<script>
import Post from '@/components/posts/Post.vue'
import PostService from "@/services/post.service";
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'PostsComponent',
  components: {
    Post
  },
  data() {
    return {
      moreExist: false,
      nextPage: 0,
      posts: []
    }
  },
  methods: {
    async loadAllPost() {
      await PostService.getAllPosts().then((response) => {
        this.posts = response.data.posts.data
        this.comments = response.data.posts.comments

        if (response.data.posts.current_page < response.data.posts.last_page) {
          this.moreExist = true
          this.nextPage = response.data.posts.current_page + 1
        } else {
          this.moreExist = false
        }

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message
        toaster.show(this.message)
      })
    },
    async loadMore() {
      await PostService.loadMorePosts(this.nextPage).then((response) => {
        this.currentPage = response.data.posts.current_page
        if (this.currentPage < response.data.posts.last_page) {
          this.moreExist = true
          this.nextPage = response.data.posts.current_page + 1
        } else {
          this.moreExist = false
        }

        response.data.posts.data.forEach(data => {
          this.posts.push(data)
        });

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message
        toaster.show(this.message)
      })
    },
  },
  mounted() {
    this.loadAllPost();
  },
}
</script>
