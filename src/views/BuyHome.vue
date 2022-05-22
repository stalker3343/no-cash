<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header> -->
    
    <ion-content fullscreen>
      <ion-grid>
         <!-- <ion-row >
          <ion-col>
             <ion-input  @click="onClickSearch" color="red" size="40" class="search-input" placeholder="Поиск по Еде и Услугам"></ion-input>
          </ion-col>
         </ion-row> -->
        <ion-row >
          <ion-col size="6" v-for="product in products" :key="product.id">
            <ProductComponent :product="product"></ProductComponent>
          </ion-col>
            <!-- <ion-col>
              <ProductComponent :product="product"></ProductComponent>
          </ion-col> -->
        </ion-row>

      </ion-grid>

 
      <!-- <ExploreContainer name="Tab 1 page 23" /> -->
    </ion-content>

    
  </ion-page>
</template>

<script lang="ts">
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ProductComponent from "@/components/ProductComponent.vue";
export default defineComponent({
  name: "Tab1Page",
  components: {
    ProductComponent,
    // ExploreContainer,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const authStore = useAuthStore();

    const cardREs = await axios.get(
      "https://serene-spire-16208.herokuapp.com/api/cartitems",
      {
        params: {
          userId: authStore.user.id,
        },
      }
    );
    authStore.cart = cardREs.data.list;
    const res = await axios.get(
      "https://serene-spire-16208.herokuapp.com/api/product?idCategory=&nameProduct="
    );

    this.products = res.data.list;
  },

  methods: {
    onClickSearch() {
      this.$router.push({ name: "search" });
    },
  },
});
</script>
<style lang="scss" scoped>
.search-input {
  margin-top: 20px;
  font-size: 20px;
  --background: #f1f0ec;
  --placeholder-color: #acaba7;
  border-radius: 30px;
  // padding: 6px 50px;
  --padding-start: 20px;
  --padding-end: 20px;

  // &::placeholder {
  //   font-size: 15px ;
  //   text-align: center;
  // }
}
::v-deep {
  .native-input.sc-ion-input-md::placeholder {
    font-size: 20px;
    text-align: center;
  }
}
</style>
