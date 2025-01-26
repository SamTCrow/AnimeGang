<script lang="ts" setup>
const items = [
  {
    slot: "passwordChange",
    label: "Change password"
  },
  { slot: "changeName", label: "Change Username" },
  { slot: "deleteUser", label: "Delete User" }
];
</script>

<template>
  <UTabs
    :items="items"
    orientation="vertical"
    class="py-2"
    :ui="{ wrapper: 'flex gap-4', list: { width: 'w-48 h-full px-4 my-2' } }"
  >
    <template #passwordChange>
      <SettingsPasswordChange />
    </template>
    <template #changeName>
      <SettingsUsernameChange />
    </template>
    <template #deleteUser>
      <SettingsDeleteUser />
    </template>
  </UTabs>
</template>
