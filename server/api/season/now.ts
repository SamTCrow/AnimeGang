import type { highlightCard, JikanAnimeResponse } from "~/types/types";
import {z} from "zod"

const schema = z.object({
  page: z.string().or(z.undefined()),
}).parse

export default cachedEventHandler(
  async (event) => {
    const { page } = await getValidatedQuery(event, schema)
    const { data, pagination } = await $fetch<JikanAnimeResponse>(
      `https://api.jikan.moe/v4/seasons/now?page=${page ?? ""}`
    );
    const response = data.map<highlightCard>(
      (element) =>
        ({
          title: element.title,
          status: element.status,
          cover: element.images.webp.image_url,
          synopsis: element.synopsis,
          id: element.mal_id,
          episodes: element.episodes,
          genres: element.genres
        }) satisfies highlightCard
    );

    const season =
      (data[0].season ?? "Current Season") + " - " + new Date().getFullYear();

    return { response, season, pagination };
  },

  {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    getKey: (event) => event.path
  }
);
