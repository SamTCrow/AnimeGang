<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { user, fetch } = useUserSession();
const schema = z.object({
  newUserName: z.string().min(3).max(20)
});
type Schema = z.output<typeof schema>;

const error = ref("");

const changeUsernameForm = ref({
  newUserName: undefined
});

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  error.value = "";
  try {
    if (user.value) {
      const response = await $fetch("/api/user/changeUsername", {
        method: "POST",
        body: {
          newUserName: event.data.newUserName
        }
      });
      error.value = response.message;
      await fetch();
    }
  } catch (err: unknown) {
    error.value = (err as { statusMessage: string }).statusMessage;
  } finally {
    changeUsernameForm.value.newUserName = undefined;
  }
};
</script>

<template>
  <UContainer class="max-w-[600px]">
    <UCard>
      <template #header>
        <span>Change Username</span>
      </template>
      <UForm
        :schema="schema"
        :state="changeUsernameForm"
        class="space-y-4"
        @submit="handleSubmit"
      >
        <UFormGroup label="New Username" name="newUsername">
          <UInput v-model="changeUsernameForm.newUserName" />
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
      </UForm>
      <template #footer>
        <span>{{ error }}</span>
      </template>
    </UCard>
  </UContainer>
</template>
