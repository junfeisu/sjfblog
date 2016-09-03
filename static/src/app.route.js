import blog from './components/blog/blog.vue'
import blogList from './components/blog/list.vue'
import blogDetail from './components/blog/detail.vue'

// import Demo from './components/demo/demo.vue'
// import Resume from './components/resume/resume.vue'
// import About from './components/about/about.vue'

export default function configRouter (router) {
  router.map({
    '/blog': {
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
    }
    // '/demo': {
    //   name: 'demo',
    //   component: Demo,
    //   docTitle: 'Demo'
    // },
    // '/about': {
    //   name: 'about',
    //   component: About,
    //   docTitle: 'about'
    // },
    // '/resume': {
    //   name: 'resume',
    //   component: Resume,
    //   docTitle: 'resume'
    // }
  })
  router.afterEach(function (transition) {
    document.title = transition.to.docTitle || 'SJF'
  })
}
