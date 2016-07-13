export default class homeController {
  constructor(request) {
    this.request = request;
  }

  getData() {
    this.request.getData({
      path: '/api/getbloglist',
      way: 'POST',
      parm: '',
      cb: data => {
        console.log(data)
      }
    })

  }
}

homeController.$inject = ['request'];
