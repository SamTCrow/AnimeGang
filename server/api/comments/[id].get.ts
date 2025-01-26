import { isNull } from "drizzle-orm";

import { z } from "zod";

const schema = z.object({
  page: z.coerce.number().positive().lt(999).catch(1)
}).parse;

export default defineEventHandler(async (event) => {
  const animeId = z.coerce
    .number()
    .positive()
    .lt(9999999)
    .parse(getRouterParam(event, "id"));
  const { page } = await getValidatedQuery(event, schema);

  const pageSize = 10;

  try {
    const totalItems = await useDrizzle().$count(
      tables.comments,
      and(
        eq(tables.comments.referenceId, animeId),
        isNull(tables.comments.parentId)
      )
    );
    const commentsList = await useDrizzle().query.comments.findMany({
      where: and(
        eq(tables.comments.referenceId, animeId),
        isNull(tables.comments.parentId)
      ),
      columns: {
        author: false
      },

      with: {
        user: {
          columns: {
            username: true
          }
        },
        children: {
          columns: { id: true },
          limit: 1000
        }
      },

      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (comments, { desc }) => [desc(comments.createdAt)]
    });

    return {
      items: totalItems,
      commentsList
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `${error}`
    });
  }
});
