routing.$inject = ['$urlRouterProvider','$locationProvider'];

export default function routing($urlRouterProvider,$locationProvider) {
	$locationProvider.html5Mode({enabled: true});
  $urlRouterProvider.otherwise('/');
}
