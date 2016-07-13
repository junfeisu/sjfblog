route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
  $stateProvider
    .state('detail', {
      url: '/detail',
      template: require('./detail.html'),
      controller: 'detailController',
      controllerAs: 'detail'
    })
}
