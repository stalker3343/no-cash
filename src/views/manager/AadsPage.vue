<template>
    <ion-page >
        <ion-header>
            <ion-toolbar>
            <ion-title>Реклама</ion-title>
            </ion-toolbar>
        </ion-header>
        
    <ion-content :fullscreen="true">
         <form  @submit.prevent="onAddAdds()">
            <ion-grid>
            <ion-row color="primary" class="justify-content-center align-items-center">
                <ion-col class="align-self-center" size-md="6" size-lg="5" size-xs="12">

                <div class="padding">
                    <ion-item>
                        <ion-input  placeholder="Текст рекламы" v-model="aadsText"  required></ion-input>
                    </ion-item>
                </div>
                <div padding>
                    <ion-button :disabled="loading" size="large" type="submit"  expand="block">Создать рекламу</ion-button>
                </div>
                </ion-col>

                  

            </ion-row>
               <ion-row>
                <ion-col>
                    <h3>Список рекламы</h3>
                    <!-- {{addList}} -->
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <div v-for="item in addList" :key="item.id">
                        {{item.text}}
                    </div>
                    <!-- {{addList}} -->
                </ion-col>
            </ion-row>
            </ion-grid>
        </form>
      
    </ion-content>

    </ion-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      aadsText: "",
      addList: [],
    };
  },
  created() {
    this.loadAdds();
  },
  methods: {
    async loadAdds() {
      const res = await axios.get(
        "https://frozen-gorge-59006.herokuapp.com/advertisement"
      );
      this.addList = res.data.data;
    },
    async onAddAdds() {
      if (!this.aadsText) return;
      const res = await axios.post(
        "https://frozen-gorge-59006.herokuapp.com/advertisement",
        {
          text: this.aadsText,
        }
      );
      this.aadsText = "";
      this.loadAdds();
    },
  },
};
</script>

<style>
</style>