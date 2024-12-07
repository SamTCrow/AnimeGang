<script lang="ts" setup>
const { watchedAnimes, fetchWatchedAnimes } = useWatchedAnimes();
const { loggedIn, user } = useUserSession();

if (loggedIn.value && user.value && watchedAnimes.value.length === 0) {
  fetchWatchedAnimes(user.value.userId);
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
