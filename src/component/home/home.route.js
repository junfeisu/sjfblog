route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'homeController',
      controllerAs: 'home'
    })
}
