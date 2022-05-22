import { createRouter, createWebHistory } from "@ionic/vue-router";
import { card } from "ionicons/icons";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import categProducts from "../views/sell/categProducts.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/buy-home",
  },
  {
    path: "/sell-cater-products/:id",
    component: categProducts,
  },
  {
    path: "/add-product",
    component: () => import("@/views/sell/addProduct.vue"),
  },
  {
    path: "/add-user",
    component: () => import("@/views/sell/addProduct.vue"),
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
        name: "buy-home",
        path: "buy-home",
        component: () => import("@/views/BuyHome.vue"),
      },

      {
        path: "sell-home",
        component: () => import("@/views/sell/HomePage.vue"),
      },
      {
        path: "account",
        component: () => import("@/views/AccountPage.vue"),
      },
      {
        name: "cart",
        path: "/cart",
        component: () => import("@/views/CartPage.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/OrdersPage.vue"),
      },
      {
        name: "chat",
        path: "chat",
        component: () => import("@/views/ChatRoom.vue"),
      },
      {
        name: "aads",
        path: "aads",
        component: () => import("@/views/manager/AadsPage.vue"),
      },
      {
        name: "user-managment",
        path: "manage-users",
        component: () => import("@/views/manager/UserManag.vue"),
      },

      {
        name: "add-balance",
        path: "add-balance",
        component: () => import("@/views/operator/AddBalance.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
