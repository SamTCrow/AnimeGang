<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchResult = ref<any>(null);
const seasonNow = ref("");
const page = ref(1);
const total = ref(1);
const ph = ref(25);

watchEffect(async () => {
  searchResult.value = null;
  const {
    response: data,
    season,
    pagination
  } = await $fetch(`/api/season/now?page=${page.value}`, {});
  if (data) {
    searchResult.value = data;
    seasonNow.value = season;
    total.value = pagination.items.total;
  }
});
</script>

<template>
  <div v-if="searchResult && searchResult?.length > 0">
    <div class="flex justify-between pt-6">
      <UPagination
        v-model="page"
        :total="total"
        :page-count="ph"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'gray' }"
      />
      <span>{{ seasonNow.toUpperCase() }}</span>
    </div>
    <div
      class="grid grid-cols-2 justify-items-center gap-6 p-6 md:grid-cols-3 lg:grid-cols-6"
    >
      <MiniCard v-for="card in searchResult" :key="card.id" :card="card" />
    </div>
    <div class="flex justify-between pb-6">
      <UPagination
        v-model="page"
        :total="total"
        :page-count="ph"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'gray' }"
      />
      <div class="flex gap-4"></div>
    </div>
  </div>
  <div
    v-else
    class="grid grid-cols-2 justify-items-center gap-6 p-6 md:grid-cols-3 lg:grid-cols-6"
  >
    <USkeleton v-for="x in ph" :key="x" class="h-[300px] w-full" />
  </div>
</template>
