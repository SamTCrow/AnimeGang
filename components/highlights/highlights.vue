<script lang="ts" setup>
import type { highlightCard } from "~/types/types";

type props = {
  highlights: Array<highlightCard>;
};

const { highlights } = defineProps<props>();
</script>

<template>
  <div class="">
    <UCarousel
      v-slot="{ item }"
      :items="highlights"
      :ui="{ item: 'basis-1/2 sm:basis-1/3 lg:basis-1/6 p-2' }"
      :prev-button="{
        color: 'gray',
        icon: 'i-heroicons-arrow-left-20-solid',
        class: '-start-12 hidden sm:flex'
      }"
      :next-button="{
        color: 'gray',
        icon: 'i-heroicons-arrow-right-20-solid',
        class: '-end-12 hidden sm:flex'
      }"
      arrows
    >
      <MiniCard :card="item" />
    </UCarousel>
  </div>
</template>
