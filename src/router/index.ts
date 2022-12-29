import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
        behavior: "smooth",
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "introduction",
      component: () => import("../views/IntroductionView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/web",
      name: "web",
      component: () => import("../views/WebProjectView.vue"),
    },
    {
      path: "/tablature",
      name: "tablature",
      component: () => import("../views/TablatureView.vue"),
    },
  ],
});

export default router;
