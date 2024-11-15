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

  const passwordCheck = await verifyPassword(user.password, password);

  if (!passwordCheck) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Wrong password" })
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
  await setUserSession(event, {
    user: {
      userName: user.username,
      userId: user.id,
      email: user.email,
      name: user.name
    },
    loggedInAt: Date.now()
  });

  return {
    message: "LogIn successful"
  };
});
