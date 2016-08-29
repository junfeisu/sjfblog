export default class homeController {
  constructor(request, $timeout) {
    this.request = request
    this.$timeout = $timeout
    this.prev = false
    this.next = true
    this.total = []
    this.cursor = ''
    this.getCursor()
    this.getTag()
  }
  // get the latest blog time
  getCursor() {
    this.request.getData({
      path: '/api/blog/getnewcursor',
      parm: '',
      cb: data => {
        this.cursor = data[0].create_date
        this.getData()
      }
    })
  }
  // get the blog list
  getData() {
    this.request.getData({
      path: '/api/blog/getbloglist/' + this.cursor,
      parm: '',
      cb: data => {
        let total = Math.ceil(data.total / 10)
        this.dealData(data)
        this.blogs = data.blogs;
        if (total === 1) {
          this.total = [1]
          this.next = false
        } else {
          for(let i = 0; i < total; i++) {
            this.total.push(i + 1)
          }
        }
      }
    })
  }
  // deal the blog list 
  dealData(data) {
    this.$timeout(function() {
      let blogBody = document.getElementsByClassName('blog_body')
      data.blogs.forEach(function(value, index) {
        if (index === 0) {
          self.cursor = value.create_date
        }
        blogBody[index].innerHTML = value.content
      })
    })
  }
  // get the bloglist by tag
  blogByTag(event) {
    let html = event.target.innerHTML.replace(/\([0-9]\)*/g, '')
    console.log(html)
    this.request.getData({
      path: '/api/blog/getlistbytag/' + html,
      way: 'GET',
      parm: '',
      cb: data => {
        this.dealData(data)
        this.blogs = data.blogs
      }
    })
  }
  // get the tags and time (right sidebar)
  getTag() {
    this.request.getData({
      path: '/api/blog/getblogtype',
      parm: '',
      cb: data => {
        this.tags = data.tags
        data.times.forEach(function(value, index) {
          data.times[index]._id = value._id.split(':')[0]
        })
        this.times = data.times
      }
    }) 
  }
}

homeController.$inject = ['request', '$timeout']
