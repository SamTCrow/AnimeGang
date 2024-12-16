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

  const { user: loggedUser } = await  getUserSession(event)
  
});
