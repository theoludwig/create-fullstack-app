export default {
  dev: process.env.NODE_ENV !== 'production',
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Global CSS
   */
  css: ['@/assets/styles/normalize.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      '@nuxtjs/pwa',
      {
        name: '{{ projectName }}',
        description: '{{ projectDescription }}',
        workbox: {
          clientsClaim: false
        },
        icon: true,
        meta: {
          name: '{{ projectName }}',
          theme_color: '#ffd800',
          ogHost: '{{ domainName }}',
          twitterCard: 'summary'
        },
        manifest: {
          name: '{{ projectName }}',
          description: '{{ projectDescription }}',
          short_name: '{{ projectName }}',
          theme_color: '#ffd800',
          background_color: '#181818',
          start_url: '/',
          display: 'standalone'
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
}
