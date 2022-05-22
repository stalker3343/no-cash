<template>
  <ion-page>
         <ion-header>
    <ion-toolbar>

      <ion-title>
          Пополнить баланс
      </ion-title>


    </ion-toolbar>
  </ion-header>

    <ion-content  :fullscreen="true"  class="padding">
        <form  @submit.prevent="create()">
            <ion-grid>
            <ion-row color="primary" class="justify-content-center align-items-center">
<ion-col>
                <div class="padding">
                <ion-item>
                        <ion-input  placeholder="Баланс" v-model="balanceValue"  required></ion-input>
                    </ion-item>

             
                         <ion-button :block="true" class="ion-mt-4" @click="onScan">
                             Сканировать QR
                         </ion-button>
                   
     
               
                </div>
                </ion-col>
            </ion-row>
            </ion-grid>
        </form>
    </ion-content>

    <ion-modal 
        @ionModalDidDismiss="isQrScanOpen = false"
       :isOpen="isQrScanOpen"
        :breakpoints="[0.4]"
        :initialBreakpoint="0.4"
      >
   
        <QrScaner @qr-finded="onQrFinded"></QrScaner>
 


      </ion-modal>


  </ion-page>
</template>

<script>
import QrScaner from "@/components/QrScaner.vue";
import { toastController } from "@ionic/vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    QrScaner,
  },
  data() {
    return {
      isQrScanOpen: false,
      balanceValue: "",
      loading: false,
      startProccesAFterQr: false,
    };
  },

  methods: {
    onScan() {
      this.isQrScanOpen = true;
    },
    async onQrFinded(code) {
      if (this.startProccesAFterQr) return;
      this.startProccesAFterQr = true;
      this.isQrScanOpen = false;

      try {
        await axios.put(`https://frozen-gorge-59006.herokuapp.com/users`, {
          money: Number(this.balanceValue),
          id: Number(code),
        });
        this.balanceValue;

        const toast = await toastController.create({
          message: "Баланс пополнен",
          duration: 8000,
        });
        toast.present();
      } catch (error) {
        const toast = await toastController.create({
          message: "Ошибка",
          duration: 1000,
        });
        toast.present();
      } finally {
        this.startProccesAFterQr = false;
      }
    },
  },
});
</script>

<style>
</style>