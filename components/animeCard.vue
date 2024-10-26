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
    <div class="grid grid-cols-2 gap-4">
      <img :src="card.cover" />
      <div class="flex flex-col justify-between">
        <p>{{ card.synopsis }}</p>
        <div class="flex justify-between">
          <span>{{ card.studio }}</span>
          <span class="text-right">{{ card.status }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
