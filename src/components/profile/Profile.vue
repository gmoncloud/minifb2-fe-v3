<template>
  <div class="card card-primary card-outline">
    <div class="card-body box-profile">
      <div class="text-center">
        <img
            v-if="profile.profile_image"
            :src="profile.profile_image"
            :alt="profile.display_name"
            height="150"
            width="150"
        />
        <img v-else
             :src="avatar"
             class="img-circle elevation-2"
        />
      </div>

      <h3 class="profile-username text-center">{{ displayName }}</h3>

      <template v-if="profile.work">
        <p class="text-muted text-center">{{ profile.work }}</p>
      </template>
    </div>
  </div>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="card-title">About Me</h3>
    </div>
    <div class="card-body">

      <template v-if="profile.education">
        <strong><i class="fas fa-book mr-1"></i> Education</strong>
        <p class="text-muted">{{ profile.education }}</p>
        <hr>
      </template>

      <template v-if="profile.current_city">
        <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>
        <p class="text-muted">{{ profile.current_city }}</p>
        <hr>
      </template>

      <template v-if="profile.hometown">
        <strong><i class="fas fa-map-marker-alt mr-1"></i> Hometown</strong>
        <p class="text-muted">{{ profile.hometown }}</p>
      </template>

      <div class="text-left">
        <hr>
        <button
            data-toggle="modal"
            data-target="#profileModal"
            class="btn btn-sm btn-primary">
          Update Profile
        </button>
      </div>
    </div>
  </div>

  <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="updateProfile" enctype="multipart/form-data">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postModalLabel">Edit Profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
              <main class="form-post">
                <div class="card mb-4">
                  <div class="card-body">

                    <div class="form-group">
                      <div>
                        <label for="exampleInputEmail1">Profile Image</label>
                      </div>
                      <img v-if="profile.profile_image" :src="profile.profile_image" :alt="profile.display_name" height="150" width="150" />
                      <img v-else :src="defaultImage" alt="no-image-available" height="150" width="150" />
                      <input type="file" class="form-control" @change="onChange">

                      <div class="alert alert-danger" role="alert" v-if="errors && errors.profile_image">
                        {{ errors.profile_image[0] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Display Name</label>
                      <input type="text" v-model="profile.display_name" class="form-control" id="display-name" placeholder="Display Name">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Education</label>
                      <input type="text" v-model="profile.education" class="form-control" id="education" placeholder="Education">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Current City</label>
                      <input type="text" v-model="profile.current_city" class="form-control" id="current-city" placeholder="Current City">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Hometown</label>
                      <input type="text" v-model="profile.hometown" class="form-control" id="hometown" placeholder="Hometown">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Work</label>
                      <input type="text" v-model="profile.work" class="form-control" id="work" placeholder="Work">
                    </div>
                  </div>
                </div>
              </main>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click="updatePost(postDetail.id)">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  import ProfileService from '@/services/profile.service'
  import UserService from '@/services/user.service'
  import image from '@/assets/no-image-available.jpg'
  export default {
    name: 'profile-component',
    data() {
      return {
        defaultImage: image,
        avatar: '',
        isLoggedIn: false,
        displayName: '',
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
        console.log(this.file)
      },
      async updateProfile() {
        const userID = this.user_id;
        this.success = false;

        let data = new FormData()
        data.append('display_name', this.profile.display_name);
        data.append('profile_image', this.file);
        data.append('education', this.profile.education);
        data.append('current_city', this.profile.current_city);
        data.append('hometown', this.profile.hometown);
        data.append('work', this.profile.work);
        data.append('_method', 'PUT');

        await ProfileService.update(userID, data).then((response) => {
          this.profile = response.data.profile;
          this.success = true;
        }).catch((err) => {
          if (err.response.status == 422) {
              this.errors = err.response.data.errors;
          }
          console.log(err.response.data);
        })

      },
      async loadProfile() {
        await ProfileService.getAll().then((response) => {
          this.profile = response.data.profile
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
      checkIsLoggedIn(){
        this.isLoggedIn =  localStorage.id ? true : false
      },
      getDisplayName() {
        ProfileService.getAll().then((response) => {
          this.displayName = response.data.profile.display_name;

          if(!response.data.profile.display_name){
            this.displayName = localStorage.username;
          }

        }).catch((error) => {
          console.log(error);
        });
      },
    },
    mounted() {
      this.getDisplayName();
      this.avatar = UserService.getAvatar();
      this.loadProfile();
      this.checkIsLoggedIn();
    }
  }
</script>