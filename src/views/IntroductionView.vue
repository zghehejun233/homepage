<script setup lang="ts">
import { VContainer, VCol, VRow, VImg } from "vuetify/components";
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

    quote.from = `—《${res.from}》` + (res.who ? ` ${res.who}` : "");
    quote.uuid = res.uuid;

    // 调整文本动画
    let textAnimationDuration: number = (20 / textLength) * textAnimationRatio;
    textAnimationDuration =
      textAnimationDuration > 10 ? 10 : textAnimationDuration;
    textAnimationDuration =
      textAnimationDuration < 3 ? 3 : textAnimationDuration;
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

const bannerInfo = reactive({
  show: true,
  text: "你好呀👋本站是一个引导页，你可以在这里看到一些有趣的东西，更多内容请访问我的博客",
});

const openBlog = () => {
  console.log("打开博客");

  window.open("https://surui-blog.vercel.app/", "_blank");
};

onMounted(() => {
  printBanner();
  buildBingImage();
  buildQuote();
});
</script>
<template>
  <v-container class="introduction">
    <v-banner
      v-if="bannerInfo.show"
      color="success"
      icon="mdi-vuetify"
      lines="one"
      :text="bannerInfo.text"
    >
      <v-banner-actions>
        <v-btn @click="bannerInfo.show = false">关闭</v-btn>
      </v-banner-actions>
    </v-banner>
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
  </v-container>
  <v-container>
    <v-card>
      <v-card-title>我的Github⬇️</v-card-title>
      <v-card-subtitle>或许commit有些过于稀疏？</v-card-subtitle>
      <v-card-text>
        <v-container>
          <v-row align-content="center" justify="center">
            <v-col cols="10">
              <v-img src="https://ghchart.rshah.org/409ba5/zghehejun233" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
  <v-container>
    <v-card>
      <v-card-title>我的博客⬇️</v-card-title>
      <v-card-subtitle>可以访问“友链”看看其他朋友哦</v-card-subtitle>
      <v-card-text>
        <iframe
          src="https://surui-blog.vercel.app/"
          frameborder="0"
          width="100%"
          height="1000px"
        ></iframe>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            style="margin: 1vh 2vw"
            prepend-icon="mdi-chevron-right"
            @click="openBlog"
            color="primary"
          >
            Detail
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<style scoped>
.v-card {
  margin-top: 20px;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: 500;
}

.v-card-subtitle {
  font-size: 1rem;
  font-weight: 400;
}

.v-card-text {
  font-size: 1rem;
  font-weight: 400;
}
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
