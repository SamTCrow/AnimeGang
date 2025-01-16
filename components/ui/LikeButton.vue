<script lang="ts" setup>
const { characterId, characterName } = defineProps<{
  characterId: number;
  characterName: string;
}>();
const { user, loggedIn } = useUserSession();
const userId = user.value?.userId;
const { likedChar, fetchLikedChar } = useLikedChar();
const liked = computed(() => {
  return likedChar.value.some((char) => char.charId === characterId);
});
const handleSubmit = async () => {
  if (userId) {
    if (!liked.value) {
      try {
        await $fetch("/api/user/characters/addCharacterLike", {
          method: "POST",
          body: {
            userId,
            characterId,
            characterName
          }
        });
        await fetchLikedChar(userId);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await $fetch("/api/user/characters/deleteCharacterLike", {
          method: "POST",
          body: {
            userId,
            characterId
          }
        });
        await fetchLikedChar(userId);
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    console.log("no user id");
  }
};
</script>

<template>
  <UButton
    :color="liked ? 'emerald' : 'red'"
    :disabled="!loggedIn"
    icon="material-symbols:heart-plus"
    size="lg"
    @click="handleSubmit"
  />
</template>
