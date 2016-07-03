import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from './components/Hello.vue';
import Sujunfei from './components/Sujunfei.vue';

const App=Vue.extend({});
Vue.use(VueRouter);
const router = new VueRouter();

router.map({
  '/sjf': {
    component: Sujunfei
    },
  '/hello': {
    component: Hello
  },
});

router.redirect({
	'/':''
})

router.start(App, 'body');
