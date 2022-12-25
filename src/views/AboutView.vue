<script setup lang="ts">
import { VContainer, VRow, VCard, VIcon, VBtn } from "vuetify/components";
import { reactive } from "vue";

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
    "C++",
    "Java",
    "Go",
  ],
});

const goUrl = (url: string) => {
  window.open(url, "_blank");
};
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
          <h1>联系方式</h1>
          <div></div>
          <div
            style="display: flex; width: fit-content; padding: 1vh 1vh"
            v-for="contact in contacts"
            :key="contact.name"
          >
            <v-btn
              variant="outlined"
              color="primary"
              :icon="!contact.show"
              :rounded="contact.show ? false : true"
              :size="contact.show ? 'medium' : 'small'"
              @click="contact.show = !contact.show"
              @click.ctrl="goUrl(contact.url)"
            >
              <v-icon>{{ contact.icon }}</v-icon>
              <Transition name="contact">
                <div v-if="contact.show">{{ contact.content }}</div>
              </Transition>
            </v-btn>
          </div>
        </div>
      </v-card-subtitle>
    </v-card>
  </v-container>
  <div style="height: 800px"></div>
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
  <div style="height: 400px"></div>
</template>

<style scoped>
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
