<script lang="ts" setup>
const { data: topAnime } = await useFetch("/api/top/anime");
const { data: topManga } = await useFetch("/api/top/manga");
const { data: topCharacters } = await useFetch("/api/top/characters");
const { data: seasonNow } = await useFetch("/api/season/now");

</script>

<template>
  <UContainer
    class="flex w-full max-w-[1400px] flex-1 flex-col gap-4 bg-gray-100 py-4 dark:bg-gray-900"
  >
    <section class="">
      <h1>Airing Now</h1>
      <Highlights v-if="seasonNow" :highlights="seasonNow" />
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
