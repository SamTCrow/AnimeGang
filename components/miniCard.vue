<script lang="ts" setup>
import type { highlightCard } from "~/types/types";
import BigCard from "./BigCard.vue";

type props = {
  card: highlightCard;
};

const { card } = defineProps<props>();
</script>

<template>
  <UPopover mode="hover" :popper="{ placement: 'right' }">
    <div class="flex flex-col gap-2">
      <NuxtImg :src="card.cover" class="mx-auto h-64 rounded-sm" />
      <span>{{ card.title }}</span>
    </div>
    <template #panel>
      <BigCard :card="card" />
    </template>
  </UPopover>
</template>
