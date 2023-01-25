import ElementUI from 'element-ui'
import '@/assets/styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
import ClickOutside from 'vue-click-outside'
import Vue from 'vue'
import i18n from './lang'
import store from './store'
import App from './App.vue'

import '@/assets/styles/index.scss' // global css

import './permission'

import router from '@/router'
import * as filters from './filters'
import * as tree from '@/plugin/vue-tree-chart'
import * as Orgtree from '@/plugin/vue2Orgtree'
import '@/assets/styles/tailwind/index.scss'

Vue.directive('click-outside', ClickOutside)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(tree)
Vue.use(Orgtree)
Vue.config.productionTip = false
Vue.config.devtools = true

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
