import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import lang from './i18n/lang'

import App from './App.vue'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: lang
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
