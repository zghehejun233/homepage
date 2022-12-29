<script setup lang="ts">
import { VContainer, VRow, VCol, VDivider } from "vuetify/components";
import { reactive, onMounted } from "vue";

const song = reactive({
  title: "奔跑在孤傲的路上",
  meta: {
    singer: "旅行团",
    album: "奔跑在孤傲的路上",
    desciption: "",
    composer: "旅行团",
    lyricist: "旅行团",
    arranger: "阿荣",
    bpm: 120,
    key: "C",
    beat: "4/4",
  },
  key: "C",
  currentMode: "",
  sentences: [
    { stamp: "主歌A" },
    { chords: ["C", "C"], lyric: "太阳走在天上^我们走在路上" },
    { chords: ["Am", "Am"], lyric: "走在各自走的方向^" },
    { chords: ["C", "C"], lyric: "去不到的远方，^呆不住的地方" },
    { chords: ["Am", "Am"], lyric: "相遇在未知的路上^" },
    {
      chords: [".", "F", "F", "G"],
      lyric: "你^要去哪儿，^你知道吗为^此不计代价",
    },
    { chords: [".", "F", "F", "G"], lyric: "带^着所有还^是放下去^寻找答案吧" },
    { stamp: "副歌" },
    {
      chords: [".", "C", "Am"],
      lyric: "我奔跑在我^孤傲的路上，使然看不见^终点和希望",
    },
    { chords: [".", "F"], lyric: "有太多^火焰冷却我的理想" },
    { chords: [".", "C", "G"], lyric: "我依然^燃烧我仍在^信仰" },
    {
      chords: [".", "C", "Am"],
      lyric: "说什么^冰山一角，说什么^兵败如山倒",
    },
    { chords: [".", "F"], lyric: "就算^我把整个世界给输掉" },
    { chords: [".", "C", "G"], lyric: "也^希望你能看^到" },
  ],
});
</script>
<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title class="song-info">
            <div class="song-title">
              {{ song.title }}/
              <div class="singer">{{ song.meta.singer }}</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-container class="lyric-container">
              <div v-for="sentence in song.sentences" :key="sentence.lyric">
                <div v-if="sentence.stamp != undefined" class="song-part">
                  {{ sentence.stamp }}
                </div>
                <v-row v-else style="margin: 0 1.5vh">
                  <div
                    class="token-container"
                    v-for="(lyric, idx) in sentence.lyric.split('^')"
                    :key="lyric"
                  >
                    <div class="chord">
                      {{ sentence.chords[idx] }}
                    </div>
                    <div class="lyric">
                      {{ lyric }}
                    </div>
                  </div>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title class="song-info"> 歌曲信息</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12"> 专辑：《{{ song.meta.album }}》 </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="6"> 唱： {{ song.meta.singer }} </v-col>
              <v-col cols="6"> 作词：{{ song.meta.lyricist }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6">作曲：{{ song.meta.composer }}</v-col>
              <v-col cols="6"> 编曲：{{ song.meta.arranger }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6"> BPM：{{ song.meta.bpm }}</v-col>
              <v-col cols="6"> 节拍：{{ song.meta.beat }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <div style="height: 2rem"></div>
        <v-card>
          <v-card-title class="song-info"> 调式</v-card-title>
          <v-card-text>
            <v-row>
              <V-col cols="12">
                原调：{{ song.meta.key }} ｜ 当前调式：{{ song.key }}
              </V-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.song-info {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.song-title {
  display: flex;
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
  align-items: baseline;
}

.singer {
  display: flex;
  font-size: 1.2rem;
  font-weight: 500;
  color: #424242;
}

.song-mode {
  display: flex;
  font-size: 1.2rem;
  font-weight: 400;
  color: #424242;
}

.lyric-container {
  display: flex;
  padding: 2vh 3vh;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.token-container {
  height: fit-content;
  margin: 2.5vh 0;
}

.song-part {
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  color: #424242;
  margin-bottom: 1.5vh;
  padding: 0.2em;
}

.chord {
  color: #424242;
  font-size: 1.2rem;
  margin-bottom: 0.2vh;
  padding-left: 0.2em;
}

.lyric {
  display: inline-block;
  position: relative;
  bottom: 0;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.2em;
}
</style>
