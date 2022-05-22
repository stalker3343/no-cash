<template>
<div class="buble-wrapper">
  <div :class="chatMessage.user.id === authStore.user.id ? 'right' : 'left'" class="chat-bubble">
    <div class="message">{{chatMessage.text}}</div>
    <!-- <div class="message-detail" style="float:right">
      <span>{{chatMessage.text}}</span>
    </div> -->
  </div>
</div>

</template>
<script lang="ts">
import { useAuthStore } from "@/stores/auth";

import { defineComponent } from "vue";
export default defineComponent({
  props: {
    chatMessage: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
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

.message {
  font-size: medium;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.message-detail {
  white-space: nowrap;
  font-size: 12px;
  padding-top: 5px;
}
.buble-wrapper {
  width: 100%;
}

.chat-bubble {
  border-radius: 5px;
  display: inline-block;
  position: relative;
  padding: 8px;
  margin: 8px 12px;
  max-width: 80%;
}

.chat-bubble:before {
  content: "\00a0";
  display: block;
  height: 13px;
  width: 9px;
  position: absolute;
  bottom: -0.5px;
}

.chat-bubble.left {
  background-color: map-get($chat-bubble, background-left);
  color: map-get($chat-bubble, font-left);
  float: left;
}

.chat-bubble.right {
  background-color: map-get($chat-bubble, background-right);
  color: map-get($chat-bubble, font-right);
  float: right;
}

.chat-bubble.left:before {
  background-color: map-get($chat-bubble, background-left);
  left: -4px;
  border-bottom-right-radius: 100%;
  border-top-left-radius: 50%;
  -webkit-transform: rotate(70deg) skew(5deg);
}

.chat-bubble.right:before {
  background-color: map-get($chat-bubble, background-right);
  right: -4px;
  border-bottom-left-radius: 50%;
  border-top-right-radius: 100%;
  -webkit-transform: rotate(118deg) skew(-5deg);
}
</style>