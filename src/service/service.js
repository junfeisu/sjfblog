import toastr from 'toastr';

export default class requestFactory {
  contrustor($http) {
    this.$http = $http;
  }
  getData(para) {
    let promise = ({ path, way = 'GET', parm, headers = { 'Content-type': 'application/json' },cb } = {}) => {
      $http({
        url: path,
        method: way,
        data: parm,
        header: headers
      });
      promise.success(data => para.cb(data));
      promise.error(err => toastr.info(JSON.stringify(err)));
    }
	  promise(para);
  }
}
