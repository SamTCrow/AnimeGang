import type { highlightCards, JikanResponse } from "~/types/types";
export default defineEventHandler(async () => {
  const { data } = await $fetch<JikanResponse>(
    `https://api.jikan.moe/v4/top/anime?limit=6`
  );
  const response = data.map<highlightCards>((element) => {
    return {
      title: element.title,
      synopsis: element.synopsis,
      studio: element.studios[0].name,
      cover: element.images.webp.image_url,
      status: element.status,
      episodes: element.episodes,
      id: element.mal_id
    } satisfies highlightCards;
  });

  return response;
});
