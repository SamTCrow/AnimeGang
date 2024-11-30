import { sendError } from "#imports";
import type { User } from "~/server/utils/drizzle";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { username, email, password, repeatPassword, name } =
    await readValidatedBody(
      event,
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        repeatPassword: z.string(),
        name: z.string()
      }).parse
    );

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (password.length < 8) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Password must be at least 8 characters"
      })
    );
  }

  if (password != repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Passwords don't match" })
    );
  }

  const userData: User = {
    username,
    email,
    name,
    password: await hashPassword(password)
  };

  const user = await useDrizzle()
    .insert(tables.user)
    .values({
      ...userData
    })
    .onConflictDoNothing()
    .returning({
      id: tables.user.id,
      username: tables.user.username,
      email: tables.user.email,
      name: tables.user.name
    })
    .get();

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        message: "User already exist"
      })
    );
  }

  const wantToWatch = await useDrizzle()
    .insert(tables.list)
    .values({
      userId: user.id,
      name: "Want to watch"
    })
    .returning()
    .get();

  if (!wantToWatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        message: "List Error"
      })
    );
  }

  // add email verification

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
    body: user
  };
});
