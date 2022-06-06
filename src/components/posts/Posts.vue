<template>
  <div class="content-wrapper">
    <Post
        :postData="posts"
        :with-input="false"
    />
  </div>
</template>

<script>
  import Post from '@/components/posts/Post.vue'
  import PostService from "@/services/post.service";
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

          if(response.data.posts.current_page < response.data.posts.last_page) {
            this.moreExist = true
            this.nextPage = response.data.posts.current_page + 1
          }else{
            this.moreExist = false
          }

        }).catch((error) => {
          console.log(error.response.data.posts);
        })
      },
    },
    mounted() {
      this.loadAllPost();
    },
  }
</script>
