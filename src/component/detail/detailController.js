export default class detailController {
  constructor(request) {
    this.request = request;
  }

  getData() {
    this.request.getData({
      path: '/api/getblogbyid',
      way: 'POST',
      parm: '',
      cb: data => {
        console.log(data)
      }
    })
  }
}

detailController.$inject = ['request'];
