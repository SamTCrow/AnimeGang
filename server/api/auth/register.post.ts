import { sendError } from "#imports";
import type { User } from "~/server/utils/drizzle";
import { z } from "zod";
import { createWantToWatchList } from "~/server/utils/database";

export default defineEventHandler(async (event) => {
  const { username, email, password, repeatPassword } = await readValidatedBody(
    event,
    z.object({
      username: z.string().min(3).max(20),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      repeatPassword: z.string().min(8).max(20)
    }).parse
  );

  if (!username || !email || !password || !repeatPassword) {
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

    password: await hashPassword(password)
  };

  try {
    const user = await useDrizzle()
      .insert(tables.user)
      .values({
        ...userData,
        verified: true
      })
      .onConflictDoNothing()
      .returning({
        id: tables.user.id,
        username: tables.user.username,
        email: tables.user.email
      })
      .get();
    await createWantToWatchList(user.id);

    // add email verification

    await setUserSession(event, {
      user: {
        userName: user.username,
        userId: user.id,
        email: user.email
      },
      loggedInAt: Date.now()
    });

    return {
      body: user
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists"
    });
  }
});
