import { z } from "zod";
import type {
  AnimeCharactersResponse,
  AnimeRelationsResponse,
  JikanFullAnimeResponse
} from "~/types/types";

const schema = z.object({
  id: z.string()
});

export default cachedEventHandler(
  async (event) => {
    const { id } = await getValidatedRouterParams(event, schema.parse);

    const { data } = await $fetch<JikanFullAnimeResponse>(
      `https://api.jikan.moe/v4/anime/${id}/full`
    );

    const animeData = {
      id: data.mal_id,
      title: data.title,
      type: data.type,
      status: data.status,
      cover: data.images.jpg.image_url,
      episodes: data.episodes,
      airing: data.airing,
      season: data.season,
      year: data.year,
      trailer: data.trailer.youtube_id,
      source: data.source,
      start: data.aired.from,
      duration: data.duration,
      rank: data.rank,
      score: data.score,
      synopsis: data.synopsis,
      studioID: data.studios[0]?.name
    };

    const animeGenres = data.genres;

    const { data: characterData } = await $fetch<AnimeCharactersResponse>(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    );

    const animeCharacters = characterData.map((char) => ({
      id: char.character.mal_id,
      name: char.character.name,
      image: char.character.images?.jpg?.image_url,
      role: char.role,
      favorites: char.favorites
    }));

    const { data: animeRelations } = await $fetch<AnimeRelationsResponse>(
      `https://api.jikan.moe/v4/anime/${id}/relations`
    );

    return {
      animeData,
      genres: animeGenres,
      characters: animeCharacters,
      animeRelations
    };

    // check if id is in database and if it is return the anime
    //if id is not in db, fetch from external api and add it to db
  },
  {
    maxAge: 60 * 60 * 24 * 30, // 1 month
    getKey: (event) => event.path
  }
);
