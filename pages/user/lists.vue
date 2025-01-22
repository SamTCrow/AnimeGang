<script lang="ts" setup>
const { user } = useUserSession();
const { userLists, fetchUserLists } = useUserLists();
const newList = ref("");
const hydrated = ref(false);
const lists = computed(() =>
  userLists.value.map((list) => ({
    label: list.list.name,
    id: list.list.id,
    content: JSON.stringify(list.anime)
  }))
);

const handleAnimeDelete = async (animeId: string, listId: string) => {
  await $fetch("/api/user/list/removeAnime", {
    method: "POST",
    body: {
      animeId: animeId,
      listId: listId
    }
  });
  if (user.value) {
    await fetchUserLists(user.value.userId);
  }
};

const handleAddList = async () => {
  if (user.value) {
    await $fetch("/api/user/list/addList", {
      method: "POST",
      body: {
        userId: user.value.userId,
        name: newList.value
      }
    });
    newList.value = "";
    await fetchUserLists(user.value.userId);
  }
};

const handleDeleteList = async (listId: number) => {
  if (user.value) {
    await $fetch(`/api/user/list/deleteList?listId=${listId}`);
    await fetchUserLists(user.value.userId);
  }
};
onMounted(() => (hydrated.value = true));
</script>

<template>
  <AuthState v-slot="{ loggedIn }">
    <div>
      <h1 class="py-6 text-center text-lg">My lists</h1>

      <div class="flex gap-6 py-4">
        <UInput v-model="newList" placeholder="New List..." />
        <UButton
          icon="mingcute:add-fill"
          color="gray"
          :label="'Create ' + newList"
          @click="handleAddList"
        />
      </div>
      <UAccordion
        v-if="loggedIn && lists && hydrated"
        variant="solid"
        color="gray"
        :items="lists"
        class="pb-6"
        multiple
      >
        <template #default="{ item, index, open }">
          <UButton color="gray" variant="ghost" size="xl">
            <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

            <template #trailing>
              <UButton
                icon="mingcute:delete-2-line"
                variant="ghost"
                color="gray"
                @click="handleDeleteList(item.id)"
              />
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="ms-auto h-5 w-5 transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </template>
          </UButton>
        </template>
        <template #item="{ item, index }">
          <span v-if="JSON.parse(item.content).length < 1" class="px-4"
            >Nothing Here</span
          >
          <div v-else class="flex flex-col gap-4 px-4">
            <div
              v-for="anime in JSON.parse(item.content)"
              :key="anime.animeId"
              class="flex items-center justify-between hover:opacity-75"
            >
              <ULink :to="/anime/ + anime.animeId"
                >{{ index }}. {{ anime.animeName }}</ULink
              >
              <UButton
                icon="mingcute:delete-2-line"
                variant="ghost"
                color="gray"
                @click="handleAnimeDelete(anime.animeId, anime.listId)"
              />
            </div>
          </div>
        </template>
      </UAccordion>
      <div v-else>
        <UButton
          loading
          disabled
          color="gray"
          variant="ghost"
          label="Loading..."
          size="xl"
        />
      </div>
    </div>
  </AuthState>
</template>
