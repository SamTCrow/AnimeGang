import type { List, listToAnime } from "~/server/utils/drizzle";

interface userList {
  list: List;
  anime: listToAnime[];
}

export const useUserLists = () => {
  const userLists = useState<userList[]>("userLists", () => []);
  const loading = useState("loading", () => false);
  const error = useState<string | null>("error", () => null);

  const fetchUserLists = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const lists = await $fetch(`/api/user/list/${userId}`);
      userLists.value = lists;
    } catch (err) {
      error.value = `${err}`;
    } finally {
      loading.value = false;
    }
  };
  return {
    userLists,
    loading,
    error,
    fetchUserLists
  };
};
