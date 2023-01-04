<script setup lang="ts">
import { VDivider } from "vuetify/components";
import { reactive, onMounted } from "vue";
import WebIntroCard from "@/components/WebIntroCard.vue";

interface Info {
  singleLineDescription?: string;
  detail?: string[];
  show: boolean;
}

const brief: Info = reactive({
  show: false,
});

const duty: Info = reactive({
  show: false,
});

const backend: Info = reactive({
  show: false,
});

const deploy: Info = reactive({
  show: false,
});

const loadFile = async () => {
  fetch("/web.json")
    .then((res) => res.json())
    .then((res) => {
      const _brief = res.brief;
      const _duty = res.duty;
      const _backend = res.backend;
      const _deploy = res.deploy;

      brief.singleLineDescription = _brief.un;
      brief.detail = _brief.detail;

      duty.singleLineDescription = _duty.un;
      duty.detail = _duty.detail;

      backend.singleLineDescription = _backend.un;
      backend.detail = _backend.detail;

      deploy.singleLineDescription = _deploy.un;
      deploy.detail = _deploy.detail;
    });
};
onMounted(() => {
  loadFile();
});
</script>
<template>
  <v-container>
    <v-row justify="center" align-content="center" align="center">
      <!-- 介绍项目 -->
      <v-col cols="10">
        <v-card>
          <v-card-title>
            <div>
              <h1>Capoo</h1>
              <div></div>
              <h2>SDU 软件学院 Web 课程作业</h2>
            </div>
          </v-card-title>
          <v-card-text>
            <p>
              一个前端基于React, 后端使用Spring Cloud Alibaba构建的学生管理系统
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-divider inset></v-divider>
  <web-intro-card :info="brief" title="简介"></web-intro-card>
  <web-intro-card :info="duty" title="我的职责"></web-intro-card>
  <WebIntroCard :info="backend" title="后端技术"></WebIntroCard>
  <web-intro-card :info="deploy" title="运行维护"></web-intro-card>
</template>
<style scope>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.v-card {
  margin: 1vh 0;
  padding: 2vh 2vw;
  border-radius: 1vh;
  box-shadow: 0 0 0.5vh 0.1vh rgba(0, 0, 0, 0.2);
}

.v-card-text p {
  text-indent: 2em;
}

.v-card-subtitle {
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 1vh;
}

.v-card-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.v-card-title h1 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1vh;
}

.v-card-title h2 {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2vh;
}

.v-card-text p {
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.5;
}

.link {
  text-decoration: none;
  font-weight: 500;
  font-style: sans-serif;
  margin: 0 0.5vh;
}
</style>
