export const getUserByUsername = async (username: string) => {
  const user = await useDrizzle()
    .select()
    .from(tables.user)
    .where(eq(tables.user.username, username))
    .get();

  return user;
};

