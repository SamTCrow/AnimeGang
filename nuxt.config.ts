// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@vueuse/nuxt", "@nuxt/fonts"],
  compatibilityDate: "2024-10-22",
  colorMode: {
    preference: "system",
  },
  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
      },
    ],
  },
});
