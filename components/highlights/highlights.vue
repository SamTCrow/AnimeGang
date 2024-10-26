<script lang="ts" setup>
import type { highlightCards } from "~/types/types";

type props = {
  highlights: Array<highlightCards>;
};

const { highlights } = defineProps<props>();
</script>

<template>
  <AnimeCard v-for="card in highlights" :key="card.title" :card="card" />
</template>
