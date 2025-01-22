export const useLikedChar = () => {
  const likedChar = useState<
    {
      userId: number;
      characterId: number;
      characterName: string;
      characterAnimeId: number;
      characterAnimeName: string;
    }[]
  >("likedChar", () => []);
  const loading = useState("loading", () => false);
  const error = useState<string | null>("error", () => null);
  const fetchLikedChar = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const charList = await $fetch(`/api/user/characters/${userId}`);
      likedChar.value = charList;
    } catch (err) {
      error.value = `${err}`;
    } finally {
      loading.value = false;
    }
  };

  return {
    likedChar,
    loading,
    error,
    fetchLikedChar
  };
};
