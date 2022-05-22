<template>
  <ion-page>
<!--suppress ALL -->


    <ion-content :fullscreen="true">
    <ion-list lines="none">
        <ion-item v-for="message in messeges" :key="message.id">
            <chat-bubble :chatMessage="message"></chat-bubble>
        </ion-item>
    </ion-list>
    </ion-content>

    <ion-footer  class="chatPageFooter " keyboardAttach="content" btnClicked="btnEmitter">
        <ion-toolbar>
            <ion-item lines="none">
                 <ion-label style="margin:0px;">
    
    </ion-label>

                <div  style="width:100%;">
                    <ion-textarea v-model="txtChat"></ion-textarea>
                    <!-- <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea> -->
                </div>
            </ion-item>
            <ion-buttons slot="end"  style="margin-left:10px">
                <!--                 :disabled="txtChat.trim().length<1"
    -->
                <ion-button :disabled="loading"  style="margin-top: -15px;"
                        @click="sendMessage">

                    <ion-icon slot="icon-only" :icon="send"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import chatBubble from "@/components/Chat/chatBubble.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { defineComponent } from "vue";
import { useIonRouter } from "@ionic/vue";
import { ref } from "vue";
import { send } from "ionicons/icons";
export default defineComponent({
  components: {
    chatBubble,
  },
  setup() {
    return {
      send,
    };
  },
  data() {
    return {
      messeges: [],
      intervalId: null,
      txtChat: "",
      loading: false,
    };
  },
  created() {
    this.getMessages();
    this.intervalId = setInterval(() => {
      this.getMessages();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async getMessages() {
      const res = await axios.get(
        "https://frozen-gorge-59006.herokuapp.com/comment"
      );

      this.messeges = res.data.data;
    },
    async sendMessage() {
      const store = useAuthStore();
      this.loading = true;
      await axios.post("https://frozen-gorge-59006.herokuapp.com/comment", {
        text: this.txtChat,
        user_id: store.user.id,
      });
      this.txtChat = "";
      this.loading = false;

      //   console.log("sendMessage");
    },
  },
  //   setup() {
  //     const ionRouter = useIonRouter();
  //     let loading = ref(false);

  //     let categ = ref(null);
  //     let description = ref("");
  //     let name = ref("");
  //     let price = ref(10);

  //     const create = async () => {
  //       const authStore = useAuthStore();
  //       try {
  //         loading.value = true;
  //         const res = await axios.post(
  //           "https://serene-spire-16208.herokuapp.com/api/create/product",
  //           {
  //             count: 100,
  //             description: description.value,
  //             name: name.value,
  //             category: categ.value,
  //             price: price.value,
  //             userId: authStore.user.id,
  //           }
  //         );

  //         loading.value = false;

  //         ionRouter.back();
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         loading.value = true;
  //       }
  //     };

  //     return {
  //       create,
  //       loading,
  //       categories,
  //       categ,
  //       description,
  //       name,
  //       price,
  //     };
  //   },
});
</script>

<style lang="scss" scoped>
$colors: (
  primary: #7e57c2,
  secondary: #32db64,
  danger: #f53d3d,
  light: #f4f4f4,
  dark: #222,
);

$chat: (
  footer: white,
  input: #f6f8fa,
  input-border: #999999,
);

$chat-bubble: (
  background-left: #e5e5ea,
  font-left: black,
  font-right: white,
  background-right: map-get($colors, primary),
);

ion-label {
  margin: 0 !important;
}

ion-item {
  margin: 0 !important;
  padding: 0 !important;
}

ion-item > .item-inner {
  margin: 0 !important;
  padding: 0 !important;
}

.chatPageFooter {
  .toolbar-background {
    background: map-get($chat, footer);
  }
  .toolbar {
    padding: 4px 8px !important;
  }
}
</style>