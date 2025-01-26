<script lang="ts" setup>
const { referenceId } = defineProps<{ referenceId: number }>();
const { user } = useUserSession();
const loading = ref(false);
const page = ref(1);
const commentText = ref("");
const repliesId = ref(0);
const isOpen = ref(false);
const reply = ref("");
const {
  data,
  status,
  refresh: refreshComments
} = await useFetch(() => `/api/comments/${referenceId}?page=${page.value}`, {
  lazy: true
});

const {
  data: repliesData,
  status: repliesStatus,
  refresh: repliesRefresh
} = await useFetch(() => `/api/comments/replies/${repliesId.value}`, {
  lazy: true,
  immediate: false
});

const handleReplies = (id: number) => {
  repliesId.value = id;
  repliesRefresh();
  isOpen.value = true;
};

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
  refreshComments();
};

const handleReplySubmit = async (parentId: number) => {
  await $fetch(`/api/comments/${referenceId}`, {
    method: "POST",
    body: {
      author: user.value?.userId,
      message: reply.value,
      parentId
    }
  });
  reply.value = "";
  refreshComments();
};
</script>

<template>
  <AuthState v-slot="{ loggedIn }">
    <div v-if="loggedIn" class="flex flex-col gap-4 py-4">
      <UTextarea
        v-model="commentText"
        variant="outline"
        color="gray"
        placeholder="Leave a comment..."
        autoresize
        :rows="10"
      />
      <div class="flex justify-end">
        <UButton
          label="Submit"
          class=""
          color="gray"
          :loading="loading"
          :disabled="commentText.length < 3"
          @click="handleSubmit"
        />
      </div>
    </div>

    <div v-if="status === 'pending'">
      <span>Loading...</span>
    </div>
    <div v-if="data.items < 1 || !data" class="pb-4 pt-2 text-center">
      <span>Be the first to comment!</span>
    </div>
    <div v-else class="space-y-4 p-4">
      <UPagination
        v-if="data.items > 10"
        v-model="page"
        :page-count="10"
        :total="data.items"
      />
      <UCard v-for="comment in data.commentsList" :key="comment.id">
        <div class="text-pretty">{{ comment.message }}</div>

        <template #header>
          <div class="flex justify-between text-xs">
            <span>{{ comment.user.username }}</span>
            <span>{{
              new Date(Date.parse(comment.createdAt)).toUTCString()
            }}</span>
          </div>
        </template>
        <template #footer>
          <div class="space-y-2">
            <UButton
              class="text-xs"
              variant="ghost"
              color="gray"
              :disabled="comment.children.length < 1"
              @click="handleReplies(comment.id)"
            >
              Replies: {{ comment.children.length }}
            </UButton>
            <UAccordion
              v-if="loggedIn"
              :items="[
                {
                  label: 'Reply',
                  slot: 'reply'
                }
              ]"
              variant="ghost"
              size="sm"
            >
              <template #reply>
                <div class="space-y-2">
                  <UTextarea
                    v-model="reply"
                    variant="outline"
                    color="gray"
                    placeholder="Leave a reply..."
                    autoresize
                  />
                  <UButton
                    label="Submit"
                    class=""
                    color="gray"
                    :loading="loading"
                    :disabled="reply.length < 3"
                    @click="handleReplySubmit(comment.id)"
                  />
                </div>
              </template>
            </UAccordion>
          </div>
        </template>
      </UCard>
      <USlideover v-model="isOpen">
        <div v-if="repliesStatus === 'pending'">Loading...</div>
        <div class="m-2 space-y-2">
          <UCard v-for="rep in repliesData" :key="rep.id" class="">
            <span>{{ rep.message }}</span>
            <template #header>
              <div class="flex justify-between text-sm">
                <span>{{ rep.user.username }}</span>
                <span>{{
                  new Date(Date.parse(rep.createdAt)).toUTCString()
                }}</span>
              </div>
            </template>
          </UCard>
        </div>
      </USlideover>
    </div>
  </AuthState>
</template>
