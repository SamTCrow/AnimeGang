<script lang="ts" setup>
const { animeId } = defineProps<{ animeId: number }>();
const { user } = useUserSession();
const { watchedAnimes, fetchWatchedAnimes } = useWatchedAnimes();
const userId = user.value?.userId;

const watched = watchedAnimes.value.some((anime) => anime.animeId === animeId);

const handleSubmit = async () => {
  if (!watched && userId) {
    try {
      await $fetch("/api/user/addWatchedAnime", {
        method: "POST",
        body: {
          userId,
          animeId
        }
      });
      fetchWatchedAnimes(userId);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await $fetch("/api/user/addWatchedAnime", {
        method: "POST",
        body: {
          userId,
          animeId
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<template>
  <UButton @submit.prevent="handleSubmit"><slot /></UButton>
</template>
