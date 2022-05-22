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
                        <ion-input  placeholder="Логин" v-model="login"  required></ion-input>
                    </ion-item>
      <ion-item>
                        <ion-input placeholder="Пароль" v-model="password"  required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input  placeholder="Имя" v-model="name"  required></ion-input>
                    </ion-item> 
                        <ion-item>
                        <ion-input  placeholder="Телефон" v-model="phone"  required></ion-input>
                    </ion-item> 
                      <ion-item>
                    <ion-select v-model="role" placeholder="Выберете роль">
                        <ion-select-option  value="seller">seller </ion-select-option>
                         <ion-select-option  value="buyer">buyer </ion-select-option>

                        <ion-select-option  value="manager">manager</ion-select-option>

                        <ion-select-option  value="operator">operator </ion-select-option>

                        <!-- <ion-select-option :value="2">Male</ion-select-option> -->
                    </ion-select>
                      </ion-item>
               
                </div>
                <div padding>
                    <ion-button :disabled="loading" size="large" type="submit"  expand="block">Создать</ion-button>
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
  setup() {
    const ionRouter = useIonRouter();
    let loading = ref(false);

    let login = ref("");
    let password = ref("");
    let name = ref("");
    let role = ref("");
    let phone = ref("");

    const create = async () => {
      try {
        loading.value = true;
        const res = await axios.post(
          "https://frozen-gorge-59006.herokuapp.com/users/signup",
          {
            login: "manager",
            password: "manager",
            name: "ypr",
            latitude: 0,
            longitude: 0,
            role: "manager",
            balance: 0,
            phone: "string",
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