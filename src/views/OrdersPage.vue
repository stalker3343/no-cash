<template>
  <ion-page>
         <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/sell-home"></ion-back-button>
      </ion-buttons>
              <ion-title>Заказы</ion-title>




    </ion-toolbar>
  </ion-header>

    <ion-content  :fullscreen="true"  class="padding">

    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  data() {
    return {
      items: [],
    };
  },
  async created() {
    const authStore = useAuthStore();

    const res = await axios.get(
      `https://frozen-gorge-59006.herokuapp.com/comment`
      //   {
      //     params: {
      //       userIdTo: authStore.user.id,
      //     },
      //   }
    );

    // this.currentCategName = res.data.list.filter(
    //   (el) => el.id == this.$route.params.id
    // ).name;
    this.items = res.data.list;
  },
});
</script>

<style>
</style>