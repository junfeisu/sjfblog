import angular from 'angular';
class prevBlog {
	constructor() {

	}

	link(scope, ele, attrs) {
		ele.on('click', () => {
			console.log('prev')
		})
	}
}

class nextBlog {
	constructor() {

	}

	link(scope,ele,atts) {
		ele.on('click', () => {
			let container = document.getElementsByClassName('container');
			console.log(container[0]);
		})
	}
}

export default angular.module('homeDirective', [])
  .directive('prevBlog', () => new prevBlog())
  .directive('nextBlog', () => new nextBlog())
  .name;
