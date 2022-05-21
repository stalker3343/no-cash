<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header> -->
    
    <ion-content fullscreen>
      <div class="container">
        <ion-input  @click="onClickSearch" color="red" size="50" class="search-input" placeholder="Поиск по Еде и Услугам"></ion-input>
      </div>

 
      <!-- <ExploreContainer name="Tab 1 page 23" /> -->
    </ion-content>

    
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";

export default defineComponent({
  name: "Tab1Page",
  components: {
    // ExploreContainer,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    IonContent,
    IonPage,
  },
  methods: {
    onClickSearch() {
      console.log(
        "🚀 ~ file: BuyHome.vue ~ line 45 ~ onClickSearch ~ onClickSearch"
      );
      this.$router.push({ name: "search" });
    },
  },
});
</script>
<style lang="scss" scoped>
.search-input {
  font-size: 30px;
  --background: #f1f0ec;
  --placeholder-color: #acaba7;
  border-radius: 40px;
  // padding: 6px 50px;
  --padding-start: 20px;
  --padding-end: 20px;

  // &::placeholder {
  //   font-size: 15px ;
  //   text-align: center;
  // }
}
::v-deep {
  .native-input.sc-ion-input-md::placeholder {
    font-size: 20px;
    text-align: center;
  }
}
</style>
