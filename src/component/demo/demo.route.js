route.$inject=['$stateProvider'];

export default function route($stateProvider){
	$stateProvider
		.state('demo',{
			url: '/demo',
			template: require('./demo.html'),
			controller: 'demoController',
			controllerAs: 'demo'
		})
}