<template>
  <ion-page>
       <ion-fab class="qr-code-fab" horizontal="end" vertical="bottom" slot="fixed">
      
         <template v-if="authStore.user && $route.name!=='chat'">
         
            <ion-fab-button v-if="authStore.user.role === USER_ROLES.BUYER"  id="trigger-button-qr" @click="createQr" >
              
              <ion-icon :icon="qrCode"></ion-icon>
            </ion-fab-button>


         </template>

        </ion-fab>

    <ion-header>
      <!-- <ion-toolbar>
          <ion-grid>
            <ion-row>
              <ion-col class="top-row">
              <ion-button class="btn-qr-code">
              </ion-button>

        

              </ion-col>
            </ion-row>
        </ion-grid>


        </ion-toolbar> -->

    </ion-header>
    <ion-tabs>
      <ion-router-outlet :key="$route.path"></ion-router-outlet>
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
    <!-- Sheet Modal -->
      <ion-modal 
        @ionModalDidDismiss="isQrShopOpen = false"
        :isOpen="isQrShopOpen"

        trigger="trigger-button-qr"
        :breakpoints="[0.5]"
        :initialBreakpoint="0.5"
      >
        <div class="qr-wraper">
   
          <canvas class="qr-canvas" id="canvas"></canvas>

        </div>


      </ion-modal>


      
      
  </ion-page>

      
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { USER_ROLES } from "@/const";
import { toastController } from "@ionic/vue";
import {
  defineComponent,
  ref,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  computed,
} from "vue";
import {
  ellipse,
  square,
  triangle,
  homeSharp,
  listSharp,
  bookSharp,
  cartSharp,
  person,
  qrCode,
  qrCodeOutline,
  qrCodeSharp,
} from "ionicons/icons";

// index.js -> bundle.js
import QRCode from "qrcode";

export default defineComponent({
  name: "TabsPage",

  setup() {
    const authStore = useAuthStore();
    const isQrShopOpen = ref(false);

    const createQr = async () => {
      isQrShopOpen.value = true;
      // console.log("🚀 ~ file: TabsPage.vue ~ line 140 ~ createQr ~ createQr");
      // const modal = await modalController.create({
      //   component: "qr-scaner",
      //   // cssClass: "my-custom-class",
      //   componentProps: {
      //     title: "New Title",
      //   },
      // });
      // return modal.present();

      setTimeout(() => {
        var canvas = document.getElementById("canvas");
        QRCode.toCanvas(
          canvas,
          String(authStore.user.id),
          {
            width: 350,
          },
          function (error) {
            if (error) console.error(error);
            console.log("success!");
          }
        );
      }, 1000);
    };

    const menu = computed(() => {
      if (!authStore.user) {
        return [];
      }
      if (authStore.user.role === USER_ROLES.SELLER) {
        return [
          {
            href: "/tabs/sell-home",
            tab: "buy-home",
            text: "Магазин",
            icon: homeSharp,
          },
          {
            href: "/tabs/account",
            text: "Личное",
            tab: "account",
            icon: person,
          },
          {
            href: "/cart",
            text: "Заказ",
            icon: cartSharp,
            tab: "cart",
          },
        ];
      }
      return [
        {
          href: "/tabs/buy-home",
          tab: "buy-home",
          text: "Главная",
          icon: homeSharp,
        },
        // {
        //   href: "/tabs/sell-list",
        //   tab: "sell-list",
        //   text: "Магазины",
        //   icon: listSharp,
        // },
        {
          href: "/tabs/orders",
          text: "Заказы",
          icon: bookSharp,
          tab: "orders",
        },
        {
          href: "/cart",
          text: "Корзина",
          icon: cartSharp,
          tab: "cart",
        },
        {
          href: "/tabs/chat",
          text: "Чат",
          tab: "chat",
          icon: person,
        },
        {
          href: "/tabs/account",
          text: "Личное",
          tab: "account",
          icon: person,
        },
      ];
    });

    return {
      menu,
      qrCode,
      qrCodeOutline,
      qrCodeSharp,
      createQr,
      authStore,
      USER_ROLES,
      isQrShopOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-row {
  display: flex;
  justify-content: center;
}
.btn-qr-code {
  width: 60%;
}
:host(.fab-vertical-bottom) {
  bottom: 70px !important;
}
.qr-code-fab {
  bottom: 120px;
}
.qr-canvas {
  margin: 0 auto !important;
  // width: 60% !important;
  // height: auto !important;
}
.qr-wraper {
  display: flex;
  justify-content: center;
}
</style>
