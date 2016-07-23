import { RouteLink, RouterParams } from './detail.route'
export default class detailController {
  constructor(request, $stateParams) {
    this.request = request
    this.abc='abc'
    this.params = $stateParams
    this.getData()
  }

  getData() {
    this.request.getData({
      path: '/api/getblogbyid',
      way: 'POST',
      parm: {
        blog_id: this.params.blogId
      },
      cb: data => {
        console.log(data)
      }
    })
  }
}

detailController.$inject = ['request', '$stateParams'];
