import type { AnimePost, characterPost, GenrePost } from "./drizzle";

export const getUserByUsername = async (username: string) => {
  const user = await useDrizzle()
    .select()
    .from(tables.user)
    .where(eq(tables.user.username, username))
    .get();

  return user;
};

export const getAnimeById = async (id: number) => {
  const anime = await useDrizzle()
    .select()
    .from(tables.anime)
    .where(eq(tables.anime.id, id))
    .get();

  return anime;
};

export const insertAnime = async (animeInsert: AnimePost) => {
  try {
    const anime = await useDrizzle()
      .insert(tables.anime)
      .values(animeInsert)
      .returning()
      .get();

    return anime;
  } catch (err) {
    console.log(err);
    return {
      errorCode: 400,
      errorMessage: "DB Error"
    };
  }
};

export const insertGenre = async (genre: GenrePost) => {
  try {
    const newGenre = await useDrizzle()
      .insert(tables.genres)
      .values(genre)
      .onConflictDoNothing()
      .returning()
      .get();
    return newGenre;
  } catch (error) {
    console.log(error);
    return {
      error: {
        errorCode: 400,
        errorMessage: "DB Error"
      }
    };
  }
};

export const insertAnimeToGenre = async (animeID: number, genreID: number) => {
  try {
    const animeToGenre = await useDrizzle()
      .insert(tables.animeToGenres)
      .values({
        animeId: animeID,
        genreId: genreID
      })
      .returning()
      .get();
    return animeToGenre;
  } catch (error) {
    console.log(error);
    return {
      errorCode: 400,
      errorMessage: "DB Error"
    };
  }
};

export const insertCharacter = async (character: characterPost) => {
  try {
    const char = await useDrizzle()
      .insert(tables.characters)
      .values(character)
      .onConflictDoNothing()
      .returning()
      .get();
    return char;
  } catch (error) {
    console.log(error, character);
    return {
      errorCode: 400,
      errorMessage: "DB Error"
    };
  }
};

export const insertCharacterToAnime = async (
  animeID: number,
  charID: number,
  role: string = ""
) => {
  try {
    const charToAnime = await useDrizzle()
      .insert(tables.characterToAnime)
      .values({
        animeId: animeID,
        characterId: charID,
        role: role
      })
      .returning()
      .get();
    return charToAnime;
  } catch (error) {
    console.log(error, animeID, charID);
    return {
      errorCode: 400,
      errorMessage: "DB Error"
    };
  }
};

export const insertRelatedAnime = async (
  animeID: number,
  relID: number,
  relation: string
) => {
  try {
    const animeRelations = await useDrizzle()
      .insert(tables.relatedAnime)
      .values({
        animeId: animeID,
        relatedAnimeId: relID,
        relationType: relation
      })
      .returning()
      .get();
    return animeRelations;
  } catch (error) {
    console.log(error);
    return {
      errorCode: 400,
      errorMessage: "DB Error"
    };
  }
};
