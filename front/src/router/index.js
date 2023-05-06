import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/HomePage.vue";
import Configura from "../views/ConfigPage.vue"

const routeInfos = [
    {path : "/", component: Home },
    {path : "/configura", component: Configura },
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;