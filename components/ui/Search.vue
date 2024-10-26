<script lang="ts" setup>
const q = ref("");
const handleSearch = () => console.log(q.value);
</script>

<template>
  <form @submit.prevent="handleSearch">
    <UInput
      v-model="q"
      name="q"
      placeholder="Search..."
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="on"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    />
  </form>
</template>
