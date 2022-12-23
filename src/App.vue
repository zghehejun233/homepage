<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { VApp, VMain, VAppBar } from "vuetify/components";
import { VCol } from "vuetify/components";
function parallelScroll() {
  document.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    let bg = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    bg.style.transform = "translateY(" + scroll * 0.01 + "px)";
  });
}

function drawRibbon(bg: HTMLCanvasElement) {
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

onMounted(() => {
  drawRibbon(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
  parallelScroll();
});
</script>

<template>
  <v-app>
    <v-app-bar app color="primary"> </v-app-bar>
    <v-main>
      <v-container fluid>
        <RouterView></RouterView>
        <v-col class="text-center" cols="12">
          <div class="footer">
            2021 - {{ new Date().getFullYear() }} | Powered by
            <strong>Vuetify Vue Vite</strong><br />鲁ICP备2022030000号
          </div>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
  <canvas id="test" class="bg"></canvas>
</template>

<style scoped>
.bg {
  position: fixed;
  display: block;
  /* background-attachment: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
}

.footer {
  padding: 30px 0;
}
</style>
