<template>
    <div   class="product-item">
        <img src="@/images/dish-scetch.webp" class="product-item-img">
        <div class="product-item-content">
        <div class="product-item-name">
        {{product.name}}
        </div>
        <div class="product-item-count">
        1
        </div>
        <div class="product-item-price">
        1000
        </div>


        </div>

    </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    initRowId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>