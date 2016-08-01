export default class detailController {
  constructor(request, $stateParams, $timeout) {
    this.request = request
    this.params = $stateParams
    this.$timeout = $timeout
    this.blog = {}
    this.getData()
    this.getTag()
  }

  getData() {
    this.request.getData({
      path: '/api/blog/getblogbyid',
      way: 'POST',
      parm: {
        _id: this.params.blogId
      },
      cb: data => {
        this.blog.currentBlog = data[0]
        this.getNearBlog(data[0].create_date)
        this.dealData(data)
      }
    })
  }

  getTag() {
    this.request.getData({
      path: '/api/blog/getblogtype',
      parm: '',
      cb: data => {
        this.tags = data.tags
        data.times.forEach(function(value, index) {
          data.times[index]._id = Date.parse(data.times[index]._id)
        })
        this.times = data.times
      }
    })
  }

  getNearBlog(cursor) {
    this.request.getData({
      path: '/api/blog/getnearblog/' + cursor,
      parm: '',
      cb: data => {
        this.blog.prevBlog = data.prevBlog
        this.blog.nextBlog = data.nextBlog
        console.log(this.blog)
      }
    })
  }

  dealData(data) {
    this.$timeout(function() {
      var content = document.getElementsByClassName('article_content')[0]
      content.innerHTML = data[0].content.replace(/\<pre\>/g, '<pre class="prettyprint">')
      content.innerHTML = content.innerHTML.replace(/\<h3\>/g, '<h3 class="pretty_h3">')
      content.innerHTML = content.innerHTML.replace(/\<h5\>/g, '<h5 class="pretty_h5">')
      content.innerHTML = content.innerHTML.replace(/\<code\>/g, '<code class="pretty_code">')
      data[0].create_date = Date.parse(data[0].create_date)
    })
  }
}

detailController.$inject = ['request', '$stateParams', '$timeout'];
