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
                      <img src="/admin/dist/img/user1-128x128.jpg" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button class="btn btn-sm btn-primary" @click="unfriend(friend.id)">
                      <i class="fas fa-user"></i> Unfriend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <nav aria-label="Contacts Page Navigation">
            <ul class="pagination justify-content-center m-0">
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#">6</a></li>
              <li class="page-item"><a class="page-link" href="#">7</a></li>
              <li class="page-item"><a class="page-link" href="#">8</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import FriendService from '@/services/friend.service'
  export default {
    name: 'friends-component',
    components: {},
    data() {
        return {
          friends: [],
          user_id: localStorage.id,
          options: {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization' : 'Bearer ' + localStorage.access_token
          }
        }
      }
    },
    methods: {
      async unfriend(friend_id) {
        await FriendService.delete(friend_id).then((response) => {
          this.friends = response.data.friends.data;
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
      async loadFriends() {
        await FriendService.getAll().then((response) => {
          this.friends = response.data.friends.data
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
    },
    mounted() {
      this.loadFriends()
    }
  };
</script>

<style lang="scss" scoped>

</style>