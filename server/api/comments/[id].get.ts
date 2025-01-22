import { isNull } from "drizzle-orm";
import { user } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const animeId = Number(getRouterParam(event, "id"));

  try {
    const comments = await useDrizzle()
      .select({
        id: tables.comments.id,
        author: tables.user.username,
        createdAt: tables.comments.createdAt,
        message: tables.comments.message,
        parentId: tables.comments.parentId
      })
      .from(tables.comments)
      .where(
        and(
          eq(tables.comments.referenceId, animeId),
          isNull(tables.comments.parentId)
        )
      )
      .leftJoin(tables.user, eq(user.id, tables.comments.author));

    return comments;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `${error}`
    });
  }
});
