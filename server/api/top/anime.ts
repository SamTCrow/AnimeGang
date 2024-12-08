import type { highlightCard, JikanAnimeResponse } from "~/types/types";
export default cachedEventHandler(
  async () => {
    const { data } = await $fetch<JikanAnimeResponse>(
      `https://api.jikan.moe/v4/top/anime`
    );
    const response = data.map<highlightCard>((element) => {
      return {
        title: element.title,
        rank: element.rank,
        cover: element.images.jpg.image_url,
        season: element.season || undefined,
        year: element.year || undefined,
        studio: element.studios[0].name,
        type: element.type,
        genres: element.genres,
        synopsis: element.synopsis,
        id: element.mal_id,
        episodes: element.episodes,
        status: element.status
      } satisfies highlightCard;
    });

    return response;
  },
  {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    getKey: (event) => event.path
  }
);
