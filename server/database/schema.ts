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
  scores: many(score),
  watchedAnime: many(watchedAnime),
  animeList: many(list),
  characterLike: many(characterLike)
}));

export const list = sqliteTable("list", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("id").references(() => user.id),
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
    animeId: integer("animeId")
      .notNull()
      .references(() => anime.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.animeId, t.listId] })
  })
);

export const listToAnimeRelations = relations(listToAnime, ({ one }) => ({
  anime: one(anime, {
    fields: [listToAnime.animeId],
    references: [anime.id]
  }),
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
  id: integer("id").primaryKey({}).notNull(),
  cover: text("cover").notNull(),
  trailer: text("trailer"),
  title: text("title").notNull(),
  type: text("type").notNull(),
  source: text("source"),
  episodes: integer("episodes"),
  status: text("status").notNull(),
  airing: integer("airing", { mode: "boolean" }).notNull(),
  start: text("start"),
  duration: text("duration"),
  rank: integer("rating"),
  score: integer("score"),
  synopsis: text("synopsis"),
  season: text("season"),
  year: integer("year"),
  studioID: text("studioID")
});

export const animeRelations = relations(anime, ({ one, many }) => ({
  studio: one(studio, {
    fields: [anime.studioID],
    references: [studio.id]
  }),
  animeToGenres: many(animeToGenres),
  watchedAnime: many(watchedAnime),
  scores: many(score),
  listToAnime: many(listToAnime),
  streamingLinks: many(streamingLinks),
  characterToAnime: many(characterToAnime),
  relatedAnime: many(relatedAnime)
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

export const relatedAnime = sqliteTable(
  "relatedAnime",
  {
    animeId: integer("animeId")
      .notNull()
      .references(() => anime.id),
    relatedAnimeId: integer("relatedAnimeId")
      .notNull()
      .references(() => anime.id),
    relationType: text("relationType").notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.animeId, t.relatedAnimeId] })
  })
);

export const relatedAnimeRelations = relations(relatedAnime, ({ one }) => ({
  anime: one(anime, {
    fields: [relatedAnime.animeId],
    references: [anime.id]
  }),
  relatedAnime: one(anime, {
    fields: [relatedAnime.relatedAnimeId],
    references: [anime.id]
  })
}));

export const streamingLinks = sqliteTable("streamingLinks", {
  id: integer("id").primaryKey().notNull(),
  animeId: integer("animeId").notNull(),
  name: text("name").notNull(),
  url: text("url").notNull()
});

export const streamingLinksRelations = relations(streamingLinks, ({ one }) => ({
  anime: one(anime, {
    fields: [streamingLinks.animeId],
    references: [anime.id]
  })
}));

export const characters = sqliteTable("characters", {
  id: integer("id").primaryKey().notNull(),
  image: text("image"),
  name: text("name").notNull(),
  about: text("about")
});

export const characterRelations = relations(characters, ({ many }) => ({
  characterToAnime: many(characterToAnime),
  characterLike: many(characterLike)
}));

export const characterToAnime = sqliteTable(
  "charactersToAnime",
  {
    characterId: integer("characterId")
      .notNull()
      .references(() => characters.id),
    animeId: integer("animeId")
      .notNull()
      .references(() => anime.id),
    role: text("role")
  },
  (t) => ({
    pk: primaryKey({ columns: [t.animeId, t.characterId] })
  })
);

export const charactersToAnimeRelations = relations(
  characterToAnime,
  ({ one }) => ({
    anime: one(anime, {
      fields: [characterToAnime.animeId],
      references: [anime.id]
    }),
    characters: one(characters, {
      fields: [characterToAnime.characterId],
      references: [characters.id]
    })
  })
);

export const characterLike = sqliteTable(
  "characterLike",
  {
    characterId: integer("characterId")
      .notNull()
      .references(() => characters.id),
    userId: integer("userId")
      .notNull()
      .references(() => user.id)
  },
  (t) => ({ pk: primaryKey({ columns: [t.characterId, t.userId] }) })
);

export const characterLikeRelation = relations(characterLike, ({ one }) => ({
  characters: one(characters, {
    fields: [characterLike.characterId],
    references: [characters.id]
  }),
  user: one(user, {
    fields: [characterLike.userId],
    references: [user.id]
  })
}));
