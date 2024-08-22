import { defineNuxtPlugin } from '#app'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElementPlus, {
      locale: zhCn,
  })
})