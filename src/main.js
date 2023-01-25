import Vue from 'vue'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang'
import './permission'

import * as filters from './filters'
import * as tree from '@/plugin/vue-tree-chart'
import * as Orgtree from '@/plugin/vue2Orgtree'
import './assets/tailwind/index.css'
import ClickOutside from 'v-click-outside'
Vue.directive('click-outside', ClickOutside)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(tree)
Vue.use(Orgtree)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
