<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Friends</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-stretch flex-column" v-for="friend in friends" :key="friend.id">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0 text-center">
                  <h2 class="lead"><b><h4>{{ friend.name }}</h4></b></h2>
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-12 text-center">
                      <img v-if="friend.profile_image" :src="friend.profile_image" :alt="friend.name" class="img-circle img-fluid" height="128" width="128" />
                      <img v-else :src="defaultImage" alt="no-image-available" class="img-circle img-fluid" height="128" width="128" />
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button class="btn btn-sm btn-primary" @click="addFriend(friend.id)">
                      <i class="fas fa-user"></i> Add Friend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="text-center" v-show="moreExist">
            <button
                type="button"
                v-show="moreExist"
                class="btn btn-primary btn-sm col-3"
                @click="loadMore()">Load More
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import FriendService from '@/services/friend.service'
import image from '@/assets/no-image-available.jpg'
export default {
  name: 'FindFriends',
  data() {
    return {
      isSuccessfulRequest: false,
      moreExist: false,
      nextPage: 0,
      defaultImage: image,
      friends: [],
      user_id: localStorage.id,
    }
  },
  methods: {
    async addFriend(friend_id){
      const data = { user_id: localStorage.id, friend_id: friend_id };
      await FriendService.create(data).then((response) => {
        this.friends = response.data.users
      }).catch((error) => {
        console.log(error.response.data);
      })
    },

    async loadFindFriends() {
      await FriendService.findFriends().then((response) => {
        this.friends = response.data.users.data
        if(response.data.users.current_page < response.data.users.last_page) {
          this.moreExist = true
          this.nextPage = response.data.users.current_page + 1
        }else{
          this.moreExist = false
        }

      }).catch((error) => {
        console.log(error.response.data.users);
      })
    },

    async loadMore() {
      await FriendService.loadMoreFindFriends(this.nextPage).then((response) => {
        if(response.data.users.current_page < response.data.users.last_page) {
          this.moreExist = true
          this.nextPage = response.data.users.current_page + 1
        }else{
          this.moreExist = false
        }

        response.data.users.data.forEach(data => {
          this.friends.push(data)
        });

      }).catch((error) => {
        console.log(error);
      })
    },
  },
  mounted() {
    this.loadFindFriends()
  }
};
</script>