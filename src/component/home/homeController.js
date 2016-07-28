export default class homeController {
  constructor(request, $timeout) {
    this.request = request
    this.$timeout = $timeout
    this.getData()
  }

  getData() {
    this.request.getData({
      path: '/api/blog/getbloglist/1',
      way: 'GET',
      parm: '',
      cb: data => {
        this.dealData(data)
        this.blogs = data;
      }
    })
  }

  blogByTag(event) {
    let html = event.target.innerHTML
    this.request.getData({
      path: '/api/blog/getblogbytag?pagesize=1',
      way: 'GET',
      parm: {
        tags: html
      },
      cb: data => {
        this.dealData(data)
        this.blogs = data
      }
    })
  }

  dealData(data) {
    data.forEach(function(value) {
      value.create_date = value.create_date.split('T')[0]
    })
    this.$timeout(function() {
      let blogBody = document.getElementsByClassName('blog_body')
      data.forEach(function(value, index) {
        blogBody[index].innerHTML = value.content
      })
    })
  }
}

homeController.$inject = ['request', '$timeout']
