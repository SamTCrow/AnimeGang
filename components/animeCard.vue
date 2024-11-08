<script lang="ts" setup>
import type { highlightCards } from "~/types/types";

type props = {
  card: highlightCards;
};

const { card } = defineProps<props>();
</script>

<template>
  <UCard class="max-w-[400px]">
    <template #header>
      <p>{{ card.title }}</p>
    </template>
    <div class="flex flex-1 flex-col gap-4">
      <UContainer><NuxtImg :src="card.cover" class="h-64 w-full" /></UContainer>
      <div class="flex flex-col justify-between">
        <p class="line-clamp-6 text-sm">{{ card.synopsis }}</p>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <span>{{ card.studio }}</span>
        <span class="text-right">{{ card.status }}</span>
      </div>
    </template>
  </UCard>
</template>
