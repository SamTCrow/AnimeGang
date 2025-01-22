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
      <div class="flex basis-1/3 justify-end">
        <Account />
        <UiDarkMode />
      </div>
    </div>
    <UContainer
      class="flex w-full max-w-[1400px] flex-1 flex-col gap-4 bg-gray-100  dark:bg-gray-900"
    >
      <slot />
    </UContainer>
    <div
      class="flex h-32 w-full items-center justify-items-center bg-gray-200 dark:bg-gray-800"
    >
      <span class="mx-auto">AnimeGang!</span>
    </div>
  </div>
</template>
