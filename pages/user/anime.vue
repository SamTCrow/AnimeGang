<script lang="ts" setup>
const { watchedAnimes } = useWatchedAnimes();
const { userScores } = useUserScores();
const hydrated = ref(false);
const userAnimes = computed(() => {
  return watchedAnimes.value.map((anime) => ({
    key: anime.animeId,
    name: anime.animeName,
    score:
      userScores.value.find((score) => score.animeID === anime.animeId)
        ?.score ?? 0
  }));
});

const columns = [
  {
    key: "name",
    label: "Title",
    sortable: true
  },
  {
    key: "score",
    label: "Score",
    sortable: true,
    class: "text-center",
    rowClass: "text-center"
  },
  {
    key: "actions",
    label: ""
  }
];

onMounted(() => {
  hydrated.value = true;
});
</script>

<template>
  <AuthState v-slot="{ loggedIn }">
    <UTable
      v-if="loggedIn && hydrated"
      :columns="columns"
      :rows="userAnimes"
      class="p-4"
    >
      <template #name-data="{ row }">
        <ULink :to="/anime/ + row.key" class="hover:opacity-85">{{
          row.name
        }}</ULink>
      </template>
      <template #actions-data="{ row }">
        <div class="flex justify-center space-x-4">
          <UiSetScore :anime-id="row.key" />
          <UiAddToListButton :anime-id="row.key" :anime-name="row.name"
            >List</UiAddToListButton
          >
        </div>
      </template>
    </UTable>
    <div v-else>
      <UButton
        loading
        disabled
        color="gray"
        variant="ghost"
        label="Loading..."
        size="xl"
      />
    </div>
  </AuthState>
</template>
