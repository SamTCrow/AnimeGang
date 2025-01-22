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
    "@nuxt/image",
    "@nuxthub/core",
    "nuxt-auth-utils",
    "@pinia/nuxt",
    "@nuxt/scripts"
  ],
  hub: {
    cache: true,
    database: true,
    kv: true
  },
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 7 // 1 week
    },
    oauth: {
      google: {
        clientId:
          "",
        clientSecret: "",
        redirectURL: ""
      }
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