<template>
  <ion-page>
    <ion-content class="page-content" :fullscreen="true"  padding>
        <form  @submit.prevent="login(form)">
            <ion-grid>
            <ion-row color="primary" class="justify-content-center align-items-center">
                <ion-col class="align-self-center" size-md="6" size-lg="5" size-xs="12">
                <div class="login-header text-center">
                    <h3>Login</h3>
                </div>
                <div class="padding">
     
                    <ion-select v-model="user" placeholder="Выберете пользователя">
                        <ion-select-option v-for="item in users" :key="item.id" :value="item.id">{{item.name}}</ion-select-option>
                        <!-- <ion-select-option :value="2">Male</ion-select-option> -->
                    </ion-select>

                    <!-- <ion-item>
                        <ion-input name="email" type="email" placeholder="your@email.com"  required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input name="password" type="password" placeholder="Password"  required></ion-input>
                    </ion-item> -->
                </div>
                <div padding>
                    <ion-button size="large" type="submit"  expand="block">Login</ion-button>
                </div>
                </ion-col>
            </ion-row>
            </ion-grid>
        </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { USER_ROLES } from "@/const";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const user = ref(null);
    const users = [
      {
        name: "Продаван",
        role: USER_ROLES.SELLER,
        id: "1234",
      },
      {
        name: "Покупатель",
        role: USER_ROLES.BUYER,
        id: "45",
      },
    ];

    const login = () => {
      const localUser = users.find((el) => el.id === user.value);
      authStore.user = localUser;
      router.push("/");
    };
    return {
      authStore,
      login,
      user,
      users,
    };
  },
};
</script>

<style lang="sass" scoped>
.page-content
    margin-top: 100px
.login-header
    margin-top: 200px
</style>

