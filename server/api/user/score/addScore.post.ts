import { z } from "zod";
import { addUserScore } from "~/server/utils/database";
const schema = z.object({
  userId: z.number().positive().lt(9999999999),
  animeId: z.number().positive().lt(9999999999),
  score: z.number().positive().lt(9999999999)
}).parse;

export default defineEventHandler(async (event) => {
  const { userId, animeId, score } = await readValidatedBody(event, schema);
  const { user } = await getUserSession(event);
  if (!userId || !animeId || !score) {
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
    const newScore = addUserScore(userId, animeId, score);
    return newScore;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Db error" + error
    });
  }
});
