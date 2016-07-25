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
        data[0]['date'] = data[0].create_date.split('T')[0].split('-')[2]
        data[0]['month'] = data[0].create_date.split('-')[0] + '-' + data[0].create_date.split('-')[1]
        this.blog = data[0]
        var content = document.getElementsByClassName('article_content')[0]
        content.innerHTML = data[0].content

      }
    })
  }
}

detailController.$inject = ['request', '$stateParams'];
