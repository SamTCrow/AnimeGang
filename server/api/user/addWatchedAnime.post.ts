import { z } from "zod";

const schema = z.object({
  userId: z.number(),
  animeId: z.number()
});

export default eventHandler(async (event) => {
  const { userId, animeId } = await readValidatedBody(event, schema.parse);
  const session = await getUserSession(event);

  if (!userId && animeId) {
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
        .values({ userId, animeId })
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
