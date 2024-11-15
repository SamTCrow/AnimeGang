<script lang="ts" setup>
const profileIcon = ref("line-md:account");

const items = [
  [{ label: `Welcome`, slot: "account" }],
  [
    {
      label: "Profile",
      to: "/profile",
      icon: "material-symbols-light:account-circle"
    }
  ],
  [
    {
      label: "My anime",
      to: "/profile/myanime",
      icon: "tabler:square-rounded-letter-a"
    },
    {
      label: "My manga",
      to: "/profile/mymanga",
      icon: "tabler:square-rounded-letter-m"
    }
  ],
  [
    {
      label: "Setting",
      to: "/profile/settings",
      icon: "akar-icons:gear"
    }
  ],
  [
    {
      label: "utils",
      slot: "utils"
    }
  ]
];
</script>

<template>
  <AuthState v-slot="{ loggedIn, clear, user }">
    <UDropdown
      v-if="loggedIn"
      :items="items"
      :popper="{ placement: 'bottom-end' }"
    >
      <UButton :icon="profileIcon" variant="ghost" />
      <template #account>
        <span class="truncate text-sm"> {{ user?.name }}</span>
      </template>
      <template #utils>
        <UButton
          icon="mi:log-out"
          variant="ghost"
          label="LogOut"
          class="w-full p-0"
          @click="clear"
        />
      </template>
    </UDropdown>
    <AccountSign v-else />
  </AuthState>
</template>
