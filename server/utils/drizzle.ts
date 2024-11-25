import { drizzle } from "drizzle-orm/d1";
import * as schema from "../database/schema";
export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

export type User = typeof schema.user.$inferInsert;
export type Anime = typeof schema.anime.$inferSelect;
export type AnimePost = typeof schema.anime.$inferInsert;
export type GenrePost = typeof schema.genres.$inferInsert;
export type characterPost = typeof schema.characters.$inferInsert;
