route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
  $stateProvider
    .state('detail', {
      url: '/detail/:blogId',
      template: require('./detail.html'),
      controller: 'detailController',
      controllerAs: 'detail'
    })
}
