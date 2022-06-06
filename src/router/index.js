import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: import("@/components/layout/Dashboard"),
    children: [
      {
        path: "/",
        name: "Profile",
        component: import("@/components/profile/ProfilePost.vue"),
      },
      {
        path: "/friends",
        name: "Friends",
        component: import("@/components/Friend/Friends.vue"),
      },
      {
        path: "/find-friends",
        name: "FindFriends",
        component: import("@/components/Friend/FindFriends.vue"),
      },
      {
        path: "/posts",
        name: "PostsComponent",
        component: import("@/components/posts/Posts.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: import("@/components/account/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: import("@/components/account/Register.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;