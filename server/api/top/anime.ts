import type { highlightCard, JikanAnimeResponse } from "~/types/types";
import { z } from "zod";

const schema = z.object({
  page: z.string().or(z.undefined()),
  filter: z
    .enum(["airing", "upcoming", "bypopularity", "favorite"])
    .or(z.undefined())
}).parse;

export default cachedEventHandler(
  async (event) => {
    const { page, filter } = await getValidatedQuery(event, schema);
    const { data, pagination } = await $fetch<JikanAnimeResponse>(
      `https://api.jikan.moe/v4/top/anime?page=${page ?? ""}&filter=${filter ?? ""}`
    );
    const animeList = data.map<highlightCard>((element) => {
      return {
        title: element.title,
        rank: element.rank,
        cover: element.images.jpg.image_url,
        season: element.season || undefined,
        year: element.year || undefined,
        studio: element?.studios[0]?.name ?? "",
        type: element.type,
        genres: element.genres,
        synopsis: element.synopsis,
        id: element.mal_id,
        episodes: element.episodes,
        status: element.status
      } satisfies highlightCard;
    });

    return {
      pagination: pagination,
      data: animeList
    };
  },
  {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    getKey: (event) => event.path
  }
);
