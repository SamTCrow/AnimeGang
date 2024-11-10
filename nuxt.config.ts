// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "AnimeGang",
      htmlAttrs: {
        lang: "en"
      }
    }
  },

  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxt/fonts",
    // "nuxt-graphql-client"
    "@nuxt/image",
    "@nuxthub/core"
  ],
  hub: {
    cache: true,
    database: true,
    kv: true
  },
  runtimeConfig: {
    public: {
      // GQL_HOST: "https://graphql.anilist.co"
    }
  },

  compatibilityDate: "2024-10-22",
  colorMode: {
    preference: "system"
  },
  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google"
      }
    ]
  }
});
