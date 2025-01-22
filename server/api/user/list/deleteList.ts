import { z } from "zod";

const schema = z.object({
  listId: z.string()
}).parse;

export default defineEventHandler(async (event) => {
  const { listId } = await getValidatedQuery(event, schema);
  const { user } = await getUserSession(event);

  try {
    if (user) {
      const list = await useDrizzle()
        .delete(tables.list)
        .where(
          and(eq(tables.list.id, +listId), eq(tables.list.userId, user.userId))
        )
        .returning()
        .get();
      return list;
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "" + error
    })
  }
});
