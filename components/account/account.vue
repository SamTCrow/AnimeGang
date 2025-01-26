<script lang="ts" setup>
const profileIcon = ref("line-md:account");
const router = useRouter();
const items = [
  [{ label: `Welcome`, slot: "account" }],
  [
    {
      label: "My Lists",
      to: "/user/lists"
    }
  ],
  [
    {
      label: "My anime",
      to: "/user/anime",
      icon: "tabler:square-rounded-letter-a"
    },
    {
      label: "My Characters",
      to: "/user/characters",
      icon: "tabler:square-rounded-letter-c"
    }
  ],
  [
    {
      label: "Settings",
      to: "/user/settings",
      icon: "tabler:manual-gearbox"
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
        <span class="truncate text-sm">Welcome {{ user?.userName }}</span>
      </template>
      <template #utils>
        <UButton
          icon="mi:log-out"
          variant="ghost"
          label="LogOut"
          class="w-full p-0"
          color="gray"
          @click="
            () => {
              clear();
              router.push('/');
            }
          "
        />
      </template>
    </UDropdown>
    <AccountSign v-else />
  </AuthState>
</template>
