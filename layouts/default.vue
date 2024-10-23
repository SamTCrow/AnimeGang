<template>
  <div class="flex min-h-screen flex-col">
    <div
      class="sticky top-0 z-50 flex h-12 w-full items-center justify-between bg-gray-200 dark:bg-gray-800"
    >
      <Menu />

      <div class="flex items-center">
        <span>Login/accout</span>
        <span>Signup/signout</span>
        <UiDarkMode />
      </div>
      <div>Logo</div>
    </div>
    <slot />
    <div class="h-32 w-full bg-gray-200 dark:bg-gray-800">footer</div>
  </div>
</template>
