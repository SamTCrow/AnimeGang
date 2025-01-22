<script lang="ts" setup>
import { comments } from "~/server/database/schema";

const { referenceId } = defineProps<{ referenceId: number }>();
const { user } = useUserSession();
const loading = ref(false);
const commentText = ref("");
const {
  data: CommentsList,
  status,
  refresh
} = await useFetch(`/api/comments/${referenceId}`, {
  lazy: true
});
const handleSubmit = async () => {
  loading.value = true;
  await $fetch(`/api/comments/${referenceId}`, {
    method: "POST",
    body: {
      author: user.value?.userId,
      message: commentText.value
    }
  });
  commentText.value = "";
  loading.value = false;
  refresh();
};
</script>

<template>
  <div v-if="status === 'pending'">
    <span>Loading...</span>
  </div>
  <div
    v-if="CommentsList?.length < 1 || !CommentsList"
    class="pb-4 pt-2 text-center"
  >
    <span>Be the first to comment!</span>
  </div>
  <div v-else class="p-4">
    <UCard v-for="comment in CommentsList" :key="comment.id">
      <div class="text-pretty">{{ comment.message }}</div>
      <UDivider class="py-4" />
      <div class="flex justify-between">
        <span class="text-sm">{{ comment.author }}</span>
        <span class="text-sm">{{
          new Date(Date.parse(comment.createdAt)).toUTCString()
        }}</span>
      </div>
    </UCard>
  </div>
  <AuthState v-slot="{ loggedIn }">
    <div v-if="loggedIn" class="space-y-4">
      <UTextarea
        v-model="commentText"
        variant="outline"
        color="gray"
        placeholder="Leave a comment..."
        autoresize
        :rows="10"
      />
      <UButton
        label="Submit"
        class="absolute right-0"
        color="gray"
        @click="handleSubmit"
      />
    </div>
  </AuthState>
</template>
