import type { highlightCard, JikanAnimeResponse } from "~/types/types";
import { z } from "zod";

const querySchema = z.object({
  q: z.string(),
  page: z.string().or(z.undefined())
}).parse;

export default defineEventHandler(async (event) => {
  const { q: query, page } = await getValidatedQuery(event, querySchema);
  const { data, pagination } = await $fetch<JikanAnimeResponse>(
    `https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&page=${page ?? ""}`
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

  return { response, pagination };
});
