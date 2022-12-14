<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { VApp, VMain, VAppBar } from "vuetify/components";
import { VCol, VTabs, VTab, VIcon, VDivider } from "vuetify/components";
import { useTheme } from "vuetify";
import { getIpInfo } from "@/api/userInfo";
import type { IpInfo } from "@/api/userInfo";

// 背景滚动速度
const PARALLEL_RATIO = 0.02;

const folderItems = [
  { name: "Web课设", to: "/web", icon: "mdi-television", description: "" },
  {
    name: "Untitled",
    to: "/tablature",
    icon: "mdi-guitar-pick-outline",
    description: "",
  },
];

const showFolder = ref(false);

function parallelScroll() {
  document.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    let bg = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    bg.style.transform = "translateY(" + scroll * PARALLEL_RATIO + "px)";
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
    const { country, region, city } = res;
    setTimeout(() => {
      welcomebar.show = true;
      welcomebar.text = "你好，来自" + country + region + city + "的朋友！";
    }, 100);
  });
};

const theme = useTheme();

const _updateTheme = (event: MediaQueryListEvent) => {
  event.matches
    ? (theme.global.name.value = "dark")
    : (theme.global.name.value = "light");
};

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  // 手动更改主题后，移除监听
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .removeEventListener("change", _updateTheme);
};

const detectDarkMode = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", _updateTheme);
};

onMounted(() => {
  drawRibbon(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
  parallelScroll();
  ipSnakbar();
  detectDarkMode();
});
</script>

<template>
  <canvas class="bg"></canvas>
  <v-app id="main">
    <v-app-bar :elevation="2" scroll-threshold="200" rounded>
      <template v-slot:title>
        <span>
          <v-icon size="x-large">mdi-vuetify</v-icon>
          <span class="ml-2">苏喂</span>
        </span>
      </template>
      <!--  -->
      <template v-slot:append>
        <v-tabs>
          <v-tab to="/" icon><v-icon size="large">mdi-home</v-icon></v-tab>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                style="padding-top: 1.5vh"
                size="large"
                height="100%"
                v-bind="props"
              >
                <v-icon size="x-large">mdi-folder</v-icon>
                <v-icon end> mdi-menu-down </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="item in folderItems" :key="item.name">
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <RouterLink :to="item.to" class="link">
                  {{ item.name }}
                </RouterLink>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-tab to="/about" icon
            ><v-icon size="large">mdi-account</v-icon></v-tab
          >
        </v-tabs>
        <v-divider
          vertical
          inset
          style="margin-left: 0.5vh; margin-right: 0.5vh"
        ></v-divider>
        <v-btn style="padding-top: 1vh" @click="toggleTheme">
          <v-icon size="large">mdi-brightness-6</v-icon>
        </v-btn>
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
          <strong>Vuetify Vue Vite</strong><br />
          <div class="icp">鲁ICP备2022030000号</div>
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
.link {
  text-decoration: none;
  color: inherit;
}
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

.icp {
  text-decoration: line-through;
}
</style>
