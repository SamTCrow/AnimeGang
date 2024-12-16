<script lang="ts" setup>
const { animeId, animeName } = defineProps<{
  animeId: number;
  animeName: string;
}>();
const { user, loggedIn } = useUserSession();
const { watchedAnimes, fetchWatchedAnimes } = useWatchedAnimes();
const userId = user.value?.userId;
const watched = computed(() => {
  return watchedAnimes.value.some((anime) => anime.animeId === animeId);
});

const handleSubmit = async () => {
  if (userId) {
    if (!watched.value) {
      try {
        await $fetch("/api/user/addWatchedAnime", {
          method: "POST",
          body: {
            userId,
            animeId,
            animeName
          }
        });
        await fetchWatchedAnimes(userId);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await $fetch("/api/user/deleteWatchedAnime", {
          method: "POST",
          body: {
            userId,
            animeId
          }
        });
        await fetchWatchedAnimes(userId);
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    console.log("no user id");
  }
};
</script>

<template>
  <UButton
    :color="watched ? 'emerald' : 'red'"
    :disabled="!loggedIn"
    @click="handleSubmit"
    ><slot
  /></UButton>
</template>
