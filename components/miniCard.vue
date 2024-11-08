<script lang="ts" setup>
import type { highlightCards } from "~/types/types";

type props = {
  card: highlightCards;
};

const { card } = defineProps<props>();
</script>

<template>
  <div>
    <NuxtImg :src="card.cover" class="h-64" />
  </div>
</template>
