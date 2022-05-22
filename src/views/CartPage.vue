<template>
  <ion-page >
   <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/buy-home"></ion-back-button>
      </ion-buttons>
       <ion-title>Корзина</ion-title>


    </ion-toolbar>
  </ion-header>


    <ion-content :fullscreen="true">
    <ion-grid>
      <ion-row>
        <ion-col>
          <div class="icis-h4 page-header">
            {{list.length}} товар на {{summ}} ₽
          </div>
          <!-- <div class="deliverer-name ">
            2 берега
          </div> -->
        </ion-col>
      </ion-row>

      <ion-row >
        <ion-col size="6" v-for="item in list" :key="item">
          <ProductComponent  :product="item.idProduct" ></ProductComponent>

        </ion-col>
      </ion-row>

    </ion-grid>


  
    </ion-content>
        <ion-footer>
        <ion-toolbar>
          <div class="btn-wrapper">
            <ion-textarea v-if="!isSeller" placeholder="Комментарий к заказу">
            </ion-textarea>
            <ion-button v-if="isSeller"  @click="onActionClick" class="buy-btn-card" block>
               Списать по QR

            </ion-button>

            <ion-button v-else @click="onActionClick" class="buy-btn-card" block>
               Купить
              
            </ion-button>

          </div>
            
         
        
    
      
        </ion-toolbar>
      </ion-footer>
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

<script >
import ProductComponent from "@/components/ProductComponent.vue";
import { USER_ROLES } from "@/const";
import { loadingController, toastController } from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
import QrScaner from "@/components/QrScaner.vue";
import { computed, defineComponent, ref } from "vue";
import axios from "axios";
import { ORDER_STATUS } from "@/const";
export default defineComponent({
  components: {
    QrScaner,
    ProductComponent,
  },
  setup() {
    const authStore = useAuthStore();
    const isQrScanOpen = ref(false);

    const isSeller = computed(() => {
      if (!authStore.user) return false;
      return authStore.user.role === USER_ROLES.SELLER;
    });

    return {
      isSeller,

      isQrScanOpen,
    };
  },

  data() {
    return {
      isLoading: false,
      list: [],
      startProccesAFterQr: false,
    };
  },
  computed: {
    summ() {
      let res = 0;
      this.list.forEach((cartItem) => {
        res += cartItem.count * cartItem.idProduct.price;
      });
      return res;
    },
  },
  created() {
    this.fetchItems();
  },

  methods: {
    async fetchItems() {
      this.isLoading = true;
      const authStore = useAuthStore();
      try {
        const res = await axios.get(
          "https://serene-spire-16208.herokuapp.com/api/cartitems",
          {
            params: {
              userId: authStore.user.id,
            },
          }
        );
        authStore.cart = res.data.list;
        this.list = res.data.list;
      } catch (error) {
        const toast = await toastController.create({
          message: "ОШИБКА",
          duration: 1000,
        });
        return toast.present();
      } finally {
        this.isLoading = false;
      }
    },
    async onQrFinded(code) {
      if (this.startProccesAFterQr) return;
      this.startProccesAFterQr = true;
      this.isQrScanOpen = false;
      const loading = await loadingController.create();
      await loading.present();

      try {
        const authStore = useAuthStore();

        const transaction = await axios.post(
          "https:/serene-spire-16208.herokuapp.com/api/create/transaction",
          {
            idUserTo: code,
            idUserFrom: authStore.user.id,
            value: 0,
          }
        );

        const order = await axios.post(
          "https:/serene-spire-16208.herokuapp.com/api/create/order",
          {
            idTransaction: transaction.data.id,
            status: ORDER_STATUS.COMPLETE,
            comment: "",
            cancelComment: "",
            paymentId: "",
          }
        );
        this.fetchItems();
      } catch (error) {
        const toast = await toastController.create({
          message: "Ошибка",
          duration: 1000,
        });

        toast.present();
      } finally {
        loading.dismiss();
        this.startProccesAFterQr = false;
      }
    },
    async onActionClick() {
      const authStore = useAuthStore();
      if (this.isSeller) {
        this.isQrScanOpen = true;
        return;
      }
      const firstProduct = this.list[0].idProduct.id;
      const { data } = await axios.get(
        "https:/serene-spire-16208.herokuapp.com/api/userproducts2"
      );
      const { idUser } = data.list.find(
        (el) => el.idProduct.id == firstProduct
      );

      const transaction = await axios.post(
        "https:/serene-spire-16208.herokuapp.com/api/create/transaction",
        {
          idUserTo: authStore.user.id,
          idUserFrom: idUser.id,
          // idProduct: "",
          value: 0,
        }
      );
      console.log({
        idTransaction: transaction.data.id,
        status: ORDER_STATUS.PENDING,
        comment: "",
        cancelComment: "",
        paymentId: "",
      });

      const order = await axios.post(
        "https:/serene-spire-16208.herokuapp.com/api/create/order",
        {
          idTransaction: transaction.data.id,
          status: ORDER_STATUS.PENDING,
          comment: "",
          cancelComment: "",
          paymentId: "",
        }
      );
      this.fetchItems();
    },
  },
});
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 15px;
}
.deliverer-name {
  color: var(--ion-color-medium-shade);
}

.buttons-wrapper {
  width: 100%;
  padding: 5px 10px;
}
.buy-btn-card {
  width: 100% !important;
  display: flex;
  // margin: 0px 20px;
}
.btn-wrapper {
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
}
</style>
