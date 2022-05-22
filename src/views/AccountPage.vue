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
          <h3 class="balance"> Баланс:   {{authStore.user.balance}}</h3>
         
        </ion-list>
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
import axios from "axios";

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
  async created() {
    const usersResp = await axios.get(
      "https://frozen-gorge-59006.herokuapp.com/users"
    );
    this.authStore.users = usersResp.data.data;

    const currentUserId = this.authStore.user.id;
    this.authStore.user = this.authStore.users.find(
      (el) => el.id == currentUserId
    );
    localStorage.setItem("user", JSON.stringify(this.authStore.user));
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>

<style lang="scss" scoped>
.balance {
  margin: 3px 10px;
  margin-top: 20px;
}
</style>