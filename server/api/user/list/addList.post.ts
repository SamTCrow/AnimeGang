import { z } from "zod";
import { addList } from "~/server/utils/database";

const schema = z.object({
  userId: z.number(),
  name: z.string()
});

export default defineEventHandler(async (event) => {
  const { userId, name } = await readValidatedBody(event, schema.parse);
  const session = await getUserSession(event);

  if (session.user?.userId === userId) {
    try {
      const list = addList(userId, name);
      return list;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: String(error)
      });
    }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "User not logged in"
    });
  }
});
