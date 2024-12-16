import { getListById } from "~/server/utils/database";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "id");

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
