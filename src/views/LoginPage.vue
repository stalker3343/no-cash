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
                        <ion-select-option v-for="item in users" :key="item.id" :value="item.id">{{item.login || 'нет имени'}} ({{item.role}})</ion-select-option>
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
import { computed, ref } from "vue";
import { USER_ROLES } from "@/const";
import { useRouter } from "vue-router";
import { toastController } from "@ionic/vue";

export default {
  setup() {
    const authStore = useAuthStore();
    authStore.users;

    const router = useRouter();
    const user = ref(null);
    const users = computed(() => {
      return authStore.users;
    });

    const login = () => {
      const localUser = users.value.find((el) => el.id === user.value);

      if (!localUser) return;
      localStorage.setItem("user", JSON.stringify(localUser));
      authStore.user = localUser;
      if (authStore.user.role === USER_ROLES.SELLER) {
        router.push("/tabs/sell-home");
        return;
      }
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

