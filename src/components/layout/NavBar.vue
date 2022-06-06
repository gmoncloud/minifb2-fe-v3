<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-chevron-circle-down"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
          <router-link :to="{name: 'Profile'}" class="dropdown-item">
            <i class="fas fa-user mr-2"></i> See your profile
          </router-link>
          <div class="dropdown-divider"></div>
          <Logout />
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import Logout from "@/components/account/Logout";
  export default {
    name: 'nav-bar',
    components: {
      Logout,
    },
  }
</script>
