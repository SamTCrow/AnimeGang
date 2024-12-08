<script lang="ts" setup>
const { animeId } = defineProps<{ animeId: number }>();
const { user, loggedIn } = useUserSession();
const { watchedAnimes, fetchWatchedAnimes } = useWatchedAnimes();
const userId = user.value?.userId;
const watched = ref(false);

watch(watchedAnimes, async () => {
  watched.value = watchedAnimes.value.some(
    (anime) => anime.animeId === animeId
  );
});

const handleSubmit = async () => {
  if (userId) {
    if (!watched.value) {
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
        await $fetch("/api/user/deleteWatchedAnime", {
          
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
