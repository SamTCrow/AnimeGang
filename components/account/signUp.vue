<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div>
    <UButton
      label="Sign Up"
      color="primary"
      variant="ghost"
      size="xl"
      class="text-lg"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>
  </div>
</template>
