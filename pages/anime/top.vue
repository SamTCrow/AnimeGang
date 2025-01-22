<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchResult = ref<any>(null);
const page = ref(1);
const total = ref(1);
const ph = ref(25);
const filter = ref("bypopularity");
const filterOption = [
  {
    name: "By popularity",
    value: "bypopularity"
  },
  {
    name: "Airing",
    value: "airing"
  },
  {
    name: "Favorite",
    value: "favorite"
  },
  {
    name: "Upcoming",
    value: "upcoming"
  }
];
watchEffect(async () => {
  searchResult.value = null;
  const { data, pagination } = await $fetch(
    `/api/top/anime?page=${page.value}&filter=${filter.value}`,
    {}
  );
  if (data) {
    searchResult.value = data;
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
      <div class="flex gap-4">
        <USelect
          v-model="filter"
          :options="filterOption"
          option-attribute="name"
          size="sm"
        />
      </div>
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
      <div class="flex gap-4">
        <USelect
          v-model="filter"
          :options="filterOption"
          option-attribute="name"
          size="sm"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="grid grid-cols-2 justify-items-center gap-6 p-6 md:grid-cols-3 lg:grid-cols-6"
  >
    <USkeleton v-for="x in ph" :key="x" class="h-[300px] w-full" />
  </div>
</template>
