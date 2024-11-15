import { z } from "zod";

const schema = z.object({
  id: z.number()
});


export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, schema.parse);

  // check if id is in database and if it is return the anime
  //if id is not in db, fetch from external api and add it to db
  
});
