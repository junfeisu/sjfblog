export default class resumeController {
  constructor(request) {
    this.request = request;
    this.getData();
  }

  getData() {
    this.request.getData({
      path: '/api/resume',
      para: 'user_id',
      cb: data => {
        console.log(data)
      }
    })
  }
}

resumeController.$inject = ['request'];
