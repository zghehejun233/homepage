<script setup lang="ts">
import { VContainer, VCol, VRow, VCard } from "vuetify/components";
defineProps<{ quote: { text: string; from: string } }>();
</script>

<!-- <template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="quote">
          <h1>{{ quote.text }}</h1>
          <h3>{{ quote.from }}</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> -->
<template>
  <div class="quote">
    <h1>{{ quote.text }}</h1>
    <h3>{{ quote.from }}</h3>
  </div>
</template>

<style scoped>
.quote {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.quote h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}

.quote h3 {
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
}
</style>
