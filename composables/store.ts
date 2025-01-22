export const useWatchedAnimes = () => {
  const watchedAnimes = useState<
    { animeId: number; animeName: string; userId: number }[]
  >("watchedAnime", () => []);
  const loading = useState("loading", () => false);
  const error = useState<string | null>("error", () => null);

  const fetchWatchedAnimes = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const animes = await $fetch(`/api/user/watchedAnime/${userId}`);
      watchedAnimes.value = animes;
    } catch (err) {
      error.value = `${err}`;
    } finally {
      loading.value = false;
    }
  };
  return {
    watchedAnimes,
    loading,
    error,
    fetchWatchedAnimes
  };
};
