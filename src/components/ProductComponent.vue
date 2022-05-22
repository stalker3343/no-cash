<template>
            <div class="product">
           
                  <img class="product-image" :src="product.image ||  require('@/images/dish-scetch.webp')">
                  <div class="card-header">
                    {{product.name}}
                  </div>
                    <div >
                    {{product.description}}
                  </div>
                    <div class="card-price">
                    {{product.price || '-'}} ₽
                  </div>
                  <IonButton :disabled="isLoading" v-if="!count" class="card-btn" :block="true" @click="onBuy">
                    {{isSeller ? 'Добавить в заказ': 'КУпить'}}  
                  </IonButton>

                  <div class="counter-wrapper" v-else>
                    <ion-button :disabled="isLoading" @click="onRemove">
                        <ion-icon slot="icon-only" :icon="removeCircle"></ion-icon>
                    </ion-button>
                      <div>
                          {{count}}
                      </div>
                                <ion-button :disabled="isLoading" @click="onAdd ">
                        <ion-icon slot="icon-only" :icon="addCircle"></ion-icon>

                      </ion-button>
                  </div>
            </div>
</template>

<script>
import { removeCircle, addCircle } from "ionicons/icons";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { toastController } from "@ionic/vue";
import { computed } from "@vue/runtime-core";
import { USER_ROLES } from "@/const";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const authStore = useAuthStore();

    const isSeller = computed(() => {
      if (!authStore.user) return false;
      return authStore.user.role === USER_ROLES.SELLER;
    });

    return {
      removeCircle,
      addCircle,

      isSeller,
    };
  },

  data() {
    return {
      count: 0,
      isLoading: false,
      createdRowId: null,
    };
  },

  created() {
    const authStore = useAuthStore();
    const selectedItemRow = authStore.cart.find(
      (el) => el.idProduct.id === this.product.id
    );
    if (selectedItemRow) {
      this.count = selectedItemRow.count;
      this.createdRowId = selectedItemRow.id;
    }
  },

  methods: {
    async createItem() {
      const authStore = useAuthStore();

      this.isLoading = true;
      try {
        const res = await axios.post(
          "https://serene-spire-16208.herokuapp.com/api/create/cartitems",
          {
            idUser: authStore.user.id,
            idProduct: this.product.id,
            count: 1,
          }
        );
        this.createdRowId = res.data.id;
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
    async updateItemServe() {
      const authStore = useAuthStore();

      this.isLoading = true;
      try {
        await axios.post(
          "https://serene-spire-16208.herokuapp.com/api/update/cartitems",
          {
            id: this.createdRowId,
            idUser: authStore.user.id,
            idProduct: this.product.id,
            count: this.count,
          }
        );
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
    async deleteItemServe() {
      this.isLoading = true;
      try {
        await axios.get(
          "https://serene-spire-16208.herokuapp.com/api/remove/cartItems",
          {
            params: {
              id: this.createdRowId,
            },
          }
        );
        this.createdRowId = null;
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

    onBuy() {
      this.count++;
      this.$emit("buy", this.count);
      this.createItem();
    },
    onAdd() {
      this.count++;
      this.$emit("buy", this.count);
      this.updateItemServe();
    },
    onRemove() {
      this.count--;
      if (this.count === 0) {
        this.$emit("buy", this.count);
        this.deleteItemServe();
        return;
      }

      this.$emit("buy", this.count);
      this.updateItemServe();
    },
  },
};
</script>

<style lang="scss" scoped>
.counter-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product {
  text-align: left;
  display: flex;
  flex-direction: column;
}
.card-header {
  text-align: left;
  color: black;
  font-size: 20px;
}
.card-price {
  text-align: left;
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: 500;
}
.card-btn {
  width: 100%;
  margin: 0px;
  margin-top: 6px;
  text-transform: capitalize !important;
}
.product-image {
  height: 172px;
  width: 100%;
  object-fit: cover;
}
</style>