import { z } from "zod";
import { addAnimeToList } from "~/server/utils/database";

const schema = z.object({
  listId: z.number().positive().lt(9999999999),
  animeId: z.number().positive().lt(9999999999),
  animeName: z.string()
});

export default defineEventHandler(async (event) => {
  const { listId, animeId, animeName } = await readValidatedBody(
    event,
    schema.parse
  );
  const { user } = await getUserSession(event);
  const listUser = await useDrizzle()
    .select({ id: tables.list.userId })
    .from(tables.list)
    .where(eq(tables.list.id, listId))
    .get();

  if (user?.userId === listUser?.id) {
    try {
      const addAnime = await addAnimeToList(listId, animeId, animeName);
      return addAnime;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `${error}`
      });
    }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "You need to log in"
    });
  }
});
