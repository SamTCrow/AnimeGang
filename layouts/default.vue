<script setup lang="ts">
import Account from "~/components/account/account.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div
      class="sticky top-0 z-50 flex h-12 w-full items-center justify-between bg-gray-200 p-2 dark:bg-gray-800"
    >
      <Menu class="basis-1/3" />
      <div class="flex basis-1/3 justify-center"><UiSearch /></div>
      <div class="flex basis-1/3 justify-end"><Account /></div>
    </div>
    <slot />
    <div class="h-32 w-full bg-gray-200 dark:bg-gray-800">footer</div>
  </div>
</template>
