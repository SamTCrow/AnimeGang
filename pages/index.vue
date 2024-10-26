<script lang="ts" setup>
const topAnime = [
  {
    cover: "https://pad.mymovies.it/filmclub/2021/11/242/locandina.jpg",
    title: "One Piece",
    synopsis: "Pirati del cazzo",
    studio: "Roger",
    status: "Complete",
    episodes: "24"
  },
  {
    cover: "https://pad.mymovies.it/filmclub/2021/11/242/locandina.jpg",
    title: "sto one piece2",
    synopsis: "Pirati del cazzo",
    studio: "Roger",
    status: "Complete",
    episodes: "24"
  },
  {
    cover: "https://pad.mymovies.it/filmclub/2021/11/242/locandina.jpg",
    title: "One Piece3",
    synopsis: "Pirati del cazzo",
    studio: "Roger",
    status: "Complete",
    episodes: "24"
  },
  {
    cover: "https://pad.mymovies.it/filmclub/2021/11/242/locandina.jpg",
    title: "One Piece4",
    synopsis: "Pirati del cazzo",
    studio: "Roger",
    status: "Complete",
    episodes: "24"
  }
];
</script>

<template>
  <UContainer
    class="flex w-full max-w-[1400px] flex-1 flex-col gap-4 bg-gray-100 py-4 dark:bg-gray-900"
  >
    <section class="bg-red-900">
      <h1>Trending anime</h1>
      <div class="grid grid-cols-3 justify-items-center gap-4 p-4">
        <Highlights :highlights="topAnime" />
      </div>
    </section>
    <section class="h-64 bg-red-900">
      <h1>Trending manga</h1>
      <div class="grid">cose</div>
    </section>
    <section class="h-64 bg-red-900">
      <h1>Best Characters</h1>
      <div class="grid">cose</div>
    </section>
  </UContainer>
</template>
