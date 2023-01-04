<script setup lang="ts">
import { VContainer, VRow, VCard, VIcon, VBtn } from "vuetify/components";
import { reactive, onUpdated } from "vue";
import { useTheme } from "vuetify";
import { contactsInfo, basicInfo, timelineInfo, myStory } from "@/api/about";

const contacts = reactive(contactsInfo);
const colors = ["cyan", "pink", "purple", "indigo", "blue", "teal", "green"];
const info = reactive(basicInfo);
const timeline = reactive(timelineInfo);

const goUrl = (url: string) => {
  window.open(url, "_blank");
};

const darkAdaptation = () => {
  const theme = useTheme();
  const timeline: HTMLElement = document.getElementsByClassName(
    "timeline-container"
  )[0] as HTMLElement;
  const skills: HTMLElement = document.getElementsByClassName(
    "skills"
  )[0] as HTMLElement;

  timeline.style.backgroundColor = "rgba(255, 255, 255, 0.7);";
  // timeline.style.borderColor = "#c3c3c3";
  skills.style.backgroundColor = "rgba(255, 255, 255, 0.7);";

  if (theme.global.current.value.dark) {
    timeline.style.backgroundColor = "#1e1e1e";
    // timeline.style.borderColor = "#1e1e1e";

    skills.style.background = "#1e1e1e";
    // skills.style.borderColor = "#1e1e1e";
  } else {
    timeline.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    // timeline.style.borderColor = "#1e1e1e";

    skills.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    // skills.style.borderColor = "#1e1e1e";
  }
};

onUpdated(() => {
  darkAdaptation();
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
            style="
              display: flex;
              width: fit-content;
              padding: 1vh 0;
              margin: 0 0.5vw;
              font-size: 0.8rem;
            "
            v-for="contact in contacts"
            :key="contact.name"
          >
            <v-btn
              variant="outlined"
              color="primary"
              :icon="!contact.show"
              :rounded="contact.show ? false : true"
              :size="contact.show ? 'medium' : 'small'"
              style="padding: 0 1vh"
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

  <v-container>
    <div class="skills">
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
    </div>
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

  /* border: #c3c3c3 1px solid; */
  border-radius: 10px;
  box-shadow: #c3c3c3;

  padding: 2vh 4vw;
}

.skills {
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  /* border: #c3c3c3 1px solid; */
  border-radius: 10px;
  box-shadow: #c3c3c3;
  padding: 4vh 2vw;
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
