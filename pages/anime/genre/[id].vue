<script lang="ts" setup>
const { id } = useRoute().params;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchResult = ref<any>(null);
const page = ref(1);
const maxPage = ref(1);
const ph = ref(25);
const sort = ref("desc");
const order = ref("score");
const orderOption = [
  {
    name: "Score",
    value: "score"
  },
  {
    name: "Title",
    value: "title"
  },
  {
    name: "Rank",
    value: "rank"
  },
  {
    name: "Popularity",
    value: "popularity"
  }
];
const sortOption = ["asc", "desc"];

watchEffect(async () => {
  searchResult.value = null;
  const { data, pagination } = await $fetch(
    `/api/anime/genre/${id}?page=${page.value}&sort=${sort.value}&order=${order.value}`,
    {}
  );
  if (data) {
    searchResult.value = data;
    maxPage.value = pagination.items.total;
  }
});
</script>

<template>
  <div v-if="searchResult && searchResult?.length > 0">
    <div class="flex justify-between pt-6">
      <UPagination
        v-model="page"
        :total="maxPage"
        :page-count="ph"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'gray' }"
      />
      <div class="flex gap-4">
        <USelect
          v-model="order"
          :options="orderOption"
          option-attribute="name"
          size="sm"
        />
        <USelect v-model="sort" :options="sortOption" size="sm" />
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
        :total="maxPage"
        :page-count="ph"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'gray' }"
      />
      <div class="flex gap-4">
        <USelect
          v-model="order"
          :options="orderOption"
          option-attribute="name"
          size="sm"
        />
        <USelect v-model="sort" :options="sortOption" size="sm" />
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
