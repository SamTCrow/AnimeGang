import { z } from "zod";

export default defineEventHandler(async (event) => {
  const commentId = z.coerce
    .number()
    .positive()
    .lt(99999999)
    .parse(getRouterParam(event, "id"));

  try {
    const repliesList = await useDrizzle().query.comments.findMany({
      where: eq(tables.comments.parentId, commentId),
      with: {
        user: {
          columns: {
            username: true
          }
        }
      },
      limit: 500
    });
    
    return repliesList;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `${error}`
    });
  }
});
