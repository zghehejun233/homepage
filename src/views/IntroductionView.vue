<script setup lang="ts">
import { VContainer, VCol, VRow } from "vuetify/components";
import { onMounted, reactive } from "vue";

import { getQuote } from "@/api/quote";
import type { Quote } from "@/api/quote";
import { getBing } from "@/api/bing";

// 文本动画速度比例
const textAnimationRatio: number = 3;

let quote: Quote = reactive({
  text: "",
  from: "",
  uuid: "",
});

let bing = reactive({
  url: "https://www.bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_1920x1080.jpg",
});

const buildQuote = () => {
  getQuote().then((res) => {
    let textLength: number = res.text.length;
    let textElement: HTMLElement = document.querySelector(
      ".quote h1"
    ) as HTMLElement;
    const parentFontSize: number = Number(
      window
        .getComputedStyle(textElement.parentElement as HTMLElement)
        .getPropertyValue("font-size")
        .split("px")[0]
    );

    // 调整文本长度
    textElement.style.fontSize = res.text.length > 20 ? "1.5rem" : "2rem";
    let textWidth: number =
      Number(
        window
          .getComputedStyle(textElement)
          .getPropertyValue("width")
          .split("px")[0]
      ) *
      textLength *
      parentFontSize;
    resizeQuoteText(textWidth, textLength, res);

    quote.from = `—《${res.from}》` + (res.who ? `，${res.who}` : "");
    quote.uuid = res.uuid;

    // 调整文本动画
    let textAnimationDuration: number = (20 / textLength) * textAnimationRatio;
    textElement.style.animationDuration = `${textAnimationDuration}s`;

    // 监听窗口大小变化
    window.addEventListener("resize", () =>
      resizeQuoteText(textWidth, textLength, res)
    );
  });
};

const resizeQuoteText = (textWidth: number, textLength: number, res: Quote) => {
  let containerWidth = (document.querySelector(".quote") as HTMLElement)
    .clientWidth;
  if (textWidth - 32 * 2 > containerWidth) {
    quote.text =
      res.text.slice(0, containerWidth / (textWidth / textLength)) + "...";
  } else {
    quote.text = res.text;
  }
};

const buildBingImage = () => {
  getBing().then((res) => {
    bing.url = res.url;
  });
};

const printBanner = () => {
  console.log(
    `
    ███████╗██████╗ ██╗   ██╗       ██████╗ ███╗   ██╗██╗     ██╗███╗   ██╗███████╗
    ██╔════╝██╔══██╗██║   ██║      ██╔═══██╗████╗  ██║██║     ██║████╗  ██║██╔════╝
    ███████╗██║  ██║██║   ██║█████╗██║   ██║██╔██╗ ██║██║     ██║██╔██╗ ██║█████╗
    ╚════██║██║  ██║██║   ██║╚════╝██║   ██║██║╚██╗██║██║     ██║██║╚██╗██║██╔══╝
    ███████║██████╔╝╚██████╔╝      ╚██████╔╝██║ ╚████║███████╗██║██║ ╚████║███████╗
    ╚══════╝╚═════╝  ╚═════╝        ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
    `,
    "color: #000; background: #fff; padding:5px 0;"
  );
  console.log(
    "%c 作者: 郭苏睿",
    "color: #000; background: #fff; padding:5px 0;"
  );
  console.log(
    "%c LICENSE: Anti 996",
    "color: #000; background: #fff; padding:5px 0;"
  );
};

onMounted(() => {
  printBanner();
  buildBingImage();
  buildQuote();
});
</script>
<template>
  <v-container class="introduction">
    <v-row>
      <v-col cols="12"><div id="xxx"></div></v-col>
      <v-col cols="12">
        <v-parallax class="parallel" :src="bing.url" height="300px">
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
              <div class="quote">
                <div>
                  <h1 style="display: flex">{{ quote.text }}</h1>
                  <h2>{{ quote.from }}</h2>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>
    </v-row>
    <v-row align="center" align-content="center" justify="center">
      <v-col cols="6">xxxx</v-col>
      <v-col cols="6">yyyy</v-col>
    </v-row>
    <v-row>
      <div style="height: 800px"></div>
    </v-row>
  </v-container>
</template>
<style scoped>
.quote {
  display: flex;

  position: relative;
  top: 100px;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: aliceblue;
}

.quote h2 {
  position: relative;
  top: 12px;
  font-size: 1.2rem;
  font-weight: 400;
}

.quote h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.1em solid rgb(40, 40, 40); /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  width: fit-content;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgb(177, 220, 255);
  }
}

.parallel {
  /* border raiud; */
  border-radius: 0.5rem;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
