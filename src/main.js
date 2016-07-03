import Vue from 'vue';
import VueRouter from 'vue-router';

const App = Vue.extend({});
Vue.use(VueRouter);
const router = new VueRouter();

router.map({
  '/login': {
    component: function(resolve) {
      require(['./components/login.vue'], resolve)
    }
  },
  '/signup': {
    component: function(resolve) {
      require(['./components/signup.vue'], resolve)
    }
  },
  '/index': {
    component: function(resolve) {
      require(['./components/index.vue'], resolve)
    }
  },
  '/about': {
    component: function(resolve) {
      require(['./components/about.vue'], resolve)
    }
  },
  '/detail': {
    component: function(resolve) {
      require(['./components/detail.vue'], resolve)
    }
  },
});

router.redirect({
  '*': '/index'
})

router.start(App, 'body');
