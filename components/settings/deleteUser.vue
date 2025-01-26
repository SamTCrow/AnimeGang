<script lang="ts" setup>
const isOpen = ref(false);
const { clear } = useUserSession();
const router = useRouter();
const delUser = async () => {
  await $fetch("/api/user/deleteUser", {
    method: "post",
    body: {
      agree: "YES"
    }
  });
  clear();
  router.push("/");
};
</script>

<template>
  <UContainer class="max-w-[600px]">
    <UCard>
      <template #header>
        <span class="font-bold text-red-600">DELETE USER!!</span>
      </template>
      <UButton label="Delete User" color="red" @click="isOpen = true" />
    </UCard>
    <UModal v-model="isOpen">
      <UButton
        label="Delete User"
        color="red"
        class="w-full rounded-full text-center"
        @click="delUser"
      />
    </UModal>
  </UContainer>
</template>
