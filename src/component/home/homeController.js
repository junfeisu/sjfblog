export default class homeController {
  constructor(request, $timeout) {
    this.request = request
    this.getData()
    this.$timeout = $timeout
  }

  getData() {
    this.request.getData({
      path: '/api/blog/getbloglist',
      way: 'GET',
      parm: '',
      cb: data => {
        this.blogs = data
        this.$timeout(function() {
          let blogBody = document.getElementsByClassName('blog_body')
          data.forEach(function(value, index) {
            blogBody[index].innerHTML = value.content
          })
        })
      }
    })
  }
}

homeController.$inject = ['request', '$timeout']
