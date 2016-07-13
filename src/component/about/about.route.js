route.$inject=['$stateProvider'];

export default function route($stateProvider){
	$stateProvider
		.state('about',{
			url: '/about',
			template: require('./aboutme.html'),
			controller: 'aboutController',
			controllerAs: 'about'
		})
}