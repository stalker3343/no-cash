<template>
  <ion-page>
         <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/sell-home"></ion-back-button>
      </ion-buttons>


    </ion-toolbar>
  </ion-header>

    <ion-content  :fullscreen="true"  class="padding">
        <form  @submit.prevent="create()">
            <ion-grid>
            <ion-row color="primary" class="justify-content-center align-items-center">
                <ion-col class="align-self-center" size-md="6" size-lg="5" size-xs="12">
                <div class="login-header text-center">
                    <h3>Создание продукта или услуги</h3>
                </div>
                <div class="padding">
                          <ion-item>
                        <ion-input  placeholder="Название" v-model="name"  required></ion-input>
                    </ion-item>
      <ion-item>
                        <ion-input placeholder="Описание" v-model="description"  required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input  placeholder="Цена" v-model="price"  required></ion-input>
                    </ion-item> 
                      <ion-item>
                    <ion-select v-model="categ" placeholder="Выберете категория">
                        <ion-select-option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }} </ion-select-option>
                        <!-- <ion-select-option :value="2">Male</ion-select-option> -->
                    </ion-select>
                       </ion-item>
                    <ion-item  placeholder="Загрузите картинку">
                        <input
                            id="image-loader"
                            ref="input"
                            type="file"
                            @change="upload($event.target.files)"
                        />
                        <!-- <ion-select-option :value="2">Male</ion-select-option> -->
                    </ion-item>



                   
               
                </div>
                <div padding>
                    <ion-button :disabled="loading" size="large" type="submit"  expand="block">Login</ion-button>
                </div>
                </ion-col>
            </ion-row>
            </ion-grid>
        </form>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { defineComponent } from "vue";
import { useIonRouter } from "@ionic/vue";
import { ref } from "vue";

export default defineComponent({
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    const resCategs = await axios.get(
      "https://serene-spire-16208.herokuapp.com/api/category"
    );
    this.categories = resCategs.data.list;
  },
  setup() {
    const ionRouter = useIonRouter();
    let loading = ref(false);

    let categ = ref(null);
    let description = ref("");
    let name = ref("");
    let price = ref("");
    let fileToUpload = ref(null);

    const upload = (inputFiles) => {
      // const files = []

      fileToUpload.value = inputFiles[0];
    };

    const create = async () => {
      const authStore = useAuthStore();
      try {
        loading.value = true;
        const res = await axios.post(
          "https://serene-spire-16208.herokuapp.com/api/create/product",
          {
            count: 100,
            description: description.value,
            name: name.value,
            category: categ.value,
            price: price.value,
            userId: authStore.user.id,
          }
        );

        var formData = new FormData();
        // formData.append("id", res.data.id);
        formData.append("image", fileToUpload.value);

        const resAfterImage = axios({
          method: "put",
          url: `https://frozen-gorge-59006.herokuapp.com/products/${res.data.id}`,
          data: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.error(response);
          });

        // const resAfterImage = await axios.put(
        //   "https://frozen-gorge-59006.herokuapp.com/products",
        //   formData
        // );
        console.log(resAfterImage);

        loading.value = false;

        ionRouter.back();
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = true;
      }
    };

    return {
      create,
      loading,

      categ,
      description,
      name,
      price,
      upload,
    };
  },
});
</script>

<style>
</style>