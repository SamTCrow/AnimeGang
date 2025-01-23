<script lang="ts" setup>
const { watchedAnimes, fetchWatchedAnimes } = useWatchedAnimes();
const { userLists, fetchUserLists } = useUserLists();
const { likedChar, fetchLikedChar } = useLikedChar();
const { userScores, fetchUserScores } = useUserScores();
const { loggedIn, user } = useUserSession();

if (loggedIn.value && user.value) {
  if (watchedAnimes.value.length === 0) {
    fetchWatchedAnimes(user.value.userId);
  }
  if (userLists.value.length === 0) {
    fetchUserLists(user.value.userId);
  }
  if (likedChar.value.length === 0) {
    fetchLikedChar(user.value.userId);
  }
  if (userScores.value.length === 0) {
    fetchUserScores(user.value.userId);
  }
}

watch(user, async () => {
  if (user.value) {
    await Promise.all([
      fetchWatchedAnimes(user.value.userId),
      fetchUserLists(user.value.userId),
      fetchLikedChar(user.value.userId),
      fetchUserScores(user.value.userId)
    ]);
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
