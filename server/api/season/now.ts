import type { highlightCard, JikanAnimeResponse } from "~/types/types";
export default defineEventHandler(async () => {
  const { data } = await $fetch<JikanAnimeResponse>(
    `https://api.jikan.moe/v4/seasons/now?limit=6`
  );
  const response = data.map<highlightCard>((element) => {
    return {
      title: element.title,
      status: element.status,
      cover: element.images.webp.image_url,
      synopsis: element.synopsis,
      id: element.mal_id,
      episodes: element.episodes
    } satisfies highlightCard;
  });

  return response;
});
