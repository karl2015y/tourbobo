import { createApp } from 'vue'
import router from './router/router'
import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-TW'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import App from './App.vue'

// 自訂樣式
import './style/animate.sass'

import './index.css'
// 動畫
import 'animate.css';

import QRouterLink from "@/components/QRouterLink.vue";

createApp(App)
  .use(Quasar, {
    plugins: {},
    lang: quasarLang,
  })
  .use(createPinia())
  .use(router)
  .component("QRouterLink", QRouterLink)
  .mount('#app')

