import {
  sqliteTable,
  text,
  integer,
  primaryKey
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

//Da finire tabella utenti
export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name"),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique().notNull(),
  profileImage: text("avatar"),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updatedAt"),
  verified: integer("verified", {
    mode: "boolean"
  }).default(false)
});

export const userRelations = relations(user, ({ many }) => ({
  animeList: many(list),
  scores: many(score),
  watchedAnime: many(watchedAnime),
  characterLike: many(characterLike)
}));

export const list = sqliteTable("list", {
  id: integer("id").primaryKey(),
  userId: integer("userId")
    .references(() => user.id)
    .notNull(),
  name: text("name").notNull()
});

export const listRelations = relations(list, ({ one, many }) => ({
  user: one(user, { fields: [list.userId], references: [user.id] }),
  listToAnime: many(listToAnime)
}));

export const listToAnime = sqliteTable(
  "listToAnime",
  {
    listId: integer("listId")
      .notNull()
      .references(() => list.id),
    animeId: integer("animeId").notNull(),
    animeName: text("animeName").notNull()
  },
  (t) => ({ pk: primaryKey({ columns: [t.listId, t.animeId] }) })
);

export const listToAnimeRelations = relations(listToAnime, ({ one }) => ({
  list: one(list, {
    fields: [listToAnime.listId],
    references: [list.id]
  })
}));

export const score = sqliteTable(
  "scores",
  {
    userID: integer("userID")
      .notNull()
      .references(() => user.id),
    animeID: integer("animeID").notNull(),
    score: integer("score").notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userID, t.animeID] })
  })
);

export const scoreRelations = relations(score, ({ one }) => ({
  user: one(user, {
    fields: [score.userID],
    references: [user.id]
  })
}));

export const watchedAnime = sqliteTable(
  "watchedAnime",
  {
    userId: integer("userId")
      .notNull()
      .references(() => user.id),
    animeId: integer("animeId").notNull(),
    animeName: text("animeName").notNull()
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.animeId] }) })
);

export const watchedAnimeRelations = relations(watchedAnime, ({ one }) => ({
  user: one(user, {
    fields: [watchedAnime.userId],
    references: [user.id]
  })
}));

export const characterLike = sqliteTable(
  "characterLike",
  {
    characterId: integer("characterId").notNull(),
    characterName: text("characterName").notNull(),
    userId: integer("userId")
      .notNull()
      .references(() => user.id)
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.characterId] }) })
);

export const characterLikeRelation = relations(characterLike, ({ one }) => ({
  user: one(user, {
    fields: [characterLike.userId],
    references: [user.id]
  })
}));
