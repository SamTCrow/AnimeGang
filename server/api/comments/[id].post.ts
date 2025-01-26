import { z } from "zod";
const schema = z.object({
  author: z.number().positive().lt(9999999999),
  message: z.string().min(1).max(1000),
  parentId: z.number().positive().or(z.null()).or(z.undefined()),
  referenceType: z.string().or(z.undefined())
}).parse;

export default defineEventHandler(async (event) => {
  const { author, message, referenceType, parentId } = await readValidatedBody(
    event,
    schema
  );
  const referenceId = Number(getRouterParam(event, "id"));
  const { user } = await getUserSession(event);

  if (user?.userId === author) {
    try {
      const comment = await useDrizzle()
        .insert(tables.comments)
        .values({
          author,
          message,
          referenceId,
          referenceType,
          parentId,
          createdAt: new Date()
        })
        .returning()
        .get();
      return comment;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `${error}`
      });
    }
  }
});
