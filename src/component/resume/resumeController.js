export default class resumeController {
  constructor(request) {
    this.request = request;
  }

  getData() {
    this.request.getData({
      url: '/api/resume',
      para: 'user_id',
      cb: data => {
        console.log(data)
      }
    })
  }
}

resumeController.$inject = ['request'];
