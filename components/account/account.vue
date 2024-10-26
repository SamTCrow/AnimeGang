<script lang="ts" setup>
const isLogged = ref(true);
const profileIcon = ref("line-md:account");
const userName = ref("Asdrubale");

const items = [
  [{ label: `Welcome ${userName.value}`, slot: "account" }],
  [
    {
      label: "Profile",
      to: "/profile",
      icon: "material-symbols-light:account-circle",
    },
  ],
  [
    {
      label: "My anime",
      to: "/profile/myanime",
      icon: "tabler:square-rounded-letter-a",
    },
    {
      label: "My manga",
      to: "/profile/mymanga",
      icon: "tabler:square-rounded-letter-m",
    },
  ],
  [
    {
      label: "Setting",
      to: "/profile/settings",
      icon: "akar-icons:gear",
    },
    {
      label: "Log Out",
      to: "/profile/logout",
      icon: "mi:log-out",
    },
  ],
  [
    {
      label: "utils",
      slot: "utils",
    },
  ],
];
</script>

<template>
  <UDropdown
    v-if="isLogged"
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton :icon="profileIcon" color="primary" variant="ghost" />
    <template #utils="">
      <div class="flex w-full items-center justify-between">
        <span>Dark Mode</span>
        <UiDarkMode class="justify-right" />
      </div>
    </template>
  </UDropdown>
  <ULink v-else class="hover:text-primary cursor-pointer text-lg font-bold"
    >Sign Up</ULink
  >
</template>
