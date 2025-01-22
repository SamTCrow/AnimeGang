<script lang="ts" setup>
const { likedChar } = useLikedChar();
const hydrated = ref(false);
const userLikedChars = computed(() => {
  return likedChar.value.map((char) => ({
    key: char.characterId,
    name: char.characterName,
    animeId: char.characterAnimeId,
    animeName: char.characterAnimeName
  }));
});
const columns = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "animeName",
    label: "Anime"
  },
  {
    key: "like",
    label: ""
  }
];
onMounted(() => (hydrated.value = true));
</script>

<template>
  <AuthState v-slot="{ loggedIn }">
    <UTable
      v-if="loggedIn && hydrated"
      :columns="columns"
      :rows="userLikedChars"
      class="p-4"
    >
      <template #animeName-data="{ row }">
        <ULink :to="/anime/ + row.animeId" class="hover:opacity-85">{{
          row.animeName
        }}</ULink>
      </template>
      <template #like-data="{ row }">
        <UiLikeButton
          :character-id="row.key"
          :character-name="row.name"
          :anime-id="row.animeId"
          :anime-name="row.animeName"
        />
      </template>
    </UTable>
  </AuthState>
</template>
