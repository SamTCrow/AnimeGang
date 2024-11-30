<script lang="ts" setup>
const { data: topAnime } = await useFetch("/api/top/anime", { lazy: true });
const { data: topManga } = await useFetch("/api/top/manga", { lazy: true });
const { data: topCharacters } = await useFetch("/api/top/characters", {
  lazy: true
});
const { data: season } = await useFetch("/api/season/now", { lazy: true });
</script>

<template>
  <UContainer
    class="flex w-full max-w-[1400px] flex-1 flex-col gap-4 bg-gray-100 py-4 dark:bg-gray-900"
  >
    <section v-if="season">
      <h1>{{ season?.season }}</h1>
      <Highlights :highlights="season.response" />
    </section>
    <section class="">
      <h1>Trending anime</h1>

      <Highlights v-if="topAnime" :highlights="topAnime" />
    </section>
    <section class="">
      <h1>Trending manga</h1>
      <Highlights v-if="topManga" :highlights="topManga" />
    </section>
    <section class="">
      <h1>Best Characters</h1>
      <Highlights v-if="topCharacters" :highlights="topCharacters" />
    </section>
  </UContainer>
</template>
