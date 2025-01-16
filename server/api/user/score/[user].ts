import { getUserScores } from "~/server/utils/database";

export default defineEventHandler(async (event) => {
  const user = Number(getRouterParam(event, "user"));

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "no user provided"
      })
    );
  }

  try {
    const likedChar = getUserScores(user);
    return likedChar;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    });
  }
});
