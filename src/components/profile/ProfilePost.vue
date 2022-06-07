<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <Profile/>
          </div>
          <div class="col-md-9">
            <Post
                :postData="posts"
                :with-input="true"
                :more-exist="moreExist"
                @loadMore="loadMore"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileService from '@/services/profile.service'
import Profile from '@/components/profile/Profile.vue'
import Post from '@/components/posts/Post.vue'
import PostService from "@/services/post.service"
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'profile-post',
  components: {
    Profile,
    Post
  },
  data() {
    return {
      moreExist: false,
      avatar: '',
      posts: [],
      currentPage: '',
      isLoggedIn: false,
      username: '',
      errors: {},
      errorMessage: '',
      file: '',
      user_id: localStorage.id,
      profile: {
        display_name: '',
        profile_image: '',
        education: '',
        current_city: '',
        hometown: '',
        work: '',
        _method: 'PUT'
      }
    }
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
    },
    async updateProfile() {
      const userID = this.user_id
      this.success = false;

      let data = new FormData()
      data.append('display_name', this.profile.display_name)
      data.append('profile_image', this.file)
      data.append('education', this.profile.education)
      data.append('current_city', this.profile.current_city)
      data.append('hometown', this.profile.hometown)
      data.append('work', this.profile.work)
      data.append('_method', 'PUT')

      await ProfileService.update(userID, data).then((response) => {
        this.profile = response.data.profile
        this.success = true;
      }).catch((error) => {
        if (error.response.status == 422) {
          this.errors = error.response.data.errors;
        }
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })

    },
    async loadProfile() {
      await ProfileService.getAll().then((response) => {
        this.profile = response.data.profile
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },
    getAvatar() {
      this.avatar = 'https://ui-avatars.com/api/?name=' + this.username + '&background=random&size=128&font-size=0.5&bold=true'
    },
    checkIsLoggedIn() {
      this.isLoggedIn = localStorage.id ? true : false
    },
    getUsername() {
      this.username = localStorage.username
    },
    async loadUserPosts() {
      await PostService.getAllUserPosts().then((response) => {
        this.posts = response.data.posts.data
        this.comments = response.data.posts.comments
        this.currentPage = response.data.posts.current_page

        if (this.currentPage < response.data.posts.last_page) {
          this.moreExist = true
          this.nextPage = response.data.posts.current_page + 1
        } else {
          this.moreExist = false
        }

      }).catch((error) => {
        this.message = (error.response && error.response.data.posts && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },
    async loadMore() {
      await PostService.loadMoreUserPosts(this.nextPage).then((response) => {
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
        this.message = (error.response && error.response.data.posts && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },
  },
  mounted() {
    this.loadProfile()
    this.loadUserPosts()
    this.checkIsLoggedIn()
    this.getUsername()
    this.getAvatar()
  }
}
</script>