
import ComputedPComponent from "@/components/ComputedPComponent.vue";
import ReadmeComponent from "@/views/ReadmeComponent.vue";
import { createRouter, createWebHashHistory } from "vue-router";

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
  }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;
