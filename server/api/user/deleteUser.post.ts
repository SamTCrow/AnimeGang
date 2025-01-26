import { z } from "zod";

const schema = z.object({
  agree: z.literal("YES")
}).parse;

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event);
  const { agree } = await readValidatedBody(event, schema);

  if (user && agree) {
    try {
      await useDrizzle()
        .delete(tables.list)
        .where(eq(tables.list.userId, user.userId));
      await useDrizzle()
        .delete(tables.comments)
        .where(eq(tables.comments.author, user.userId));
      await useDrizzle()
        .delete(tables.characterLike)
        .where(eq(tables.characterLike.userId, user.userId));
      await useDrizzle()
        .delete(tables.score)
        .where(eq(tables.score.userID, user.userId));
      await useDrizzle()
        .delete(tables.watchedAnime)
        .where(eq(tables.watchedAnime.userId, user.userId));
      await useDrizzle()
        .delete(tables.user)
        .where(eq(tables.user.id, user.userId));
      return "Success";
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `${error}`
      });
    }
  }
});
