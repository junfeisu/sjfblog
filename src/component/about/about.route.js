route.$inject=['$stateProvider'];

export default function route($stateProvider){
	$stateProvider
		.state('about',{
			url: '/about',
			template: require('./about.html'),
			controller: 'aboutController',
			controllerAs: 'about'
		})
}