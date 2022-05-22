<template>
  <ion-page>
    <ion-header>
          <ion-toolbar>
            <ion-title>
            Аккаунт
            </ion-title>
              
          </ion-toolbar>
    </ion-header>

      <ion-content :fullscreen="true">
        <ion-list>
          <ion-item @click="logOut">Выйти</ion-item>
        </ion-list>
      </ion-content>
  </ion-page>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { mapStores } from "pinia";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logOut = () => {
      authStore.user = null;
      router.push({ name: "login" });
    };
    return {
      authStore,
      logOut,
    };
  },
  created() {
    console.log(useAuthStore);
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>

<style>
</style>