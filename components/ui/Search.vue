<script lang="ts" setup>
import { z } from "zod";

const schema = z.object({
  q: z.string()
});
const q = reactive({
  q: ""
});
const handleSearch = async () => {
  await navigateTo(`/search/${q.q}`);
};
</script>

<template>
  <UForm :schema="schema" :state="q" @submit.prevent="handleSearch">
    <UInput
      v-model="q.q"
      name="q"
      placeholder="Search..."
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="on"
      variant="outline"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    />
  </UForm>
</template>
