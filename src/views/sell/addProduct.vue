<template>
  <ion-page>
         <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/sell-home"></ion-back-button>
      </ion-buttons>


    </ion-toolbar>
  </ion-header>

    <ion-content  :fullscreen="true"  class="padding">
        <form  @submit.prevent="create()">
            <ion-grid>
            <ion-row color="primary" class="justify-content-center align-items-center">
                <ion-col class="align-self-center" size-md="6" size-lg="5" size-xs="12">
                <div class="login-header text-center">
                    <h3>Создание продукта или услуги</h3>
                </div>
                <div class="padding">
                          <ion-item>
                        <ion-input  placeholder="Название" v-model="name"  required></ion-input>
                    </ion-item>
      <ion-item>
                        <ion-input placeholder="Описание" v-model="description"  required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input  placeholder="Цена" v-model="price"  required></ion-input>
                    </ion-item> 
                      <ion-item>
                    <ion-select v-model="categ" placeholder="Выберете категория">
                        <ion-select-option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }} </ion-select-option>
                        <!-- <ion-select-option :value="2">Male</ion-select-option> -->
                    </ion-select>
                      </ion-item>
               
                </div>
                <div padding>
                    <ion-button :disabled="loading" size="large" type="submit"  expand="block">Login</ion-button>
                </div>
                </ion-col>
            </ion-row>
            </ion-grid>
        </form>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { defineComponent } from "vue";
import { useIonRouter } from "@ionic/vue";
import { ref } from "vue";

export default defineComponent({
  created() {
    console.log("created");
  },
  setup() {
    const ionRouter = useIonRouter();
    let loading = ref(false);
    let categories = ref([
      {
        name: "Напитки",
        id: 9,
      },
      {
        name: "Снеки",
        id: 10,
      },
    ]);
    let categ = ref(null);
    let description = ref("");
    let name = ref("");
    let price = ref(10);

    const create = async () => {
      const authStore = useAuthStore();
      try {
        loading.value = true;
        const res = await axios.post(
          "https://serene-spire-16208.herokuapp.com/api/create/product",
          {
            count: 100,
            description: description.value,
            name: name.value,
            category: categ.value,
            price: price.value,
            userId: authStore.user.id,
          }
        );

        loading.value = false;

        ionRouter.back();
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = true;
      }
    };

    return {
      create,
      loading,
      categories,
      categ,
      description,
      name,
      price,
    };
  },
});
</script>

<style>
</style>