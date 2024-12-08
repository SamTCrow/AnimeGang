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
      const list = await useDrizzle()
        .select()
        .from(tables.list)
        .where(eq(tables.list.userId, session.user.userId));
      return list;
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
