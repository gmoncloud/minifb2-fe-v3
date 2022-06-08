<template>
  <div class="wrapper">
    <NavBar/>
    <SideBar/>
    <router-view></router-view>
    <AppFooter/>

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
