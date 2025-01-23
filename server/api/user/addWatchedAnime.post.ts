import { z } from "zod";

const schema = z.object({
  userId: z.number().min(0).max(9999999999),
  animeId: z.number().min(0).max(9999999999),
  animeName: z.string()
});

export default eventHandler(async (event) => {
  const { userId, animeId, animeName } = await readValidatedBody(
    event,
    schema.parse
  );
  const session = await getUserSession(event);

  if (!userId || !animeId || !animeName) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid Params"
      })
    );
  }

  if (session.user?.userId === userId) {
    try {
      const watched = await useDrizzle()
        .insert(tables.watchedAnime)
        .values({ userId, animeId, animeName })
        .returning()
        .get();
      return watched;
    } catch (error) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Can't add anime to list: " + error
        })
      );
    }
  }
});
