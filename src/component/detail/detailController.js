export default class detailController {
  constructor(request, $stateParams) {
    this.request = request
    this.abc='abc'
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
        console.log(data)
      }
    })
  }
}

detailController.$inject = ['request', '$stateParams'];
