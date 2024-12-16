import { drizzle } from "drizzle-orm/d1";
import * as schema from "../database/schema";
export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

export type User = typeof schema.user.$inferInsert;
export type List = typeof schema.list.$inferSelect;
export type listToAnime = typeof schema.listToAnime.$inferInsert;
