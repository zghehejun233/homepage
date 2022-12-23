<script setup lang="ts">
import { VContainer, VCol, VRow } from "vuetify/components";
import { onMounted, reactive, createApp } from "vue";
import axios from "axios";
import QuoteBanner from "@/components/QuoteBanner.vue";
import type { App } from "vue";

let quote = reactive({
  text: "",
  from: "",
});

function dailyQuote() {
  axios
    .get("https://v1.hitokoto.cn", {
      params: {
        c: "a",
        max_length: 26,
        encode: "json",
      },
    })
    .then((res) => {
      if (res.data.hitokoto.length < 15) {
        let quote = document.getElementsByTagName(
          "h1"
        )[0] as HTMLHeadingElement;
        quote.style.animation =
          "typing 1.5s steps(40, end), blink-caret 0.75s step-end infinite;";
      }
      quote.text = "「" + res.data.hitokoto + "」";
      quote.from = "——《" + res.data.from + "》 " + (res.data.from_who ?? "");
    })
    .catch((err) => {
      console.log(err);
    });
}

let bing = reactive({
  url: "",
});

function bingImage() {
  axios
    .get(" https://bing.biturl.top", {
      params: {
        resolution: "1920",
        format: "json",
        mkt: "zh-CN",
      },
    })
    .then((res) => {
      bing.url = res.data.url;
    })
    .catch((err) => {
      console.log(err);
      bing.url =
        "https://cn.bing.com/th?id=OHR.SnowyOwl_ZH-CN1193651608_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp";
    });
}

function onQuoteHover() {
  let quoteNode = document.getElementsByClassName("quote")[0] as HTMLDivElement;
  let xxx: App<Element>;
  let flag = false;
  quoteNode.addEventListener("mouseenter", () => {
    if (!flag) {
      xxx = createApp(QuoteBanner, {
        quote: {
          text: "「" + quote.text + "」",
          from: "——《" + quote.from + "》",
        },
      });
      xxx.mount("#xxx");
      flag = true;
    } else {
      xxx!.unmount();
      flag = false;
    }
  });
}

function printBanner() {
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
}

onMounted(() => {
  printBanner();
  bingImage();
  dailyQuote();
  onQuoteHover();
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
    border-color: orange;
  }
}

.parallel {
  /* border raiud; */
  border-radius: 0.5rem;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
