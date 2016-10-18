import blog from './components/blog/blog.vue'
import blogList from './components/blog/list.vue'
import blogDetail from './components/blog/detail.vue'
import About from './components/about/about.vue'
import Resume from './components/resume/resume.vue'

// import Demo from './components/demo/demo.vue'

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
          component: blogDetail
        }
      }
    },
    '/about': {
      name: 'about',
      component: About,
      docTitle: 'about'
    },
    '/resume': {
      name: 'resume',
      component: Resume,
      docTitle: 'resume'
    }
    // '/demo': {
    //   name: 'demo',
    //   component: Demo,
    //   docTitle: 'Demo'
    // },
  })
  router.afterEach(function (transition) {
    document.title = transition.to.docTitle || 'SJF'
  })
}
