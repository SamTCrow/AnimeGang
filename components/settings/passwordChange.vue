<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schemaPasswordChange = z.object({
  oldPassword: z
    .string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at max 20 characters"),
  newPassword: z
    .string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at max 20 characters"),
  repeatNewPassword: z
    .string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at max 20 characters")
});
type SchemaPasswordChange = z.output<typeof schemaPasswordChange>;
const { user } = useUserSession();
const error = ref("");
const changePassForm = ref({
  oldPassword: undefined,
  newPassword: undefined,
  repeatNewPassword: undefined
});
const onSubmit = async (event: FormSubmitEvent<SchemaPasswordChange>) => {
  error.value = "";
  try {
    if (user.value) {
      const response = await $fetch("/api/user/changePassword", {
        method: "POST",
        body: {
          userId: user.value.userId,
          oldPassword: event.data.oldPassword,
          newPassword: event.data.newPassword,
          repeatNewPassword: event.data.repeatNewPassword
        }
      });
      error.value = response.message;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err.statusMessage;
  } finally {
    changePassForm.value = {
      oldPassword: undefined,
      newPassword: undefined,
      repeatNewPassword: undefined
    };
  }
};
</script>

<template>
  <UContainer class="max-w-[600px]">
    <UCard>
      <template #header>
        <span>Change Password</span>
      </template>
      <UForm
        :schema="schemaPasswordChange"
        :state="changePassForm"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Old Password:" name="oldPassword">
          <UInput v-model="changePassForm.oldPassword" type="password" />
        </UFormGroup>
        <UFormGroup label="New Password:" name="newPassword">
          <UInput v-model="changePassForm.newPassword" type="password" />
        </UFormGroup>
        <UFormGroup label="Repeat new password:" name="repeatNewPassword">
          <UInput v-model="changePassForm.repeatNewPassword" type="password" />
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
      </UForm>
      <template #footer>
        <span>{{ error }}</span>
      </template>
    </UCard>
  </UContainer>
</template>
