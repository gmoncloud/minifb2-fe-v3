<template>
  <div class="login-page">
    <div class="login-box custom-login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="../../index2.html" class="h1"><b>FB</b>Mini</a>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <input type="email" v-model="email" name="email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>

            <div class="alert alert-danger" role="alert" v-if="errors && errors.email">
              {{ errors.email[0] }}
            </div>

            <div class="input-group mb-3">
              <input type="password" v-model="password" name="password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
              {{ errors.password[0] }}
            </div>

            <div class="row">
              <div class="col-6">
                <button type="submit" class="btn btn-primary btn-block" @click="doLogin">Sign In</button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-primary btn-block" @click="doCreateAccount">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service'
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'login-component',
  components: {},
  data() {
    return {
      isSuccessfulRequest: false,
      errors: {},
      errorMessage: '',
      email: '',
      password: '',
      error: null,
      success: false
    }
  },
  methods: {
    async onSubmit() {
      const data = {email: this.email, password: this.password}
      await UserService.login(data).then((res) => {

        if (res.data.error_message) {
          this.errorMessage = res.data.error_message
          return
        }

        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("access_token", res.data.access_token);
        this.$router.push({name: 'Dashboard', params: {id: res.data.user.id}}).go()
        this.isSuccessfulRequest = true;

      }).catch((error) => {
        if (error.response.status == 422) {
          this.errors = error.response.data.errors
        }

        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        this.isSuccessfulRequest = false;
        toaster.show(this.message);
      })
    },

    doCreateAccount() {
      this.$router.push({name: 'Register'});
    }
  },
}
</script>