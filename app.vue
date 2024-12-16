<script lang="ts" setup>
const { watchedAnimes, fetchWatchedAnimes } = useWatchedAnimes();
const { userLists, fetchUserLists } = useUserLists();
const { loggedIn, user } = useUserSession();

if (loggedIn.value && user.value) {
  if (watchedAnimes.value.length === 0) {
    fetchWatchedAnimes(user.value.userId);
  }
  if (userLists.value.length === 0) {
    fetchUserLists(user.value.userId);
  }
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
