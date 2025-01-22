import { createWantToWatchList } from "~/server/utils/database";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const isRegistered = await getUserByUsername(user.sub);
    if (!isRegistered) {
      const userData: User = {
        username: user.sub,
        email: user.email,
        name: user.name,
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
          email: tables.user.email,
          name: tables.user.name
        })
        .get();

      await createWantToWatchList(newUser.id);
      await setUserSession(event, {
        user: {
          userName: newUser.username,
          userId: newUser.id,
          email: newUser.email,
          name: newUser.name
        },
        loggedInAt: Date.now()
      });
      return sendRedirect(event, "/");
      
    }
    await setUserSession(event, {
      user: {
        userName: isRegistered.username,
        userId: isRegistered.id,
        email: isRegistered.email,
        name: isRegistered.name
      },
      loggedInAt: Date.now()
    });
    return sendRedirect(event, "/");
  }
});
