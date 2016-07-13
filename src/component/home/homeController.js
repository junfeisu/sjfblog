import request from '../../service/service';

export default class homeController {
  constructor(request, $scope) {
    request.getData({
      path: '/api/getbloglist',
      way: 'POST',
      parm: '',
      cb: data => {
        console.log(data)
      }
    })
  }
}
