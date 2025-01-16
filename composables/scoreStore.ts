interface Score {
  score: number;
  userID: number;
  animeID: number;
}

export const useUserScores = () => {
  const userScores = useState<Score[]>("userScores", () => []);
  const loading = useState("loading", () => false);
  const error = useState<string | null>("error", () => null);
  const fetchUserScores = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const scoreList = await $fetch(`/api/user/score/${userId}`);
      userScores.value = scoreList;
    } catch (err) {
      error.value = `${err}`;
    } finally {
      loading.value = false;
    }
  };
  return {
    userScores,
    loading,
    error,
    fetchUserScores
  };
};
