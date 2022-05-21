<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button v-for="tab in menu" :key="tab.href" :tab="tab.tab" :href="tab.href">
          <ion-icon :icon="tab.icon" />
          <ion-label>{{tab.text}}</ion-label>
        </ion-tab-button>
          
        <!-- <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="ellipse" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button> -->
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>

      
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import {
  ellipse,
  square,
  triangle,
  homeSharp,
  listSharp,
  bookSharp,
  cartSharp,
  person,
} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",

  setup() {
    const menu = ref([
      {
        href: "/tabs/buy-home",
        tab: "buy-home",
        text: "Главная",
        icon: homeSharp,
      },
      {
        href: "/tabs/sell-list",
        tab: "sell-list",
        text: "Магазины",
        icon: listSharp,
      },
      // {
      //   href: "/tabs/orders",
      //   text: "Заказы",
      //   icon: bookSharp,
      //  tab: "orders",
      // },
      {
        href: "/cart",
        text: "Корзина",
        icon: cartSharp,
        tab: "cart",
      },
      // {
      //   href: "/tabs/orders",
      //   text: "Личное",
      // tab: "orders",
      //   icon: person,
      // },
    ]);

    return {
      menu,
      // ellipse,
      // square,
      // triangle,
      // menu
    };
  },
});
</script>
