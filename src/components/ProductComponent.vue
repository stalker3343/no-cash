<template>
            <div class="product">
           
                  <img src="@/images/dish-scetch.webp">
                  <div class="card-header">
                    {{product.name}}
                  </div>
                    <div class="card-price">
                    {{product.price}}
                  </div>
                  <IonButton class="card-btn" :block="true" @click="$emit('buy')">
                      Купить
                  </IonButton>
            </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  text-align: left;
  display: flex;
  flex-direction: column;
}
.card-header {
  text-align: left;
  color: black;
}
.card-price {
  text-align: left;
  font-size: 14px;
}
.card-btn {
  width: 100%;
  margin: 0px;
  margin-top: 6px;
  text-transform: capitalize !important;
}
</style>