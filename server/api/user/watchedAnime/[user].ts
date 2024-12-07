export default defineEventHandler(async (event) => {
  const user = getRouterParam(event, "user");

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "no user provided"
      })
    );
  }

  const session = await getUserSession(event);

  if (+user === session.user?.userId) {
    try {
      const watchedAnime = await useDrizzle()
        .select({ animeId: tables.watchedAnime.animeId })
        .from(tables.watchedAnime)
        .where(eq(tables.watchedAnime.userId, session.user.userId));
      return watchedAnime;
    } catch (error) {
      return sendError(
        event,
        createError({
          status: 400,
          statusMessage: "Database Error" + error
        })
      );
    }
  }
});
