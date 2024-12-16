<script lang="ts" setup>
import type { highlightCard } from "~/types/types";
import BigCard from "./BigCard.vue";

type props = {
  card: highlightCard;
};

const { card } = defineProps<props>();
</script>

<template>
  <div>
    <span class="my-2 line-clamp-1 overflow-hidden text-center text-sm">{{
      card.title
    }}</span>

    <UPopover mode="hover" :popper="{ placement: 'auto' }">
      <ULink :to="`/anime/${card.id}`" class="flex flex-col">
        <NuxtImg
          :src="card.cover"
          class="mx-auto aspect-[9/13] w-64 overflow-hidden rounded-lg object-contain"
        />
      </ULink>

      <template #panel>
        <BigCard :card="card" />
      </template>
    </UPopover>

    <AuthState v-slot="{ loggedIn }">
      <div v-if="loggedIn" class="flex justify-between">
        <UiWatchedButton :anime-id="card.id" :anime-name="card.title"
          >Watched</UiWatchedButton
        >
        <UiAddToListButton :anime-id="card.id" :anime-name="card.title"
          >Add to list</UiAddToListButton
        >
      </div>
    </AuthState>
  </div>
</template>
