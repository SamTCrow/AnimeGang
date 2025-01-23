<script lang="ts" setup>
import type { highlightCard } from "~/types/types";

type props = {
  card: highlightCard;
};

const { card } = defineProps<props>();
</script>

<template>
  <UCard
    class="max-w-[600px]"
    :ui="{
      background: 'opacity-90 bg-opacity-90 dark:bg-opacity-90',
      strategy: 'override'
    }"
  >
    <template #header>
      <div class="flex flex-col">
        <span class="text-md">{{ card.title }}</span>
        <span class="text-sm">{{ card.status }}</span>
      </div>
    </template>
    <div class="flex gap-8">
      <span class="line-clamp-6 text-sm">{{ card.synopsis }}</span>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <UBadge
          v-for="genres in card.genres"
          :key="genres.mal_id + card.id"
          variant="solid"
          color="gray"
        >
          <ULink
            :to="`/anime/genre/${genres.mal_id}`"
            class="hover:opacity-90"
            >{{ genres.name }}</ULink
          >
        </UBadge>
      </div>
    </template>
  </UCard>
</template>
