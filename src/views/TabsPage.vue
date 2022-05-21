<template>
  <ion-page>
       <ion-fab class="qr-code-fab" horizontal="end" vertical="bottom" slot="fixed">
      
         <template v-if="authStore.user">
         
            <ion-fab-button v-if="authStore.user.role === USER_ROLES.BUYER"  id="trigger-button-qr" @click="createQr" >
              
              <ion-icon :icon="qrCode"></ion-icon>
            </ion-fab-button>

            <ion-fab-button  @click="scanQr" v-else-if="authStore.user.role === USER_ROLES.SELLER || authStore.user.role === USER_ROLES.OPERATION_ADMIN"  id="trigger-button-qr-scan" >
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

       <ion-modal 
        @ionModalDidDismiss="isQrScanOpen = false"
       :isOpen="isQrScanOpen"
        trigger="trigger-button-qr-scan"
        :breakpoints="[0.4]"
        :initialBreakpoint="0.4"
      >
   
        <QrScaner @qr-finded="onQrFinded"></QrScaner>
 


      </ion-modal>
      
      
  </ion-page>

      
</template>

<script lang="ts">
import { modalController } from "@ionic/vue";

import { useAuthStore } from "@/stores/auth";
import { USER_ROLES } from "@/const";
import { toastController } from "@ionic/vue";
import {
  defineComponent,
  ref,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
} from "vue";
import QrScaner from "@/components/QrScaner.vue";
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
  components: {
    QrScaner,
  },

  setup() {
    const authStore = useAuthStore();
    const isQrShopOpen = ref(false);
    const isQrScanOpen = ref(false);

    const scanQr = () => {
      isQrScanOpen.value = true;
    };
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
          authStore.user.id,
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

    const onQrFinded = async (code) => {
      isQrScanOpen.value = false;
      const toast = await toastController.create({
        message: code,
        duration: 1000,
      });
      return toast.present();
    };
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
      {
        href: "/tabs/account",
        text: "Личное",
        tab: "account",
        icon: person,
      },
    ]);

    return {
      menu,
      onQrFinded,
      qrCode,
      qrCodeOutline,
      qrCodeSharp,
      createQr,
      authStore,
      USER_ROLES,
      isQrShopOpen,
      isQrScanOpen,
      scanQr,
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
  bottom: 70px;
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
