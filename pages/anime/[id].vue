<script lang="ts" setup>
const { fetchUserScores, userScores } = useUserScores();
const route = useRoute();
const animeId = +route.params.id;
const { data: animeInfo } = await useFetch(`/api/anime/${animeId}`);
const { user } = useUserSession();
const hydrated = ref(false);
const score = computed({
  get: () =>
    userScores.value.find((score) => score.animeID === animeId)?.score ?? 1,

  set: async (newScore) => {
    if (!user.value?.userId) return null;
    if (!newScore) return null;

    userScores.value.push({
      score: newScore,
      userID: user.value.userId,
      animeID: animeId
    });

    await $fetch("/api/user/score/addScore", {
      method: "POST",
      body: {
        userId: user.value.userId,
        animeId: animeId,
        score: newScore
      }
    });
    await fetchUserScores(user.value.userId);
    return newScore;
  }
});
onMounted(() => {
  hydrated.value = true;
});
const columns = [
  {
    key: "image",
    label: "Image"
  },
  {
    key: "name",
    label: "Name"
  },
  {
    key: "role",
    label: "Role"
  },
  {
    key: "favorites",
    label: "Like"
  }
];
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
const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return animeInfo.value?.characters;
  }

  return animeInfo.value?.characters.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>

<template>
  <div v-if="animeInfo" class="mt-4 flex flex-grow flex-col gap-4 sm:flex-row">
    <section class="flex basis-1/3 flex-col gap-6 p-2">
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

      <AuthState v-slot="{ loggedIn }">
        <div v-if="loggedIn && hydrated" class="flex flex-col gap-6">
          <div v-if="loggedIn && hydrated" class="flex justify-between">
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
          <div v-if="loggedIn && hydrated">
            <URange v-model="score" :min="1" :max="10" />
            <div class="mx-auto flex w-[75%] justify-between text-center">
              <span>Your Score: </span>
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
      </AuthState>
      <div class="mx-auto w-[75%]">
        <div class="flex flex-col items-center gap-2">
          <span>{{ animeInfo.animeData.status }}</span>
          <div class="flex w-full justify-between">
            <span>Score:</span>
            <span class="font-bold"> {{ animeInfo.animeData.score }}</span>
          </div>

          <div class="flex w-full justify-between">
            <span class="">Episodes: </span>
            <span class="font-bold">{{ animeInfo.animeData.episodes }}</span>
          </div>
        </div>
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
          </div>
          <div v-if="item.key === 'characters'">
            <div
              class="flex border-b border-gray-200 px-3 py-3.5 dark:border-gray-700"
            >
              <UInput v-model="q" placeholder="Filter characters..." />
            </div>
            <UTable
              :rows="filteredRows"
              :columns="columns"
              class="overflow-auto"
            >
              <template #image-data="{ row }">
                <NuxtImg :src="row.image" class="w-32" />
              </template>
              <template #favorites-data="{ row }">
                <UiLikeButton
                  v-if="hydrated"
                  :character-id="row.id"
                  :character-name="row.name"
                />
              </template>
            </UTable>
          </div>
        </template>
      </UTabs>
    </section>
  </div>
</template>
