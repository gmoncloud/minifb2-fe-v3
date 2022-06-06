<template>
  <div>
    <PostInput
        v-if="withInput"
    />

    <div class="post-holder" v-for="post in postData" :key="post.id">
      <div class="card card-widget">
        <div class="card-header">
          <div class="user-block">
            <img class="img-circle" src="/admin/dist/img/user1-128x128.jpg" alt="User Image">
            <span class="username"><a href="#">{{post.user.name}}</a></span>
            <span class="description">Shared publicly - 7:30 PM Today</span>
          </div>

          <div class="card-tools">
            <button v-if="withInput" type="button" class="btn btn-tool">
              <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link text-secondary" data-toggle="dropdown" href="#">
                  <i class="fas fa-ellipsis-h"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                  <button
                      type="button"
                      class="btn btn-sm"
                      @click="editPost(post.id)"
                      data-toggle="modal"
                      data-target="#postModal"
                  > <i class="fas fa-edit"></i> Edit Post</button>
                  <div class="dropdown-divider"></div>
                  <button
                      type="button"
                      class="btn btn-sm"
                      @click="deletePost(post.id)"
                  >
                    <i class="fas fa-trash-alt"></i> Delete Post
                  </button>
                </div>
              </li>
            </ul>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="collapse">
              <i class="fas fa-minus"></i>
            </button>
          </div>

        </div>

        <div class="card-body">
          <p>{{ post.written_text }}</p>
          <div class="attachment-block clearfix">
            <img v-if="post.post_image" :src="post.post_image" alt="post-image" height="150" width="150" />
            <img v-else :src="defaultImage" alt="no-image-available" height="150" width="150" />
          </div>

          <LikeInput
              :post-id="post.id"
          />

          <span class="float-right text-muted">{{ post.likes_count }} likes - {{ post.comments_count }} comments</span>
        </div>

        <div class="card-footer card-comments">
          <div class="card-comment" v-for="comment in post.comments" :key="comment.id">
            <img class="img-circle img-sm" src="/admin/dist/img/user3-128x128.jpg" alt="User Image">

            <div class="comment-text">
              <span class="username">
                {{ comment.username }}
                <span class="text-muted float-right">8:03 PM Today</span>
              </span>
              {{ comment.comment_text }}
            </div>
          </div>
        </div>

        <CommentInput
            :post-id="post.id"
        />

        <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <form @submit.prevent="updatePostForm" enctype="multipart/form-data">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="postModalLabel">Edit Post</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <main class="form-post">
                      <div class="card mb-3">
                        <input type="file" class="form-control" v-on:change="onChange">
                        <div class="card-body">
                          <div class="float-holder clearfix">
                            <div class="form-group col-12 float-right">
                              <textarea v-model="postDetail.written_text" name="written_text" class="comment float-start form-control" placeholder="Whats on your mind"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" @click="updatePost(postDetail.id)">Save changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
    <div class="text-center" v-show="moreExist">
      <button
          type="button"
          v-show="moreExist"
          class="btn btn-primary btn-sm col-3"
          @click="loadMore()">Load More
      </button>
    </div>
  </div>
</template>

<script>
  import PostInput from "@/components/posts/PostInput";
  import PostService from '@/services/post.service'
  import image from '@/assets/no-image-available.jpg'
  import CommentInput from '@/components/comments/CommentInput'
  import LikeInput from "@/components/like/LikeInput";
  export default {
    name: 'post-component',
    props: {
      withInput: Boolean,
      postData: Array,
      moreExist: Boolean,
    },
    data() {
      return {
        nextPage: 0,
        defaultImage: image,
        avatar: '',
        posts: [],
        comments: [],
        postDetail: {
          id: '',
          user_id: '',
          written_text: '',
          post_image: ''
        },
        comment: {
          post_id: '',
          comment_text: ''
        }
      }
    },
    components: {
      LikeInput,
      CommentInput,
      PostInput,
    },
    methods: {
      onChange(e) {
        this.file = e.target.files[0];
        console.log(this.file)
      },

      async loadMore() {
        this.$emit('loadMore');
      },

      // async loadMore() {
      //   await PostService.loadMoreUserPosts(this.nextPage).then((response) => {
      //     if(response.data.posts.current_page < response.data.posts.last_page) {
      //       this.moreExist = true
      //       this.nextPage = response.data.posts.current_page + 1
      //     }else{
      //       this.moreExist = false
      //     }
      //
      //     response.data.posts.data.forEach(data => {
      //       this.posts.push(data)
      //     });
      //
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // },

      async editPost(post_id) {
        await PostService.getPostById(post_id).then((response) => {
          this.postDetail = response.data.post
          console.log(response.data.post)
        }).catch((error) => {
          console.log(error)
        })
      },

      async updatePost(post_id) {
        let data = new FormData()
        data.append('user_id', localStorage.id)
        data.append('written_text', this.postDetail.written_text)
        data.append('post_image', this.file)
        data.append('_method', 'PUT')

        await PostService.update(post_id, data).then((response) => {
          if(response.data.post){
            console.log(response)
          }
        }).catch((error) => {
          console.log(error)
        })
      },

      async deletePost(post_id) {
        await PostService.delete(post_id).then((response) => {
          console.log("data", response)
        }).catch((error) => {
          console.log(error)
        })
      },

      // async loadPosts() {
      //   await PostService.getAllUserPosts().then((response) => {
      //     this.posts = response.data.posts.data
      //     this.comments = response.data.posts.comments
      //
      //     if(response.data.posts.current_page < response.data.posts.last_page) {
      //       this.moreExist = true
      //       this.nextPage = response.data.posts.current_page + 1
      //     }else{
      //       this.moreExist = false
      //     }
      //
      //     console.log("res", response)
      //
      //   }).catch((error) => {
      //     console.log(error.response.data.posts)
      //   })
      // },

      // async loadAllPost() {
      //   await PostService.getAllPosts().then((response) => {
      //     this.posts = response.data.posts.data
      //     this.comments = response.data.posts.comments
      //
      //     if(response.data.posts.current_page < response.data.posts.last_page) {
      //       this.moreExist = true
      //       this.nextPage = response.data.posts.current_page + 1
      //     }else{
      //       this.moreExist = false
      //     }
      //
      //   }).catch((error) => {
      //     console.log(error.response.data.posts)
      //   })
      // },

    },
  }
</script>
