import angular from 'angular';
class prevBlog {
	constructor() {

	}

	link(scope, ele, attrs) {
		ele.on('click', () => {
			let wrapper = document.getElementById('wrapper')
			let container = document.getElementsByClassName('container')
			container[0].style.left = parseInt(container[0].style.left) + wrapper.offsetWidth + 'px'
			if(parseInt(container[0].style.left) > 0) {
				container[0].style.left = -3 * wrapper.offsetWidth + 'px'
			}
		})
	}
}

class nextBlog {
	constructor() {

	}

	link(scope,ele,atts) {
		ele.on('click', () => {
			let wrapper = document.getElementById('wrapper');
			let container = document.getElementsByClassName('container');
			container[0].style.left = parseInt(container[0].style.left) - wrapper.offsetWidth + 'px'
			if(parseInt(container[0].style.left) <= wrapper.offsetWidth * -4 ) {
				container[0].style.left = -wrapper.offsetWidth + 'px'
			}
		})
	}
}

export default angular.module('homeDirective', [])
  .directive('prevBlog', () => new prevBlog())
  .directive('nextBlog', () => new nextBlog())
  .name;
