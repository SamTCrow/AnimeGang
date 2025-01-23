import { z } from "zod";
import { deleteAnimeFromList } from "~/server/utils/database";
const schema = z.object({
  listId: z.number().min(0).max(9999999999),
  animeId: z.number().min(0).max(9999999999)
}).parse;

export default defineEventHandler(async (event) => {
  const { listId, animeId } = await readValidatedBody(event, schema);
  const { user } = await getUserSession(event);
  if (user) {
    const list = await getListById(+listId);
    if (list?.list?.userId === user.userId) {
      await deleteAnimeFromList(listId, animeId);
      return { success: true };
    } else {
      throw createError({
        status: 400,
        statusMessage:
          "You don't have permission to delete this anime from this list"
      });
    }
  }
});
