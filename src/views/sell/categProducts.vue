<template>
  <ion-page>
   <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/sell-home"></ion-back-button>
      </ion-buttons>
       <ion-title>{{currentCategName}}</ion-title>


    </ion-toolbar>
  </ion-header>
    
    <ion-content fullscreen>
      <ion-grid >
         <ion-row >
            <ion-col size="6" v-for="product in items" :key="product.id">
            <ProductComponent :product="product"></ProductComponent>
          </ion-col>

         </ion-row>
    
         


      </ion-grid>

 
      <!-- <ExploreContainer name="Tab 1 page 23" /> -->
    </ion-content>

    
  </ion-page>
</template>

<script lang="ts">
import ProductComponent from "@/components/ProductComponent.vue";
import axios from "axios";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ProductComponent,
  },
  data() {
    return {
      items: [],
      currentCategName: "",
    };
  },
  async created() {
    const res = await axios.get(
      `https://serene-spire-16208.herokuapp.com/api/product?idCategory=${this.$route.params.id}&nameProduct=`
    );

    const resCategs = await axios.get(
      "https://serene-spire-16208.herokuapp.com/api/category",
      {
        params: {
          idCategory: this.$route.params.id,
        },
      }
    );

    this.currentCategName = resCategs.data.list.find(
      (el) => el.id == this.$route.params.id
    ).name;
    this.items = res.data.list;
  },
});
</script>

