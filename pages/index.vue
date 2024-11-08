<script lang="ts" setup>
const { data: topAnime } = await useFetch("/api/top");
</script>

<template>
  <UContainer
    class="flex w-full max-w-[1400px] flex-1 flex-col gap-4 bg-gray-100 py-4 dark:bg-gray-900"
  >
    <section class="">
      <h1>Trending anime</h1>

      <Highlights v-if="topAnime" :highlights="topAnime" />
    </section>
    <section class="">
      <h1>Trending manga</h1>
      <Highlights v-if="topAnime" :highlights="topAnime" />
    </section>
    <section class="">
      <h1>Best Characters</h1>
      <div class="grid">cose</div>
    </section>
  </UContainer>
</template>
