<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, ref } from "vue";
import { VApp, VMain, VAppBar, VImg } from "vuetify/components";
import { VContainer, VRow, VCol } from "vuetify/components";
function parallelScroll() {
  document.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    let bg = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    bg.style.transform = "translateY(" + scroll * 0.01 + "px)";
  });
}

function background(bg: HTMLCanvasElement) {
  let ctx = bg!.getContext("2d")!;
  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });

  let pixelRatio = window.devicePixelRatio || 1,
    width = window.innerWidth,
    height = window.innerHeight,
    f = 90,
    q: { x: any; y: number }[],
    r = 0,
    u = Math.PI * 2,
    v = Math.cos,
    z = Math.random;

  bg.width = width * pixelRatio;
  bg.height = height * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);
  ctx.globalAlpha = 0.6;

  function i() {
    ctx.clearRect(0, 0, width, height);
    q = [
      { x: 0, y: height * 0.7 + f },
      { x: 0, y: height * 0.7 - f },
    ];
    while (q[1].x < width + f) d(q[0], q[1]);
  }

  function d(i: { x: any; y: any }, j: { x: any; y: any }) {
    ctx.beginPath();
    ctx.moveTo(i.x, i.y);
    ctx.lineTo(j.x, j.y);
    let k = j.x + (z() * 2 - 0.25) * f,
      n = y(j.y);
    ctx.lineTo(k, n);
    ctx.closePath();
    r -= u / -50;
    ctx.fillStyle =
      "#" +
      (
        ((v(r) * 127 + 128) << 16) |
        ((v(r + u / 3) * 127 + 128) << 8) |
        ((v(r + (u / 3) * 2) * 127 + 128) << 0)
      ).toString(16);
    ctx.fill();
    q[0] = q[1];
    q[1] = { x: k, y: n };
  }

  function y(p: number): number {
    let t = p + (z() * 2 - 1.1) * f;
    return t > height || t < 0 ? y(p) : t;
  }

  document.onclick = i;
  document.ontouchstart = i;
  i();
}

function resizeMainWindow() {
  resizeWindow();
  window.addEventListener("resize", function () {
    resizeWindow();
  });
}

function resizeWindow() {
  const cao = document.getElementById("cao");
  const width = window.innerWidth;
  if (width < 1440 - 160) {
    cao!.style.width = width - 64 + "px";
  } else {
    cao!.style.width = width - 224 + "px";
  }
}

onMounted(() => {
  background(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
  parallelScroll();
  resizeMainWindow();
});
</script>

<template>
  <v-app>
    <v-app-bar app color="primary"> </v-app-bar>
    <v-main id="cao">
      <canvas class="bg" ref="bg"></canvas>
      <RouterView />

      <v-row>
        <v-col cols="6">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              height="194"
            ></v-img>

            <v-card-title>Card Title</v-card-title>

            <v-card-subtitle>Card Subtitle</v-card-subtitle>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </v-card-text>

            <v-card-actions>
              <v-btn text>Cancel</v-btn>

              <v-btn text>Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6"
          ><v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              height="194"
            ></v-img>

            <v-card-title>Card Title</v-card-title>

            <v-card-subtitle>Card Subtitle</v-card-subtitle>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </v-card-text>

            <v-card-actions>
              <v-btn text>Cancel</v-btn>

              <v-btn text>Ok</v-btn>
            </v-card-actions>
          </v-card></v-col
        >
      </v-row>
      <v-col class="text-center" cols="12">
        <div class="footer">
          2021 - {{ new Date().getFullYear() }} | Powered by
          <strong>Vuetify Vue</strong><br />鲁ICP备2022030000号
        </div>
      </v-col>
    </v-main>
  </v-app>
</template>

<style scoped>
.bg {
  position: fixed;
  background-attachment: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.footer {
  padding: 30px 0;
}
</style>
