export default class homeController {
  constructor(request, $timeout) {
    this.request = request
    this.$timeout = $timeout
    this.cursor = ''
    this.getCursor()
    this.getTag()
  }
  // get the latest blog create_date
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
  
  getData() {
    this.request.getData({
      path: '/api/blog/getbloglist/' + this.cursor,
      parm: '',
      cb: data => {
        this.dealData(data)
        this.blogs = data;
      }
    })
  }

  getTag() {
    this.request.getData({
      path: '/api/blog/getblogtype',
      parm: '',
      cb: data => {
        this.tags = data.tags[0]._id
        this.times = data.times[0]._id
      }
    }) 
  }

  blogByTag(event) {
    let html = event.target.innerHTML
    this.request.getData({
      path: '/api/blog/getlistbytag/' + this.cursor + '/' + html,
      way: 'GET',
      parm: '',
      cb: data => {
        this.dealData(data)
        this.blogs = data
      }
    })
  }

  dealData(data) {
    this.$timeout(function() {
      let blogBody = document.getElementsByClassName('blog_body')
      data.forEach(function(value, index) {
        console.log(this)
        if(index === 0) {
          self.cursor = value.create_date
        }
        blogBody[index].innerHTML = value.content
      })
    })
  }
}

homeController.$inject = ['request', '$timeout']
