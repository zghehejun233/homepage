<script setup lang="ts">
import { VContainer, VRow, VCard, VIcon, VBtn } from "vuetify/components";
import { reactive, onUpdated } from "vue";
import { useTheme } from "vuetify";

const contacts = reactive({
  github: {
    name: "github",
    show: false,
    icon: "mdi-github",
    url: "https://github.com/zghehejun233",
    content: "zghehejun233",
  },
  email: {
    name: "email",
    show: false,
    icon: "mdi-email",
    url: "x",
    content: "202100300224@mail.sdu.edu.cn",
  },
  bilibili: {
    name: "bilibili",
    show: false,
    icon: "mdi-television-classic",
    url: "https://space.bilibili.com/12473468",
    content: "-呵呵君w-",
  },
});

const colors = ["cyan", "pink", "purple", "indigo", "blue", "teal", "green"];

const info = reactive({
  name: "苏喂",
  introduction: "I am a student.",
  skills: [
    "Vue",
    "Vuetify",
    "TypeScript",
    "JavaScript",
    "Python",
    "PyTorch",
    "flask",
    "C++",
    "Java",
    "Go",
    "Docker",
    "Spring boot",
    "Spring Cloud",
    "Flutter",
    "Dart",
    "Kotlin",
    "Swift",
    "Jenkins",
    "CSS",
    "HTML",
    "MySQL",
    "Redis",
    "MongoDB",
    "MORE...",
  ],
});

const timeline = [
  {
    size: "small",
    color: "pink",
    time: "2018-9",
    title: "进入南四楼",
    detail: "升入南四楼接受通识教育，备战高考",
  },
  {
    size: "small",
    color: "teal-lighten-3",
    time: "2021-6",
    title: "顺利毕业",
    detail: "结束高考副本，顺利从南四楼毕业",
  },
  {
    size: "large",
    color: "pink",
    time: "2021-9",
    title: "升入大山坡男子职业技术学院",
    detail: "进入大山坡男子职业技术学院，开始学习软件工程专业。",
  },
  {
    size: "large",
    color: "teal-lighten-3",
    time: "2021-11",
    title: "加入学生在线",
    detail: "加入学生在线移动开发部，学习Flutter为主的移动开发。",
  },
  {
    size: "small",
    color: "pink",
    time: "2021年11月",
    title: "加入1901",
    detail:
      "加入新媒体工作室1901团队，负责SDU微信视频号、哔哩哔哩的内容产出与运营。",
  },
  {
    size: "small",
    color: "teal-lighten-3",
    time: "2022年1月",
    title: "参与寒假实训",
    detail: "参与学生在线寒假实训，练习Flutter和团队合作。",
  },
  {
    size: "large",
    color: "pink",
    time: "2022年5月",
    title: "担任移动开发部总监",
    detail:
      "接任总监职务，负责移动开发部的日常管理与运营，以及移动开发部的技术选型与团队建设。",
  },
  {
    size: "small",
    color: "teal-lighten-3",
    time: "2022年6月",
    title: "加入实验室",
    detail:
      "进入实验室，开始学习计算机视觉方向的知识，针对ReferingVOS进行研究。",
  },
  {
    size: "small",
    color: "pink",
    time: "2022年11月",
    title: "结束纳新和考核",
    detail: "结束学生在线纳新宣传和考核阶段，迎来一批新的小狗子们。",
  },
];

const myStory = `
Hi？
`;

const goUrl = (url: string) => {
  window.open(url, "_blank");
};

