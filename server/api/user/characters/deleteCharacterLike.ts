import { z } from "zod";

const schema = z.object({
  characterId: z.number().positive().lt(9999999999),
  userId: z.number().positive().lt(9999999999)
}).parse;

export default defineEventHandler(async (event) => {
  const { characterId, userId } = await readValidatedBody(event, schema);
  const { user } = await getUserSession(event);

  if (!userId || !characterId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing params"
    });
  }

  if (userId !== user?.userId) {
    throw createError({
      statusCode: 502,
      statusMessage: "Authentication error"
    });
  }

  try {
    const likeChar = await useDrizzle()
      .delete(tables.characterLike)
      .where(
        and(
          eq(tables.characterLike.characterId, characterId),
          eq(tables.characterLike.userId, userId)
        )
      )
      .returning()
      .get();
    return likeChar;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Db error" + error
    });
  }
});
