<script lang="ts" setup>
import type { highlightCard } from "~/types/types";

type props = {
  card: highlightCard;
};

const { card } = defineProps<props>();
</script>

<template>
  <UCard class="max-w-[800px]">
    <template #header>
      <div class="flex justify-between">
        <span>{{ card.title }}</span>
        <span>{{ card.episodes }}</span>
      </div>
    </template>
    <div class="flex gap-8">
      <span class="text-sm">{{ card.synopsis }}</span>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <span class="text-right">{{ card.status }}</span>
      </div>
    </template>
  </UCard>
</template>
