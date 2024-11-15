import type { highlightCard, JikanAnimeResponse } from "~/types/types";
import { z } from "zod";

const querySchema = z.object({
  q: z.string()
});

export default defineEventHandler(async (event) => {
  const query = getValidatedQuery(event, querySchema.parse);
  const { q } = await query;
  const { data } = await $fetch<JikanAnimeResponse>(
    `https://api.jikan.moe/v4/anime?q=${q}&order_by=popularity`
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
