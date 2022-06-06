<template>
<div class="wrapper">
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="/admin/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
  </div>

  <NavBar />
  <SideBar />
  <router-view></router-view>
  <AppFooter />

  <aside class="control-sidebar control-sidebar-dark">
  </aside>
</div>
</template>

<script>
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'dashboard-main',
  components: {
    NavBar,
    SideBar,
    AppFooter
  }
}
</script>
