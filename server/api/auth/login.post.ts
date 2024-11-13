export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Username not found" })
    );
  }

  if (!user.verified) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "User not verified"
      })
    );
  }

  const passwordCheck = await verifyPassword(user.password, password);

  if (!passwordCheck) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Wrong password" })
    );
  }

  await setUserSession(event, {
    user: { userName: user.username, userId: user.id, email: user.email },
    loggedInAt: Date.now()
  });

  const session = await getUserSession(event);

  
  return {
    message: "Logged in Successfully!",
    session: session
  };
});
