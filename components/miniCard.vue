<script lang="ts" setup>
import type { highlightCard } from "~/types/types";
import BigCard from "./BigCard.vue";

type props = {
  card: highlightCard;
};

const { card } = defineProps<props>();
</script>

<template>
  <UPopover mode="hover" :popper="{ placement: 'right', adaptive: true }">
    <ULink :to="`/anime/${card.id}`" class="flex flex-col">
      <NuxtImg
        :src="card.cover"
        class="mx-auto aspect-[9/13] w-64 overflow-hidden rounded-lg object-contain"
      />

      <UDivider class="my-2" />
      <span class="line-clamp-1 overflow-hidden text-center text-sm">{{
        card.title
      }}</span>
    </ULink>

    <template #panel>
      <BigCard :card="card" />
    </template>
  </UPopover>
</template>
