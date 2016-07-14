export default class demoController {
  constructor(request) {
    this.request = request;
    this.getData();
  }

  getData() {
    this.request.getData({
      url: '/api/getdemo',
      para: '',
      cb: data => {
        console.log(data);
      }
    })
  }
}

demoController.$inject = ['request'];
