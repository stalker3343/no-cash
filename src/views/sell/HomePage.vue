<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>мой магазин</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content fullscreen>
      <ion-grid >
           <ion-row >
          <ion-col >
            <ion-button router-link="/add-product"  block>
                Добавить продукт
            </ion-button>

          </ion-col>

         </ion-row>

         <ion-row >
          <ion-col size="6" v-for="categ in categs" :key="categ" >
            <ion-card :router-link="'/sell-cater-products/'+ categ.id">
                <ion-card-header>
                    <ion-card-title>{{categ.name}}</ion-card-title>
                </ion-card-header>
            </ion-card>

          </ion-col>

         </ion-row>
           <!-- <ion-row >
          <ion-col >
            <ion-card button>
                <ion-card-header>
                    <ion-card-title>Категория 3</ion-card-title>
                </ion-card-header>
            </ion-card>

          </ion-col>
          <ion-col >

                <ion-card button>
                <ion-card-header>
                    <ion-card-title>Категория 4</ion-card-title>
                </ion-card-header>
            </ion-card>
          </ion-col>
         </ion-row> -->
         


      </ion-grid>

 
      <!-- <ExploreContainer name="Tab 1 page 23" /> -->
    </ion-content>

    
  </ion-page>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      categs: [],
    };
  },
  async created() {
    const resCategs = await axios.get(
      "https://serene-spire-16208.herokuapp.com/api/category"
    );
    this.categs = resCategs.data.list;
  },
});
</script>

