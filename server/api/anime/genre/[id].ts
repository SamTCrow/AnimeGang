import { z } from "zod";
import type {
  highlightCard,
  Demographic as HighlightCardDemographic
} from "~/types/types";
export interface Main {
  pagination: Pagination;
  data: Datum[];
}

export interface Datum {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: null | string;
  title_japanese: string;
  title_synonyms: string[];
  type: DatumType;
  source: Source;
  episodes: number;
  status: Status;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: Rating;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string | null;
  year: number | null;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: HighlightCardDemographic[];
  explicit_genres: Demographic[];
  themes: Demographic[];
  demographics: Demographic[];
}

export interface Aired {
  from: Date;
  to: Date | null;
  prop: Prop;
  string: string;
}

export interface Prop {
  from: From;
  to: From;
}

export interface From {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Broadcast {
  day: null | string;
  time: null | string;
  timezone: Timezone | null;
  string: null | string;
}

export enum Timezone {
  AsiaTokyo = "Asia/Tokyo"
}

export interface Demographic {
  mal_id: number;
  type: DemographicType;
  name: string;
  url: string;
}

export enum DemographicType {
  Anime = "anime"
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export enum Rating {
  PG13Teens13OrOlder = "PG-13 - Teens 13 or older",
  R17ViolenceProfanity = "R - 17+ (violence & profanity)"
}

export enum Season {
  Fall = "fall",
  Spring = "spring",
  Summer = "summer",
  Winter = "winter"
}

export enum Source {
  LightNovel = "Light novel",
  Manga = "Manga",
  Novel = "Novel",
  Original = "Original"
}

export enum Status {
  FinishedAiring = "Finished Airing"
}

export interface Title {
  type: TitleType;
  title: string;
}

export enum TitleType {
  Default = "Default",
  English = "English",
  French = "French",
  German = "German",
  Japanese = "Japanese",
  Spanish = "Spanish",
  Synonym = "Synonym"
}

export interface Trailer {
  youtube_id: null | string;
  url: null | string;
  embed_url: null | string;
  images: Images;
}

export interface Images {
  image_url: null | string;
  small_image_url: null | string;
  medium_image_url: null | string;
  large_image_url: null | string;
  maximum_image_url: null | string;
}

export enum DatumType {
  Movie = "Movie",
  Ova = "OVA",
  Tv = "TV"
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}

const schema = z.object({
  id: z.string()
}).parse;
const pageSchema = z.object({
  page: z.string().or(z.undefined()),
  sort: z.enum(["asc", "desc"]).or(z.undefined()),
  order: z.enum(["title", "score", "popularity", "rank"]).or(z.undefined())
}).parse;

export default defineCachedEventHandler(
  async (event) => {
    const { id } = await getValidatedRouterParams(event, schema);
    const { page, sort, order } = await getValidatedQuery(event, pageSchema);

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing params"
      });
    }

    const response = await $fetch<Main>(
      `https://api.jikan.moe/v4/anime?genres=${id}&page=${page ?? ""}&sort=${sort ?? ""}&order_by=${order ?? ""}`
    );

    const { data } = response;
    const animeList = data.map((anime) => ({
      cover: anime?.images.webp.image_url,
      title: anime.title,
      id: anime.mal_id,
      synopsis: anime.synopsis,
      status: anime.status,
      episodes: anime.episodes,
      studio: anime?.studios[0]?.name ?? "",
      type: anime.type,
      rank: anime.rank,
      season: anime.season,
      year: anime.year,
      genres: anime.genres
    })) satisfies highlightCard[];

    return {
      pagination: response.pagination,
      data: animeList
    };
  },
  {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    getKey: (event) => event.path
  }
);
