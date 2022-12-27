<script setup lang="ts">
import { RouterLink } from "vue-router";
import { VDivider, VImg } from "vuetify/components";
import { reactive, onMounted } from "vue";

interface Brief {
  singleLineDescription?: string;
  detail?: string[];
  show: boolean;
}
const brief: Brief = reactive({
  show: false,
});

const duty = reactive({
  singleLineDescription: "emmm",
  detail: [""],
});
const backend = reactive({
  singleLineDescription: "emmm",
  detail: "xxxx",
});

const deploy = reactive({
  singleLineDescription: "emmm",
  detail: "xxxx",
});

const loadFile = async () => {
  fetch("/web.json")
    .then((res) => res.json())
    .then((res) => {
      const _brief = res.brief;
      const _duty = res.duty;

      brief.singleLineDescription = _brief.un;
      brief.detail = _brief.detail;

      duty.singleLineDescription = _duty.un;
      duty.detail = _duty.detail;
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
      <v-col cols="8">
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
              一个前端基于<RouterLink class="link" to="/about/#skills"
                >React</RouterLink
              >, 后端使用Spring Cloud Alibaba构建的学生管理系统
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>
            <div>
              <h1>运行状况</h1>
            </div>
          </v-card-title>
          <v-card-text>
            <p>{{ brief.detail }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-divider></v-divider>
  <v-container>
    <v-card>
      <v-card-title>项目简介</v-card-title>
      <v-card-subtitle>{{ brief.singleLineDescription }}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" variant="text"> MORE </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :icon="brief.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="brief.show = !brief.show"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card-text v-show="brief.show">
          <div v-for="item in brief.detail" :key="item">
            <v-container v-if="item.startsWith('http')">
              <v-row align-content="center" justify="center">
                <v-img
                  lazy-src="https://picsum.photos/id/11/100/60"
                  max-width="800"
                  :src="item"
                  aspect-ratio="1.5"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        indeterminate
                        color="grey-lighten-4"
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-row>
            </v-container>
            <p v-else>{{ item }}</p>
          </div>
        </v-card-text>
      </v-expand-transition>
    </v-card>
  </v-container>
  <v-container>
    <v-card>
      <v-card-title>职责</v-card-title>
      <v-card-subtitle>{{ brief.singleLineDescription }}</v-card-subtitle>
      <v-card-text>{{ brief.detail }}</v-card-text>
    </v-card>
  </v-container>
  <v-container>
    <v-card>
      <v-card-title>后端技术</v-card-title>
      <v-card-subtitle>{{ backend.singleLineDescription }}</v-card-subtitle>
      <v-card-text>{{ brief.detail }}</v-card-text>
    </v-card>
  </v-container>
  <v-container>
    <v-card>
      <v-card-title>运行维护</v-card-title>
      <v-card-subtitle>{{ deploy.singleLineDescription }}</v-card-subtitle>
      <v-card-text>{{ brief.detail }}</v-card-text>
    </v-card>
  </v-container>
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
