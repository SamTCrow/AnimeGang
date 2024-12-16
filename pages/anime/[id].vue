<script lang="ts" setup>
const route = useRoute();
const animeId = +route.params.id;
const { data: animeInfo } = await useFetch(`/api/anime/${animeId}`);
const items = [
  {
    key: "overview",
    label: "Overview"
  },
  {
    key: "characters",
    label: "Characters"
  }
];

console.log(animeInfo);
</script>

<template>
  <div v-if="animeInfo" class="mt-4 flex flex-grow flex-col gap-4 sm:flex-row">
    <section class="flex basis-1/3 flex-col gap-4 p-2">
      <div class="text-center">
        <h1 class="text-lg font-bold">
          {{ animeInfo?.animeData.title }}
        </h1>
        <h3 class="text-center text-sm">
          {{ animeInfo.animeData.season?.toUpperCase() }} -
          {{ animeInfo.animeData.year }}
        </h3>
        <h2>{{ animeInfo.animeData.studioID }}</h2>
      </div>
      <div class="flex justify-center gap-4">
        <ULink
          v-for="genre in animeInfo.genres"
          :key="genre.mal_id"
          :to="`/anime/genre/${genre.mal_id}`"
        >
          <UBadge
            :key="genre.mal_id"
            :label="genre.name"
            variant="solid"
            color="gray"
          />
        </ULink>
      </div>
      <NuxtImg :src="animeInfo?.animeData.cover" class="mx-auto w-[75%] px-4" />

      <div class="flex justify-around">
        <UiWatchedButton
          :anime-id="animeId"
          :anime-name="animeInfo?.animeData.title"
          >Watched</UiWatchedButton
        >
        <UiAddToListButton
          :anime-id="animeId"
          :anime-name="animeInfo?.animeData.title"
          >Add to list</UiAddToListButton
        >
      </div>
      <div class="flex justify-between">
        <span>Score: </span> <span>{{ animeInfo.animeData.score }}</span>
      </div>

      <div class="flex justify-between">
        <span class="">Ep: {{ animeInfo.animeData.episodes }}</span>
        <span>{{ animeInfo.animeData.status }}</span>
      </div>
    </section>
    <section class="w-full basis-2/3 p-2">
      <UTabs :items="items">
        <template #item="{ item }">
          <div v-if="item.key === 'overview'" class="flex flex-col gap-4">
            <div class="p-2">
              <h1 class="text-center font-bold">Summary</h1>
              <span class="prose dark:prose-invert mx-auto">{{
                animeInfo.animeData.synopsis
              }}</span>
            </div>
            <ScriptYouTubePlayer
              v-if="animeInfo.animeData.trailer"
              trigger="visible\"
              :video-id="animeInfo.animeData.trailer"
              class="mx-auto"
            />
            <span>qualcosa</span>
          </div>
        </template>
      </UTabs>
    </section>
  </div>
</template>
