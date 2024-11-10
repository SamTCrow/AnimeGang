<script lang="ts" setup>
import type { highlightCard } from "~/types/types";

type props = {
  highlights: Array<highlightCard>;
};

const { highlights } = defineProps<props>();
</script>

<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-center gap-4 p-4 md:grid-cols-3 lg:grid-cols-6"
    >
      <MiniCard v-for="card in highlights" :key="card.id" :card="card" />
    </div>
  </div>
</template>
