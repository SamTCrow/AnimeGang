<script lang="ts" setup>
import type { highlightCards } from "~/types/types";

type props = {
  highlights: Array<highlightCards>;
};

const { highlights } = defineProps<props>();
</script>

<template>
  <div>
    <UCarousel
      v-slot="{ item }"
      :items="highlights"
      :ui="{
        container: 'sm:hidden',
        item: 'w-full w-64'
      }"
    >
      <MiniCard :card="item" />
    </UCarousel>
    <div
      class="hidden justify-items-center gap-4 p-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
    >
      <MiniCard v-for="card in highlights" :key="card.id" :card="card" />
    </div>
  </div>
</template>
