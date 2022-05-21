<template>
  <div class="wrapper-qr-scaner">
  <div id="loadingMessage">🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>
  <canvas id="canvas" hidden></canvas>
  <div id="output" class="hidden-qr-class">
    <div id="outputMessage">No QR code detected.</div>
    <div hidden><b>Data:</b> <span id="outputData"></span></div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import jsQR from "jsqr";
export default defineComponent({
  mounted() {
    var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    // var outputContainer = document.getElementById("output");
    // var outputMessage = document.getElementById("outputMessage");
    // var outputData = document.getElementById("outputData");

    function drawLine(begin, end, color) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
      });

    const tick = () => {
      loadingMessage.innerText = "⌛ Loading video...";
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        // outputContainer.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        var imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            "#FF3B58"
          );
          drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            "#FF3B58"
          );
          drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            "#FF3B58"
          );
          drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            "#FF3B58"
          );
          //   outputMessage.hidden = true;
          //   outputData.parentElement.hidden = false;
          //   outputData.innerText = code.data;
          this.$emit("qr-finded", code.data);
        } else {
          //   outputContainer.classList.remove("hidden-qr-class");
          //   outputMessage.hidden = false;
          //   outputData.parentElement.hidden = true;
        }
      }
      requestAnimationFrame(tick);
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper-qr-scaner {
  color: #333;
  max-width: 640px;
  margin: 0 auto;
  position: relative;
}

#loadingMessage {
  text-align: center;
  padding: 40px;
  background-color: #eee;
}

#canvas {
  width: 100%;
}

.hidden-qr-class {
  display: none;
}

#output {
  margin-top: 20px;
  background: #eee;
  padding: 10px;
  padding-bottom: 0;
}

#output div {
  padding-bottom: 10px;
  word-wrap: break-word;
}

#noQRFound {
  text-align: center;
}
</style>