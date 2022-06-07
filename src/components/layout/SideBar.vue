<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link to="/" class="brand-link" exact-active-class="exact-active">
      <img src="/admin/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">FB Mini</span>
    </router-link>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
              v-if="profileImage"
              :src="profileImage"
              alt="user-image"
              class="img-circle elevation-2"
              height="50"
              width="50"
          />
          <img v-else
               :src="avatar"
               class="img-circle elevation-2"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ displayName }}</a>
        </div>
      </div>

      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <router-link
                :to="{name: 'Friends'}"
                class="nav-link"
                exact-active-class="exact-active">
              <i class="nav-icon far fa-image"></i>
              <p>Friends</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                :to="{name: 'FindFriends'}"
                class="nav-link">
              <i class="nav-icon far fa-image"></i>
              <p>Find Friends</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                :to="{name: 'PostsComponent'}"
                class="nav-link">
              <i class="nav-icon far fa-image"></i>
              <p>Posts</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import UserService from '@/services/user.service'
import ProfileService from "@/services/profile.service"
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'side-bar',
  components: {},
  data() {
    return {
      profileImage: '',
      displayName: '',
      avatar: '',
    }
  },
  methods: {
    getDisplayName() {
      ProfileService.getAll().then((response) => {
        this.profileImage = response.data.profile.profile_image;
        this.displayName = response.data.profile.display_name;

        if (!response.data.profile.display_name) {
          this.displayName = localStorage.username;
        }

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message
        toaster.show(this.message)
      });
    },
  },
  mounted() {
    this.avatar = UserService.getAvatar();
    this.getDisplayName();
  }
}
</script>