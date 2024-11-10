import type { highlightCard, JikanMangaResponse } from "~/types/types";
export default defineEventHandler(async () => {
  const { data } = await $fetch<JikanMangaResponse>(
    `https://api.jikan.moe/v4/top/manga?limit=6`
  );
  const response = data.map<highlightCard>((element) => {
    return {
      title: element.title,
      status: element.status,
      cover: element.images.webp.image_url,
      synopsis: element.synopsis,
      id: element.mal_id,
      episodes: element.chapters
    } satisfies highlightCard;
  });

  return response;
});
