
import type { List, listToAnime } from "./drizzle";

export const getUserByUsername = async (username: string) => {
  const user = await useDrizzle()
    .select()
    .from(tables.user)
    .where(eq(tables.user.username, username))
    .get();

  return user;
};

export const createWantToWatchList = async (userid: number) => {
  try {
    const wantToWatch = await useDrizzle()
      .insert(tables.list)
      .values({
        name: "Want to watch",
        userId: userid
      })
      .returning()
      .get();
    return wantToWatch;
  } catch (error) {
    console.log(error);
    return {
      errorCode: 400,
      errorMessage: "DB Error"
    };
  }
};

export const getUserLists = async (userId: number) => {
  try {
    const lists = await useDrizzle()
      .select()
      .from(tables.list)
      .leftJoin(
        tables.listToAnime,
        eq(tables.list.id, tables.listToAnime.listId)
      )
      .where(eq(tables.list.userId, userId))
      .all();

    const result = lists.reduce(
      (acc: { list: List; anime: listToAnime[] }[], list) => {
        const goodList = list.list;
        const anime = list.listToAnime;
        const existingList = acc.find((item) => item.list.id === goodList.id);

        if (!existingList) {
          acc.push({ list: goodList, anime: [] });
        }

        if (anime) {
          const updatedList = acc.find((item) => item.list.id === goodList.id);
          if (updatedList) {
            updatedList.anime.push(anime);
          }
        }

        return acc;
      },
      []
    );

    return result;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 400,
      statusMessage: "DB Error" + error
    });
  }
};

export const getListById = async (listId: number) => {
  try {
    const list = await useDrizzle()
      .select()
      .from(tables.list)
      .fullJoin(
        tables.listToAnime,
        eq(tables.list.id, tables.listToAnime.listId)
      )
      .where(eq(tables.list.id, listId))
      .get();
    return list;
  } catch (error) {
    throw createError({
      status: 400,
      statusMessage: "DB error" + error
    });
  }
};

export const addAnimeToList = async (
  listId: number,
  animeId: number,
  animeName: string
) => {
  try {
    const addAnime = await useDrizzle()
      .insert(tables.listToAnime)
      .values({ listId, animeId, animeName })
      .returning()
      .get();
    return addAnime;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `${error}`
    });
  }
};

export const addList = async (userId: number, name: string) => {
  try {
    const newList = await useDrizzle()
      .insert(tables.list)
      .values({ userId, name })
      .returning()
      .get();
    return newList;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
};

export const getCharacterLike = async (userId: number) => {
  try {
    const likedChar = await useDrizzle()
      .select()
      .from(tables.characterLike)
      .where(eq(tables.characterLike.userId, userId));
    return likedChar;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
};

export const getUserScores = async (userId: number) => {
  try {
    const userScores = await useDrizzle()
      .select()
      .from(tables.score)
      .where(eq(tables.score.userID, userId));
    return userScores;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
};

export const addUserScore = async (
  userId: number,
  animeId: number,
  score: number
) => {
  try {
    const newScore = await useDrizzle()
      .insert(tables.score)
      .values({
        userID: userId,
        animeID: animeId,
        score
      })
      .onConflictDoUpdate({
        target: [tables.score.animeID, tables.score.userID],
        set: { score: score }
      })
      .returning()
      .get();
    return newScore;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
};

export const deleteAnimeFromList = async (listId: number, animeId: number) => {
  try {
    const deleteAnime = await useDrizzle()
      .delete(tables.listToAnime)
      .where(
        and(
          eq(tables.listToAnime.listId, listId),
          eq(tables.listToAnime.animeId, animeId)
        )
      )
      .returning()
      .get();
    return deleteAnime;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await useDrizzle()
      .select()
      .from(tables.user)
      .where(eq(tables.user.email, email))
      .get();
    return user;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
};
