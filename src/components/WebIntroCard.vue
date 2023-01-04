<script setup lang="ts">
import { reactive, onMounted } from "vue";
const props = defineProps<{
  title: string;
  info: Info;
}>();

interface Info {
  singleLineDescription?: string;
  detail?: string[];
  show: boolean;
}

const content = reactive(props.info);
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ content.singleLineDescription }}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" variant="text"> MORE </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :icon="content.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="content.show = !content.show"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card-text v-show="content.show">
          <!-- <CodeBlock :code="code" language="javascript" :show-code="true" /> -->

          <div v-for="item in content.detail" :key="item">
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
</template>
