<template>
  <ion-page>
         <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button :default-href="beackLink"></ion-back-button>
      </ion-buttons>
              <ion-title>Заказы</ion-title>




    </ion-toolbar>
  </ion-header>

    <ion-content  :fullscreen="true"  class="padding">
          <ion-grid>
              <ion-row v-for="item in items" :key="item.id">
                  <ion-col>
                         <ion-card>
                             <div class="order-wrapper">
                                 <h4 class="order-deliverer">
                                     <template v-if="authStore.user.role === USER_ROLES.SELLER">
                        {{item.transaction.user_to.name || item.transaction.user_to.login }}

                                     </template>
                                     <template v-else>
                        {{item.transaction.user_from.name || item.transaction.user_from.login }}

                                     </template>

                                 </h4>
                                 <div class="status-wrapper">
                                   <div class="status-name">
Статус 
                                   </div>
                                     
                                    <!-- 
PENDING: string;
    CANCEL: string;
    ACCEPTED: string;
    COMPLETE: string;

                                     -->
                                     <template v-if="item.status === ORDER_STATUS.PENDING">
 <ion-badge color="success" >Выполнен</ion-badge>

                                     </template>
                                      <template v-if="item.status === ORDER_STATUS.CANCEL">

                                     </template>
                                      <template v-if="item.status === ORDER_STATUS.ACCEPTED">
 <ion-badge color="secondary" >Принят в доставку</ion-badge>
                                     </template>
                                      <template v-if="item.status === ORDER_STATUS.COMPLETE">
 <ion-badge color="success" >Выполнен</ion-badge>
                                     </template>
                                      <!-- {{item.status }}                                                         -->
                                 </div>
                                   <div>
                                     Дата: {{item.date }}                                                         
                                 </div>
                                      <h5>
                                     Продукты                                                         
                                 </h5>
                                       <div class="order-product-row" v-for="prod in item.items" :key="prod.id">
                                           <div>
                                                {{prod.product.name}} 
                                           </div>
                                           <div>
                                                {{prod.count}} x     {{prod.product.price}}
                                           </div>
                                              
                                       </div>
                                       <template v-if="authStore.user.role === USER_ROLES.SELLER">
                                          <div class="btns-wrapper" v-if="item.status === ORDER_STATUS.PENDING">
                                            <ion-button  @click="acceptOrder(item)"  >
                                                Принять
                                            </ion-button>

                                            <ion-button @click="cacelOrder(prod)"  >
                                                Отказаться 
                                            </ion-button>
                                     </div>
                                      <ion-button v-if="item.status === ORDER_STATUS.ACCEPTED" @click="onFinishScan(item) "    >
                                                Завершить сканированием
                                            </ion-button>


                                       </template>
    
                                       

                                                                                              
                                 <!-- </div> -->

                             </div>
                          </ion-card>
                  </ion-col>
              </ion-row>
          </ion-grid>
       
                 <ion-modal 
        @ionModalDidDismiss="isQrScanOpen = false"
       :isOpen="isQrScanOpen"
        trigger="trigger-button-qr-scan"
        :breakpoints="[0.4]"
        :initialBreakpoint="0.4"
      >
   
        <QrScaner @qr-finded="onQrFinded"></QrScaner>
 


      </ion-modal>


       
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { defineComponent } from "vue";
import { ref } from "vue";
import { ORDER_STATUS, USER_ROLES } from "@/const";
import QrScaner from "@/components/QrScaner.vue";
import { toastController } from "@ionic/vue";

import { mapStores } from "pinia";
export default defineComponent({
  components: {
    QrScaner,
  },
  data() {
    return {
      items: [],
      USER_ROLES,
      ORDER_STATUS,
      isQrScanOpen: false,
      currntConfirmationOrder: null,
    };
  },
  async created() {
    this.loadItems();

    // this.currentCategName = res.data.list.filter(
    //   (el) => el.id == this.$route.params.id
    // ).name;
  },
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(useAuthStore),
    beackLink() {
      if (this.authStore.user.role === USER_ROLES.SELLER) {
        return "/tabs/sell-home";
      }
      return "/tabs/buy-home";
    },
  },
  methods: {
    onFinishScan(order) {
      this.currntConfirmationOrder = order;
      this.isQrScanOpen = true;
    },
    async onQrFinded(code) {
      this.isQrScanOpen = false;

      if (this.currntConfirmationOrder.transaction.user_to.id == code) {
        await axios.post(
          `https://serene-spire-16208.herokuapp.com/api/update/order`,
          {
            id: this.currntConfirmationOrder.id,
            status: ORDER_STATUS.COMPLETE,
            cancelComment: this.currntConfirmationOrder.cancel_comment, // "1",
            comment: this.currntConfirmationOrder.comment, //"1",
            paymentId: this.currntConfirmationOrder.payment_id, // "1",
            idTransaction: this.currntConfirmationOrder.transaction.id,
          }
        );
        this.loadItems();

        const toast = await toastController.create({
          message: "Успех",
          duration: 1000,
        });
        return toast.present();
      } else {
        const toast = await toastController.create({
          message: "Не тот человек",
          duration: 1000,
        });
        return toast.present();
      }
    },
    async loadItems() {
      const authStore = useAuthStore();

      const res = await axios.get(
        `https://frozen-gorge-59006.herokuapp.com/orders`
      );

      if (authStore.user.role === USER_ROLES.SELLER) {
        this.items = res.data.data
          .reverse()
          .filter((el) => el.transaction.user_from.id == authStore.user.id);
      } else if (authStore.user.role === USER_ROLES.BUYER) {
        this.items = res.data.data
          .reverse()
          .filter((el) => el.transaction.user_to.id == authStore.user.id);
      }
    },
    async acceptOrder(order) {
      await axios.post(
        `https://serene-spire-16208.herokuapp.com/api/update/order`,
        {
          id: order.id,
          status: ORDER_STATUS.ACCEPTED,
          cancelComment: order.cancel_comment, // "1",
          comment: order.comment, //"1",

          paymentId: order.payment_id, // "1",
          idTransaction: order.transaction.id,
        }
      );
      this.loadItems();
    },
    async cacelOrder(order) {
      await axios.post(
        `https://serene-spire-16208.herokuapp.com/api/update/order`,
        {
          id: order.id,
          status: ORDER_STATUS.CANCEL,
          cancelComment: order.cancel_comment, // "1",
          comment: order.comment, //"1",

          paymentId: order.payment_id, // "1",
          idTransaction: order.transaction.id,
        }
      );
      this.loadItems();
    },
  },
});
</script>

<style lang="scss" scoped>
.order-wrapper {
  font-size: 18px;
  padding: 15px;
  color: black;
}
.order-product-row {
  display: flex;
  justify-content: space-between;
}
.btns-wrapper {
  display: flex;
}
.status-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.status-name {
  margin-right: 8px;
}
</style>