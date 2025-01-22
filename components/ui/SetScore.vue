<script lang="ts" setup>
const { animeId } = defineProps<{ animeId: number }>();
const { user } = useUserSession();
const { fetchUserScores, userScores } = useUserScores();
const loading = ref(false);
const score = computed({
  get: () =>
    userScores.value.find((score) => score.animeID === animeId)?.score ?? 0,
  set: async (newScore) => {
    if (newScore === score.value) {
      return newScore;
    }
    loading.value = true;
    if (user.value) {
      const response = await $fetch("/api/user/score/addScore", {
        method: "POST",
        body: {
          userId: user.value.userId,
          animeId: animeId,
          score: Number(newScore)
        }
      });
      fetchUserScores(user.value.userId);
      loading.value = false;
      return response.score;
    }
  }
});
</script>

<template>
  <USelect
    v-model="score"
    :options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
    :loading="loading"
  />
</template>
