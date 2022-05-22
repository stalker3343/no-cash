<template>
  <ion-app>
     <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
    <ion-router-outlet  v-else />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { toastController } from "@ionic/vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  data() {
    return {
      isLoading: true,
      users: [],
    };
  },

  async created() {
    const authStore = useAuthStore();
    let locStorageUser = localStorage.getItem("user");
    if (locStorageUser) {
      const prsedUser = JSON.parse(locStorageUser);
      authStore.user = prsedUser;
      const cartResp = await axios.get(
        "https:/serene-spire-16208.herokuapp.com/api/cartitems",
        {
          params: {
            userId: prsedUser.id,
          },
        }
      );
      authStore.cart = cartResp.data.list;
    }

    if (!authStore.user) {
      this.$router.push({ name: "login" });
    }
    try {
      const usersResp = await axios.get(
        "https://frozen-gorge-59006.herokuapp.com/users"
      );

      // const usersResp = {
      //   data: [
      //     {
      //       id: 1,
      //       balance: 1000,
      //       lat: 43.23,
      //       login: "test_buyer",
      //       lon: 34.22,
      //       name: "",
      //       password: "test",
      //       phone: "+79436741923",
      //       role: "buyer",
      //     },
      //     {
      //       id: 2,
      //       balance: 1000,
      //       lat: 43.25,
      //       login: "test_seller",
      //       lon: 34.21,
      //       name: "",
      //       password: "test",
      //       phone: "+79436741923",
      //       role: "seller",
      //     },
      //   ],
      //   status: 0,
      // };
      authStore.users = usersResp.data.data;
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
});
</script>