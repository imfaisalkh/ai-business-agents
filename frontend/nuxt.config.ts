import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  srcDir: 'app',

  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  typescript: {
    strict: true,
  },

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
      extensions: ['.vue'],
    },
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue'],
    },
  ],

  app: {
    head: {
      title: 'AI Business Agents - Ideas Dashboard',
      meta: [
        { name: 'description', content: 'View and manage your business ideas and artifacts' }
      ],
    }
  }
})
