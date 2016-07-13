import angular from 'angular';
function initHeight(){
	return {
		 scope: {
		 	name: '='
		 },
		 compile: (scope,ele,attrs) => {
		 	let content=document.getElementsByClassName('content')[0];
		 	console.log(content);
		 	content.style.height= document.body.clientHeight-document.getElementsByClassName('top')[0].offsetHeight + 'px';
		 }
	}
}

export default angular.module('homeDirective',[])
	.directive('homeDirective',initHeight)
	.name;
