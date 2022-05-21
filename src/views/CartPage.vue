<template>
  <ion-page>
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
            1 блюдо на 457 Р.
          </div>
          <div class="deliverer-name ">
            2 берега
          </div>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <div v-for="item in 6" :key="item" class="product-item">
            <img src="@/images/dish-scetch.webp" class="product-item-img">
            <div class="product-item-content">
              <div class="product-item-name">
                Название продукта
              </div>
              <div class="product-item-count">
                1
              </div>
              <div class="product-item-price">
                1000
              </div>
              

            </div>

          </div>
        </ion-col>
      </ion-row>

    </ion-grid>


  
    </ion-content>
        <ion-footer>
        <ion-toolbar>
          <div class="btn-wrapper">
            <ion-textarea placeholder="Комментарий к заказу">

            </ion-textarea>
<ion-button class="buy-btn-card" block>
              Купить
            </ion-button>
          </div>
            
         
        
    
      
        </ion-toolbar>
      </ion-footer>
  </ion-page>
 
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
});
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 15px;
}
.deliverer-name {
  color: var(--ion-color-medium-shade);
}

.product-item {
  display: flex;
  border-top: 1px solid #d4d4d4;
  padding: 8px 0px;
  border-bottom: 1px solid #d4d4d4;
}

.product-item-img {
  width: 100px;
  object-fit: cover;
  margin-right: 10px;
}
.product-item-content {
  width: 100%;
  position: relative;
}
.product-item-name {
  font-size: 16px;
  margin-bottom: 4px;
}
.product-item-count {
}
.product-item-price {
  position: absolute;
  right: 10px;
  top: 5px;
}

.product-item-price {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
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
