import type { highlightCard, JikanCharacterResponse } from "~/types/types";
export default defineEventHandler(async () => {
  const { data } = await $fetch<JikanCharacterResponse>(
    `https://api.jikan.moe/v4/top/characters?limit=6`
  );
  const response = data.map<highlightCard>((element) => {
    return {
      title: element.name,
      cover: element.images.webp.image_url,
      id: element.mal_id,
      synopsis: element.about
    } satisfies highlightCard;
  });

  return response;
});
