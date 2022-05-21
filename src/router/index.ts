import { createRouter, createWebHistory } from "@ionic/vue-router";
import { card } from "ionicons/icons";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/buy-home",
  },

  {
    name: "cart",
    path: "/cart",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },

  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/buy-home",
        name: "",
      },
      {
        path: "/tabs/search",
        name: "search",
        component: () => import("@/views/Search.vue"),
      },

      {
        path: "buy-home",
        component: () => import("@/views/BuyHome.vue"),
      },

      {
        path: "sell-list",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "account",
        component: () => import("@/views/AccountPage.vue"),
      },
      // {
      //   path: "orders",
      //   component: () => import("@/views/Tab3Page.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
