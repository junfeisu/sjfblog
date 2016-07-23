export default class aboutController {
  constructor(request) {
    this.request = request
    this.getData()
  }

  getData() {
    this.request.getData({
      path: '/api/user/me',
      way: 'GET',
      parm: '',
      cb: data => {
        console.log(data)
      }
    })
  }
}

aboutController.$inject = ['request']
