import { z } from "zod";

const schema = z.object({
  characterId: z.number(),
  characterName: z.string(),
  userId: z.number()
}).parse;

export default defineEventHandler(async (event) => {
  const { characterId, characterName, userId } = await readValidatedBody(
    event,
    schema
  );
  const { user } = await getUserSession(event);

  if (!userId || !characterId || !characterName) {
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
      .insert(tables.characterLike)
      .values({
        userId,
        characterId,
        characterName
      })
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
