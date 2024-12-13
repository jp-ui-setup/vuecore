
import ComputedPComponent from "@/components/ComputedPComponent.vue";
import BoxShadow from "@/views/BoxShadow.vue";
import NotFound from "@/views/NotFound.vue";
import ReadmeComponent from "@/views/ReadmeComponent.vue";
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: ReadmeComponent
    },
    {
      path: "/vue",
      name: "VueParent",
      component: ComputedPComponent
    },
    {
      path: "/box-shadow",
      name: "BoxShadow",
      component: BoxShadow
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
  export const isLoading = ref(false);

  router.beforeEach((to, from, next) => {

      isLoading.value = true;
      next();



  });

  router.afterEach(() => {
    setTimeout(()=>{ isLoading.value = false;    }, 1000)
  });
  export default router;


// import Vue from "vue";
// import Router from "vue-router";

// const routerOptions = [
//   { path: "/", component: "Landing" },
//   { path: "/signin", component: "SignIn" },
//   { path: "/signup", component: "SignUp" },
//   { path: "/home", component: "Home", meta: { requiresAuth: true } },
//   { path: "*", component: "NotFound" }
// ];

// const routes = routerOptions.map(route => {
//   return {
//     ...route,
//     component: () => import(`../components/${route.component}.vue`)
//   };
// });

// Vue.use(Router);

// export default new Router({
//   mode: "history",
//   routes
// });
