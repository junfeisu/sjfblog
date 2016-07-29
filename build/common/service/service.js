import angular from 'angular';

class request {
  constructor($http) {
    this.$http = $http;
  }

  getData({ path, way = 'GET', parm, headers = { 'Content-type': 'application/json' },cb } = {}) {
    let promise = this.$http({
        url: path,
        method: way,
        data: parm,
        header: headers
      });
    promise.success(data => {
      cb(data)
    });
    promise.error(err => console.log('the request err is ' + JSON.stringify(err)));
  }
}

request.$inject=['$http'];

export default angular.module('service.request',[])
  .service('request',request)
  .name
