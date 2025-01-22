import { getUserLists } from "~/server/utils/database";

export default defineEventHandler(async (event) => {
  const user = getRouterParam(event, "user");

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
    const lists = await getUserLists(+user);
    return lists;
  } catch (error) {
    return sendError(
      event,
      createError({
        status: 400,
        statusMessage: "Database Error" + error
      })
    );
  }
});
