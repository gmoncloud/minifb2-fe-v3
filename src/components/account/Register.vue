<template>
  <div class="register-page">
    <div class="register-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <span class="h1"><b>FB</b>Mini</span>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Register a new membership</p>

          <form @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <input type="text" v-model="form.name" name="name" class="form-control" placeholder="Full name">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>

            <div class="alert alert-danger" role="alert" v-if="errors && errors.name">
              {{ errors.name[0] }}
            </div>

            <div class="input-group mb-3">
              <input type="email" v-model="form.email" name="email" class="form-control" placeholder="Email">
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
              <input type="password" v-model="form.password" name="password" class="form-control"
                     placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
              {{ errors.password[0] }}
            </div>

            <div class="input-group mb-3">
              <input type="password" v-model="form.password_confirmation" name="password_confirmation"
                     class="form-control" placeholder="Retype password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    @click="backToLogin"
                > Back to login
                </button>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-primary btn-block">Register</button>
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
  name: 'RegistrationComponent',
  data() {
    return {
      errors: {},
      isSuccessfulRequest: false,
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    async onSubmit() {
      await UserService.register(this.form).then((res) => {

        if (typeof res.data.user === 'undefined') {
          this.$router.push({name: 'Login'})
          return
        }

        this.isSuccessfulRequest = true;
        this.message = 'Account successfully created';
        this.$router.push({name: 'Login'})

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        this.isSuccessfulRequest = false;

        if (error.response.status == 422) {
          this.errors = error.response.data.errors;
        }

        toaster.show(this.message);
      })
    },
    backToLogin() {
      this.$router.push({name: 'Login'});
    },
  },
};
</script>