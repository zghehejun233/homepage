<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted } from "vue";

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

onMounted(() => {
  background(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
  parallelScroll();
});
</script>

<template>
  <header>
    <canvas class="bg" ref="bg"></canvas>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <div style="height: 200rem">
    Hi, I'm a long div. Scroll me to see the background effect.
  </div>
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

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.content {
  background-attachment: fixed;
  width: 100%;
  height: 200rem;
  top: 0;
  left: 0;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
