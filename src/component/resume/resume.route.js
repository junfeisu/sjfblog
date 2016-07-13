route.$inject=['$stateProvider'];

export default function route($stateProvider){
	$stateProvider
		.state('resume',{
			url: '/resume',
			template: require('./resume.html'),
			controller: 'resumeController',
			controllreAs: 'resume'
		})
}
