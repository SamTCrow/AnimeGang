import { z } from "zod";
import { addAnimeToList } from "~/server/utils/database";

const schema = z.object({
  listId: z.number(),
  animeId: z.number(),
  animeName: z.string()
});

export default defineEventHandler(async (event) => {
  const { listId, animeId, animeName } = await readValidatedBody(
    event,
    schema.parse
  );
  const session = await getUserSession(event);

  if (session) {
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
