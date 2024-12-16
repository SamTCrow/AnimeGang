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
          "272972600238-thoehn9uuipm8tpkvoc6hkc8ch36do1j.apps.googleusercontent.com",
        clientSecret: "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",
        redirectURL: "http://localhost:3000/api/auth/google"
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