onUpdated(() => {
  const theme = useTheme();
  const timeline: HTMLElement = document.getElementsByClassName(
    "timeline-container"
  )[0] as HTMLElement;
  const skills: HTMLElement = document.getElementById("skills") as HTMLElement;
  const width: number = Number(skills.style.width.split("px")[0]);
  skills.style.width = width - 100 + "px";

  timeline.style.backgroundColor = "rgba(255, 255, 255, 0.7);";
  timeline.style.borderColor = "#c3c3c3";

  skills.style.backgroundColor = "#9e9e9e;";

  if (theme.global.current.value.dark) {
    timeline.style.backgroundColor = "#1e1e1e";
    timeline.style.borderColor = "#1e1e1e";

    skills.style.backgroundColor = "#1e1e1e";
  } else {
    console.log("light");
    timeline.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    timeline.style.borderColor = "#c3c3c3";

    skills.style.backgroundColor = "rgba(255, 255, 255, 0.7);";
  }
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <div>
          <h1>关于我</h1>
          <div></div>
          <h2>{{ info.name }}</h2>
        </div>
      </v-card-title>
      <v-card-subtitle>
        <div>
          <h1></h1>
          <div></div>
          <div
            style="display: flex; width: fit-content; padding: 1vh 1.5vh font-size: 1.1rem;"
            v-for="contact in contacts"
            :key="contact.name"
          >
            <v-btn
              variant="outlined"
              color="primary"
              :icon="!contact.show"
              :rounded="contact.show ? false : true"
              :size="contact.show ? 'medium' : 'small'"
              style="padding;: 0 1vh"
              @click="contact.show = !contact.show"
              @click.ctrl="goUrl(contact.url)"
              @click.meta="goUrl(contact.url)"
            >
              <v-icon>{{ contact.icon }}</v-icon>
              <Transition name="contact">
                <div v-if="contact.show">{{ contact.content }}</div>
              </Transition>
            </v-btn>
          </div>
        </div>
      </v-card-subtitle>
      <v-card-text style="font-size: 1.1rem; margin: 1.5vh 0">
        就读于大山坡男子职业技术学院的大二萌新
      </v-card-text>
    </v-card>
  </v-container>

  <v-container id="skills">
    <v-row justify="center">
      <div v-for="(skill, idx) in info.skills" :key="skill">
        <v-chip
          class="ma-2 chips"
          :color="colors[idx % colors.length]"
          label
          text-color="white"
          >{{ skill }}
        </v-chip>
      </div>
    </v-row>
  </v-container>
  <div style="height: 20px"></div>
  <v-container>
    <div class="timeline-container">
      <v-timeline align="center">
        <v-timeline-item
          v-for="item in timeline"
          :dot-color="item.color"
          :size="item.size"
          v-bind:key="item.title"
        >
          <div class="d-flex">
            <strong class="mr-6">{{ item.time }}</strong>
            <div>
              <strong>{{ item.title }}</strong>
              <div class="text-caption">{{ item.detail }}</div>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <span class="to-be-continued"
        ><div style="width: 7vh"></div>
        TO BE CONTINUED ...</span
      >
    </div>
  </v-container>

  <v-container>
    <v-card>
      <v-card-title class="story-title"> 我的故事 </v-card-title>
      <v-card-subtitle class="quote">
        “我不停奔跑，只为追赶当年被寄予厚望的自己”
      </v-card-subtitle>
      <v-card-text>
        <div class="story">{{ myStory }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.story {
  font-size: 1.1rem;
  text-align: start;
  margin: 1vh 2vw;
  width: 100%;
}
.story-title {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin: 1vh 2vw;
}
.quote {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;

  margin: 1vh 2vw;
}

.to-be-continued {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #9e9e9e;
  margin-top: 1vh;
}

.timeline-container {
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  border: #c3c3c3 1px solid;
  border-radius: 10px;
  box-shadow: #c3c3c3;

  padding: 2vh 4vw;
}

#skills {
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.contact-enter-active {
  transition: opacity 0.5s ease;
}

.contact-enter-from,
.contact-leave-to {
  opacity: 0;
}

/* make .chips elements appear one by one */
.chips {
  animation: chips-fade 0.5s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

@keyframes chips-fade {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.v-card div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1vh 3vh;
}
.v-card h1 {
  display: flex;
  height: fit-content;
  width: fit-content;
  align-self: left;
  /* A more beautiful text style */
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.0075em;
}

.v-card h2 {
  display: flex;
  height: fit-content;
  width: fit-content;
  align-self: right;
  /* A more beautiful text style */
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 0.0075em;
}

.v-card-subtitle {
  padding: 0;
}

.v-card-subtitle h1 {
  display: flex;
  height: fit-content;
  width: fit-content;
  align-self: left;
  font-size: 1rem;
}
</style>
