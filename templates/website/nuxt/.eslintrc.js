module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended'],
  plugins: [],
  rules: {
    'no-unused-vars': 'off' // @typescript-eslint/no-unused-vars is used instead
  }
}
