import { z } from "zod";
const schema = z.object({
  newUserName: z.string().min(3).max(20)
}).parse;

export default defineEventHandler(async (event) => {
  const { newUserName } = await readValidatedBody(event, schema);
  const { user } = await getUserSession(event);

  if (!newUserName) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid params"
    });
  }

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "You need to be logged in!"
    });
  }

  try {
    const changedUserName = await useDrizzle()
      .update(tables.user)
      .set({ username: newUserName })
      .where(eq(tables.user.id, user.userId))
      .returning({ userName: tables.user.username })
      .get();
    if (!changedUserName) {
      return {
        message: "Username already in use"
      };
    }
    await replaceUserSession(event, {
      user: {
        userId: user.userId,
        userName: changedUserName.userName,
        email: user.email
      },
      loggedInAt: Date.now()
    });
    return {
      message: "Success!"
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Username already taken",
      message: `${error}`
    });
  }
});
