<script lang="ts" setup>
const { data: topAnime } = await useFetch("/api/top/anime", { lazy: true });
const { data: season } = await useFetch("/api/season/now", { lazy: true });
</script>

<template>
  <UContainer
    class="flex w-full max-w-[1400px] flex-1 flex-col gap-6 bg-gray-100 py-4 dark:bg-gray-900"
  >
    <section v-if="season">
      <h1 class="bg-gray bg-opacity-5 text-lg">
        {{ season?.season.toUpperCase() }}
      </h1>
      <Highlights :highlights="season.response" />
    </section>
    <section v-if="topAnime">
      <h1 class="bg-gray bg-opacity-5 text-lg">Trending anime</h1>
      <Highlights :highlights="topAnime.data" />
    </section>
  </UContainer>
</template>
