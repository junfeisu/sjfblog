// To set the content height
class initHeight {
  constructor() {

  }

  link() {
    // let content = document.getElementsByClassName('content')[0]
    // let top = document.getElementsByClassName('top')[0]
    // console.log('init')
    // window.onresize = () => {
    // 	console.log('resize')
    //   content.style.height = document.documentElement.clientHeight - top.offsetHeight + 'px'
    // }
  }
}

export default angular.module('initHeight', [])
  .directive('initHeight', () => new initHeight())
  .name
