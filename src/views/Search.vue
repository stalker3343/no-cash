<template>
  <ion-page>
   <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/buy-home"></ion-back-button>
      </ion-buttons>
     <ion-input   color="red" size="50" class="search-input" placeholder="Поиск по Еде и Услугам"></ion-input>


    </ion-toolbar>
  </ion-header>


    <ion-content :fullscreen="true">
        <div class="container">
        <ion-card>
        <ion-card-header>
        <ion-card-title>ООО Шаурма</ion-card-title>
        <div class="sub-title-items">
                <div class="sub-title-item">
<ion-icon class="sub-title-item-icon" :icon="timeOutline"></ion-icon>
                    45-50 мин.
                </div>
                           <div class="sub-title-item">
<ion-icon class="sub-title-item-icon" :icon="star"></ion-icon>
                    4.5
                </div>
                
        </div>


        </ion-card-header>

    <ion-card-content>
          <ion-slides :options="slideOpts">
          <ion-slide v-for="idx in 4" :key="idx" >
            <ProductComponent :product="{name: 'Суши', price: '500р.'}"></ProductComponent>

          </ion-slide>


        </ion-slides>

    </ion-card-content>
  </ion-card>
        </div>
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ExploreContainer name="Tab 2 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductComponent from "@/components/ProductComponent.vue";
import { timeOutline, star } from "ionicons/icons";

export default defineComponent({
  name: "Tab2Page",
  components: {
    ProductComponent,
  },
  setup() {
    const slideOpts = {
      slidesPerView: 3,
      spaceBetween: 15,
    };
    return {
      timeOutline,
      star,
      slideOpts,
    };
  },
  methods: {
    onBuy() {
      console.log("123");
    },
  },
});
</script>
<style lang="scss" scoped>
.sub-title-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.sub-title-items {
  display: flex;
  margin-top: 6px;
}
.sub-title-item-icon {
  margin-right: 3px;
}

.ion-slides {
  height: 100%;
}
</style>
