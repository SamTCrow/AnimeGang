// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().override("nuxt/vue/rules", {
  rules: {
    // ...Override rules, for example:
    "vue/html-self-closing": "off"
  }
});
