import {
  createWantToWatchList,
  findUserByEmail
} from "~/server/utils/database";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const isRegistered = await findUserByEmail(user.email);

    if (!isRegistered) {
      const userData: User = {
        username: user.name,
        email: user.email,
        password: "",
        verified: true
      };

      const newUser = await useDrizzle()
        .insert(tables.user)
        .values({
          ...userData
        })
        .returning({
          id: tables.user.id,
          username: tables.user.username,
          email: tables.user.email
        })
        .get();

      await createWantToWatchList(newUser.id);
      await setUserSession(event, {
        user: {
          userName: newUser.username,
          userId: newUser.id,
          email: newUser.email
        },
        loggedInAt: Date.now()
      });
      return sendRedirect(event, "/");
    }
    await setUserSession(event, {
      user: {
        userName: isRegistered.username,
        userId: isRegistered.id,
        email: isRegistered.email
      },
      loggedInAt: Date.now()
    });
    return sendRedirect(event, "/");
  }
});
