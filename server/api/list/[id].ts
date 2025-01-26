import { getListById } from "~/server/utils/database";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const listId = z.coerce.number().parse(getRouterParam(event, "id"));

  if (!listId) {
    throw createError({
      status: 400,
      statusMessage: "No list id provided"
    });
  }

  try {
    const list = await getListById(+listId);
    return list;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "" + error
    });
  }
});
