import type { highlightCard, JikanAnimeResponse } from "~/types/types";
export default cachedEventHandler(
  async () => {
    const { data } = await $fetch<JikanAnimeResponse>(
      `https://api.jikan.moe/v4/seasons/now`
    );
    const response = data.map<highlightCard>(
      (element) =>
        ({
          title: element.title,
          status: element.status,
          cover: element.images.webp.image_url,
          synopsis: element.synopsis,
          id: element.mal_id,
          episodes: element.episodes
        }) satisfies highlightCard
    );

    const season =
      (data[0].season ?? "Current Season") + " -5 " + new Date().getFullYear();

    return { response, season };
  },

  {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    getKey: (event) => event.path
  }
);
