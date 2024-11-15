<script lang="ts" setup>
const route = useRoute();
const query = route.params.query;

const {
  data: searchResult,
  error,
  status
} = await useFetch(`/api/search/anime?q=${query}`, {
  lazy: true
});
</script>

<template>
  <div
    class="grid grid-cols-2 justify-items-center gap-6 p-6 md:grid-cols-3 lg:grid-cols-6"
  >
    <div v-if="status === 'pending'">
      <USkeleton class="h-[400px] w-full" />
      <USkeleton class="h-[400px] w-full" />
      <USkeleton class="h-[400px] w-full" />
      <USkeleton class="h-[400px] w-full" />
      <USkeleton class="h-[400px] w-full" />
      <USkeleton class="h-[400px] w-full" />
    </div>
    <span v-if="error">Something went wrong</span>
    <span v-if="searchResult && searchResult?.length < 1">Nothing found</span>

    <MiniCard v-for="card in searchResult" :key="card.id" :card="card" />
  </div>
</template>
