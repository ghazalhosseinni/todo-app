import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/main",
      name: "صفحه اصلی",
      component: () => import("@/views/Main.vue"),
    },
    {
      path: "/todo",
      name: "/ToDoApp",
      component: () => import("@/views/ToDoApp.vue"),
    },
    {
      path: "/",
      redirect: "/todo",
    },
  ],
});
