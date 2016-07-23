route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
  $stateProvider
    .state('detail', {
      url: '/detail/{blogId: [0-9]{1,5}}',
      template: require('./detail.html'),
      controller: 'detailController',
      controllerAs: 'detail'
    })
}
