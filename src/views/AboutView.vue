<script setup lang="ts">
import { VContainer, VRow, VCol, VSpacer, VCard } from "vuetify/components";
import { onMounted, reactive } from "vue";

const colors = ["cyan", "pink", "purple", "indigo", "blue", "teal", "green"];

const info = reactive({
  name: "Yi",
  introduction: "I am a student.",
  skills: ["Vue", "Vuetify", "TypeScript", "JavaScript"],
});

onMounted(() => {});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <div>
              <h1 class="display-1">About me</h1>
              <div></div>
              <h2 class="display-2">{{ info.name }}</h2>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <v-container v-for="(skill, idx) in info.skills" :key="skill">
              <v-chip
                class="ma-2"
                :color="colors[idx % colors.length]"
                label
                text-color="white"
                >{{ skill }}</v-chip
              >
            </v-container>
          </v-card-subtitle>
          <v-card-text>
            <p>
              {{ info.introduction }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
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
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
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
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 0.0075em;
}
</style>
