import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './app.route'
import VueFilter from './filter'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueFilter)

const router = new VueRouter({
  saveScrollPosition: true,
  history: true
})

configRouter(router)

/* eslint-disable no-new */
router.start(App, 'app')
