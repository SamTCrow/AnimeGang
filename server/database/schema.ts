import {
  sqliteTable,
  text,
  integer,
  primaryKey
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

//Da finire tabella utenti
export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  nickname: text("nickname").notNull()
});

export const userRelations = relations(user, ({ many }) => ({
  scores: many(score),
  watchedAnime: many(watchedAnime)
}));

export const score = sqliteTable(
  "scores",
  {
    userID: integer("userID")
      .notNull()
      .references(() => user.id),
    animeID: integer("animeID")
      .notNull()
      .references(() => anime.id),
    score: integer("score").notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.animeID, t.userID] })
  })
);

export const scoreRelations = relations(score, ({ one }) => ({
  user: one(user, {
    fields: [score.userID],
    references: [user.id]
  }),
  anime: one(anime, {
    fields: [score.animeID],
    references: [anime.id]
  })
}));

export const anime = sqliteTable("anime", {
  id: integer("id").primaryKey({}),
  cover: text("cover").notNull(),
  trailer: text("trailer"),
  title: text("title").notNull(),
  type: text("type").notNull(),
  source: text("source"),
  episodes: integer("episodes").notNull(),
  status: text("status").notNull(),
  airing: integer("airing", { mode: "boolean" }),
  duration: text("duration"),
  rating: text("rating"),
  score: integer("score"),
  synopsis: text("synopsis"),
  season: text("season"),
  year: integer("year"),
  studioID: integer("studioID")
});

export const animeRelations = relations(anime, ({ one, many }) => ({
  studio: one(studio, {
    fields: [anime.studioID],
    references: [studio.id]
  }),
  animeToGenres: many(animeToGenres),
  watchedAnime: many(watchedAnime),
  scores: many(score)
}));

export const animeToGenres = sqliteTable(
  "animeToGenres",
  {
    animeId: integer("animeId")
      .notNull()
      .references(() => anime.id),
    genreId: integer("genreId")
      .notNull()
      .references(() => genres.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.animeId, t.genreId] })
  })
);

export const studio = sqliteTable("studio", {
  id: integer("id").primaryKey().notNull(),
  type: text("type"),
  name: text("name").notNull()
});

export const studioRelations = relations(studio, ({ many }) => ({
  anime: many(anime)
}));

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull()
});

export const genresRelations = relations(genres, ({ many }) => ({
  animeToGenres: many(animeToGenres)
}));

export const animeToGenresRelations = relations(animeToGenres, ({ one }) => ({
  anime: one(anime, {
    fields: [animeToGenres.animeId],
    references: [anime.id]
  }),
  genres: one(genres, {
    fields: [animeToGenres.genreId],
    references: [genres.id]
  })
}));

export const watchedAnime = sqliteTable(
  "watchedAnime",
  {
    userId: integer("userId")
      .notNull()
      .references(() => user.id),
    animeId: integer("animeId")
      .notNull()
      .references(() => anime.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.animeId] })
  })
);

export const watchedAnimeRelations = relations(watchedAnime, ({ one }) => ({
  anime: one(anime, {
    fields: [watchedAnime.animeId],
    references: [anime.id]
  }),
  user: one(user, {
    fields: [watchedAnime.userId],
    references: [user.id]
  })
}));
