<script setup lang="ts">
import highlight from "highlight.js";
import clipboard from "clipboard";
import { VToolbar, VContainer } from "vuetify/components";
import { ref } from "vue";
const props = defineProps({
  language: {
    type: String,
    default: "javascript",
  },
  code: {
    type: String,
    default: "",
  },
  showCode: {
    type: Boolean,
    default: false,
  },
});

const showCode = ref(props.showCode);

const vHighlight = {
  mounted: (el: HTMLElement) => {
    const blocks = el.querySelectorAll("pre code") as unknown as HTMLElement[];
    blocks.forEach((block) => {
      highlight.highlightBlock(block);
    });
  },
};

const clipMessage = ref("复制代码");
const cliped = ref(false);

const handleCopyCode = (text: string, event: Event) => {
  const clip = new clipboard(event.target as Element, {
    text: () => text,
  });
  clip.on("success", () => {
    console.log("复制成功");
    clipMessage.value = "复制成功";
  });
  clip.on("error", () => {
    console.log("复制失败");
    clipMessage.value = "复制失败";
  });

  cliped.value = true;
  setTimeout(() => {
    cliped.value = false;
    clipMessage.value = "复制代码";
  }, 1000);
};
</script>
<template>
  <v-container>
    <v-toolbar density="compact">
      <v-toolbar-title>{{ language }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip v-model="cliped" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @click="handleCopyCode(code, $event)"
            id="clip"
            icon="mdi-clipboard"
          >
          </v-btn>
        </template>
        <span>{{ clipMessage }}</span>
      </v-tooltip>

      <v-btn
        @click="showCode = !showCode"
        :icon="showCode ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
      </v-btn>
    </v-toolbar>

    <div class="code-palce-container" v-if="showCode">
      <div class="code-box" v-highlight>
        <pre>
        <code :class="language">{{ code }}</code>
    </pre>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.code-palce-container {
  padding: 4px;
}

.code-box {
  padding: 10px;
  height: fit-content;
}

.pre {
  height: fit-content;
}
</style>
