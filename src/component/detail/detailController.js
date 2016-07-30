export default class detailController {
  constructor(request, $stateParams, $timeout) {
    this.request = request
    this.params = $stateParams
    this.$timeout = $timeout
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
        this.blog = data[0]
        this.dealData(data)
        this.prev(data[0].create_date)
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
          data.times[index]._id = value._id.split(':')[0]
        })
        this.times = data.times
      }
    })
  }

  getPrev(cursor) {
    this.request.getData({
      path: '/api/blog/getprevblog/' + cursor,
      parm: '',
      cb: data => {
        this.blog = data[0]
        this.dealData()
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
      this.cursor = data[0].create_date
    })
  }
}

detailController.$inject = ['request', '$stateParams', '$timeout'];
