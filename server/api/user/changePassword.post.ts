import { z } from "zod";
const schema = z.object({
  userId: z.coerce.number().positive().lt(99999999),
  oldPassword: z.string().min(8).max(20),
  newPassword: z.string().min(8).max(20),
  repeatNewPassword: z.string().min(8).max(20)
});

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event);
  const { userId, oldPassword, newPassword, repeatNewPassword } =
    await readValidatedBody(event, schema.parse);

  if (!oldPassword || !newPassword || !repeatNewPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (newPassword !== repeatNewPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords don't match"
    });
  }

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not logged in"
    });
  }

  if (user?.userId === userId) {
    const dbUser = await useDrizzle()
      .select()
      .from(tables.user)
      .where(eq(tables.user.id, userId))
      .get();
    if (!dbUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "User not found"
      });
    }

    const passwordCheck = await verifyPassword(dbUser.password, oldPassword);

    if (!passwordCheck) {
      throw createError({
        statusCode: 400,
        statusMessage: "Wrong Password"
      });
    }

    try {
      const newUserPassword = await useDrizzle()
        .update(tables.user)
        .set({ password: await hashPassword(newPassword) })
        .where(eq(tables.user.id, userId))
        .returning({
          id: tables.user.id,
          username: tables.user.username,
          email: tables.user.email
        })
        .get();
      console.log(newUserPassword);
      if (newUserPassword) {
        return { message: "Success!" };
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `${error}`
      });
    }
  }
});
