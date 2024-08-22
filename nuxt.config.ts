// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    shim: false
  },
  modules: ['@element-plus/nuxt'],
  css: [
    'element-plus/dist/index.css',
    '~/styles/global.css',
    '~/assets/styles/tailwind.scss',
    '~/assets/css/global.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  plugins: [
    '~/plugins/echarts.client.ts',
    '~/plugins/element-plus.js',
    '~/plugins/axios.ts'
  ]
})
