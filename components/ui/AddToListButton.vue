<script lang="ts" setup>
import { z } from "zod";

const { fetchUserLists, userLists } = useUserLists();
const { user, loggedIn } = useUserSession();
const { animeId, animeName } = defineProps<{
  animeId: number;
  animeName: string;
}>();
type List = {
  name?: string;
  id: number;
  disabled: boolean;
};

const lists = computed(() => {
  return userLists.value.map((list) => ({
    name: list.list.name || undefined,
    id: list.list.id,
    disabled: list.anime.some((anime) => anime.animeId === animeId)
  }));
});

const isOpen = ref(false);

const list = ref<List>({
  id: 0,
  name: "",
  disabled: false
});

const selectCreateList = computed({
  get: () => list.value,
  set: async (newList) => {
    if (newList?.id) {
      list.value = newList;
      return newList;
    }

    const response = {
      name: newList?.name,
      id: 0,
      disabled: false
    };

    list.value = response;
    if (user.value) {
      await fetchUserLists(user.value.userId);
    }
    const listDb = await $fetch("/api/user/list/addList", {
      method: "POST",
      body: {
        userId: user.value?.userId,
        name: z.string().parse(newList?.name)
      }
    });
    lists.value.push({
      name: response.name,
      id: listDb.id,
      disabled: false
    });
    list.value.id = listDb.id;
    return response;
  }
});

const onAddAnime = async () => {
  try {
    const response = await $fetch("/api/user/list/addAnime", {
      method: "POST",
      body: {
        listId: list.value.id,
        animeId: animeId,
        animeName: animeName
      }
    });
    list.value.disabled = true;
    isOpen.value = false;
    if (user.value) {
      await fetchUserLists(user.value?.userId);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <UButton :disabled="!loggedIn" color="gray" @click="isOpen = true"
    ><slot
  /></UButton>
  <UModal v-model="isOpen">
    <UCard>
      <div class="flex justify-between gap-5">
        <USelectMenu
          v-model="selectCreateList"
          :ui="{
            wrapper: 'w-full'
          }"
          :ui-menu="{
            option: {
              disabled: 'bg-gray-600'
            }
          }"
          searchable
          creatable
          :clear-search-on-close="true"
          show-create-option-when="always"
          color="gray"
          placeholder="Select a list or type to create a new one..."
          variant="outline"
          :options="lists"
          option-attribute="name"
          by="id"
        />
        <UButton color="gray" :disabled="list.disabled" @click="onAddAnime"
          >Add</UButton
        >
      </div>
    </UCard>
  </UModal>
</template>
