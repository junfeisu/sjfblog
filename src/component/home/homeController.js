export default class homeController {
  constructor(request) {
    this.request = request;
    this.name='1234';
    this.getData();
  }

  getData() {
    this.request.getData({
      path: '/api/blog',
      way: 'GET',
      parm: '',
      cb: data => {
        console.log(data)
      }
    })
  }
}

homeController.$inject = ['request'];
