<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, reactive } from "vue";
import { VApp, VMain, VAppBar } from "vuetify/components";
import { VCol, VTabs, VTab, VIcon, VTooltip } from "vuetify/components";
import { getIpInfo } from "@/api/userInfo";
import type { IpInfo } from "@/api/userInfo";

// 背景滚动速度
const parallelRaatio = 0.02;

function parallelScroll() {
  document.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    let bg = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    bg.style.transform = "translateY(" + scroll * parallelRaatio + "px)";
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

  // document.onclick = i;
  // document.ontouchstart = i;
  i();
}

let welcomebar = reactive({
  show: false,
  text: "",
});

const ipSnakbar = () => {
  getIpInfo().then((res: IpInfo) => {
    console.log(res);
    const { ip, country, region, city } = res;
    console.log("你好，来自" + country + region + city + "的朋友！");
    setTimeout(() => {
      welcomebar.show = true;
      welcomebar.text = "你好，来自" + country + region + city + "的朋友！";
    }, 100);
  });
};

onMounted(() => {
  drawRibbon(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
  parallelScroll();
  ipSnakbar();
});
</script>

<template>
  <canvas class="bg"></canvas>
  <v-app id="main">
    <v-app-bar :elevation="2" scroll-threshold="200" rounded>
      <template v-slot:default>
        <span>
          <v-icon size="x-large">mdi-vuetify</v-icon>
          <span class="ml-2">苏喂</span>
        </span>
      </template>
      <template v-slot:append>
        <v-tabs>
          <v-tooltip bottom>
            <template v-slot:activator>
              <v-tab to="/"><v-icon size="x-large">mdi-home</v-icon></v-tab>
            </template>
            <span>xxx</span>
          </v-tooltip>
          <v-tab to="/about"><v-icon size="x-large">mdi-book</v-icon></v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView>
        <template v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </template>
      </RouterView>
      <v-col class="text-center" cols="12">
        <div class="footer">
          2021 - {{ new Date().getFullYear() }} | Powered by
          <strong>Vuetify Vue Vite</strong><br />鲁ICP备2022030000号
        </div>
      </v-col>
      <v-snackbar v-model="welcomebar.show" timeout="3000" color="success">
        {{ welcomebar.text }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="welcomebar.show = false">
            关闭
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<style scoped>
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg {
  position: fixed;
  /* background-attachment: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
}

#main {
  /* 使根组件透明，显示背景 */
  background: rgba(255, 255, 255, 0);
}

.footer {
  padding: 30px 0;
}
</style>
