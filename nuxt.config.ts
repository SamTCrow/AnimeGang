// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "AnimeGang",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
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