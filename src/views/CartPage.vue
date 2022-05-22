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
            {{list.length}} товар на 457 Р.
          </div>
          <div class="deliverer-name ">
            2 берега
          </div>
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
               Подтвердить сделку по QR

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
import { toastController } from "@ionic/vue";
import ProductComponent from "@/components/ProductComponent.vue";
import { USER_ROLES } from "@/const";
import { useAuthStore } from "@/stores/auth";
import QrScaner from "@/components/QrScaner.vue";
import { computed, defineComponent, ref } from "vue";
import axios from "axios";

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

    const onQrFinded = async (code) => {
      isQrScanOpen.value = false;
      const toast = await toastController.create({
        message: code,
        duration: 1000,
      });
      return toast.present();
    };

    return {
      isSeller,

      onQrFinded,
      isQrScanOpen,
    };
  },

  data() {
    return {
      isLoading: false,
      list: [],
    };
  },

  async created() {
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
  methods: {
    async onActionClick() {
      const authStore = useAuthStore();
      if (this.isSeller) {
        this.isQrScanOpen = true;
        return;
      }
      const firstProduct = this.list[0].idProduct.id;
      console.log(
        "🚀 ~ file: CartPage.vue ~ line 160 ~ onActionClick ~ firstProduct",
        firstProduct
      );

      const { data } = await axios.get(
        "https:/serene-spire-16208.herokuapp.com/api/userproducts2"
      );
      console.log(data.list);
      const { idUser } = data.list.find(
        (el) => el.idProduct.id == firstProduct
      );
      console.log(
        "🚀 ~ file: CartPage.vue ~ line 165 ~ onActionClick ~ someItem",
        idUser
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

      const order = await axios.post(
        "https:/serene-spire-16208.herokuapp.com/api/create/order",
        {
          idTransaction: transaction.data.id,
          status: "",
          comment: "",
          cancelComment: "",
          paymentId: "",
        }
      );

      console.log(
        "🚀 ~ file: CartPage.vue ~ line 186 ~ onActionClick ~ transaction",
        order
      );
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
