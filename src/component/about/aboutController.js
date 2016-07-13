export default class aboutController{
	constructor(request){
		this.request=request;
	}

	getData(){
		this.request.getData({
      path: '/api/getuserinfo',
      way: 'POST',
      parm: '',
      cb: data => {
        console.log(data)
      }
    })
	}
}

aboutController.$inject=['request'];
