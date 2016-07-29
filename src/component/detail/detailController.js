export default class detailController {
  constructor(request, $stateParams) {
    this.request = request
    this.params = $stateParams
    this.getData()
  }

  getData() {
    this.request.getData({
      path: '/api/blog/getblogbyid',
      way: 'POST',
      parm: {
        _id: this.params.blogId
      },
      cb: data => {
        data[0]['date'] = data[0].create_date.split('-')[2]
        data[0]['month'] = data[0].create_date.split('-')[0] + '-' + data[0].create_date.split('-')[1]
        this.blog = data[0]
        var content = document.getElementsByClassName('article_content')[0]
        content.innerHTML = data[0].content.replace(/\<pre\>/g,'<pre class="prettyprint">')
        content.innerHTML = content.innerHTML.replace(/\<h3\>/g,'<h3 class="pretty_h3">')
        content.innerHTML = content.innerHTML.replace(/\<h5\>/g,'<h5 class="pretty_h5">')
        content.innerHTML = content.innerHTML.replace(/\<code\>/g,'<code class="pretty_code">')
        console.log(content.innerHTML)
      }
    })
  }
}

detailController.$inject = ['request', '$stateParams'];
