<script lang="ts" setup>
import type { highlightCard } from "~/types/types";
import BigCard from "./BigCard.vue";

type props = {
  card: highlightCard;
};

const { card } = defineProps<props>();
</script>
	
<template>
  <UPopover
    mode="hover"
    :popper="{ placement: 'right', adaptive: true }"
    class="m-2 flex"
  >		
    <ULink :to="`/anime/${card.id}`" class="flex flex-grow flex-col">
      <div class="flex-grow">
        <NuxtImg :src="card.cover" class="mx-auto w-full rounded-sm" />
      </div>

      <div class="mt-2 line-clamp-2 h-[50px] overflow-hidden text-center">
        <UDivider class="mb-2" />
        <span class="text-sm">{{ card.title }}</span>
      </div>
    </ULink>
    <template #panel>
      <BigCard :card="card" />
    </template>
  </UPopover>
</template>
