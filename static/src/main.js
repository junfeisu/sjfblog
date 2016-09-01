import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './app.route'


Vue.use(VueRouter)

const router = new VueRouter ({
  saveScrollPosition: true,
  history: true
})

configRouter(router)

/* eslint-disable no-new */
router.start(App, 'app')