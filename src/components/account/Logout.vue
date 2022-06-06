<template>
  <button
      type="button"
      class="btn btn-sm dropdown-item"
      @click="doLogout()"
  >
    <i class="fas fa-sign-out-alt"></i> Logout
  </button>
</template>

<script>
export default {
  name: 'LogoutComponent',
  methods: {
    doLogout() {
      localStorage.clear()
      sessionStorage.clear();
      this.$router.push({name: 'Login'});
    }
  }
}
</script>