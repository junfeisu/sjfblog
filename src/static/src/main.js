import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './app.route'
import VueFilter from './filter'
import res from '../res'

Vue.use(VueRouter)
Vue.use(VueFilter)

const router = new VueRouter({
  saveScrollPosition: true
})

window.res = res

configRouter(router)

/* eslint-disable no-new */
router.start(App, 'app')
