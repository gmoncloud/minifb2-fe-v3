<template>
  <button
      type="button"
      class="btn btn-primary btn-sm col-3"
      @click="loadMore()">Load More
  </button>
</template>

<script>
import PostService from '@/services/post.service'
export default {
  name: 'LoadMore',
  data() {
    return {
      posts: [],
      moreExist: false,
      nextPage: 0,
    }
  },
  methods: {
    async loadMore() {
      await PostService.loadMoreUserPosts(this.nextPage).then((response) => {
        if(response.data.posts.current_page < response.data.posts.last_page) {
          this.moreExist = true
          this.nextPage = response.data.posts.current_page + 1
        }else{
          this.moreExist = false
        }

        response.data.posts.data.forEach(data => {
          this.posts.push(data);
        });

        this.$emit('pushPost', this.posts);

      }).catch((error) => {
        console.log(error);
      })
    },
  }
}
</script>