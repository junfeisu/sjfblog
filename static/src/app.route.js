import blog from './components/blog/blog.vue'
import blogList from './components/blog/list.vue'

export default function configRouter (router) {
  router.map({
    '/': {
      name: 'blog',
      docTitle: 'blog',
      component: blog,
      subRoutes: {
        '/': {
          name: 'blogList',
          component: blogList
        },
        '/detail/:id': {
          name: 'blogDetail',
          component: resolve => {
            require.ensure(['./components/blog/detail.vue'], () => {
              resolve(require('./components/blog/detail.vue'))
            })
          }
        }
      }
    },
    '/about': {
      name: 'about',
      component: resolve => {
        require.ensure(['./components/about/about.vue'], () => {
          resolve(require('./components/about/about.vue'))
        })
      },
      docTitle: 'about'
    },
    '/demo': {
      name: 'demo',
      component: resolve => {
        require.ensure(['./components/demo/demo.vue'], () => {
          resolve(require('./components/demo/demo.vue'))
        })
      },
      docTitle: 'Demo'
    }
  })
  router.afterEach(function (transition) {
    document.title = transition.to.docTitle || 'SJF'
  })
}
