<template>
  <div class="side-operate">
    <div class="backup" v-if="isShow" @click="backUp()"></div>
  </div>
</template>

<script>
  export default {
    name: 'sideOperate',
    data () {
      return {
        isShow: false,
        isFirefox: true
      }
    },
    methods: {
      judge () {
        this.isFirefox = !!(navigator.userAgent.toLowerCase().indexOf('firefox') >= 0)
        this.watchScroll()
      },
      watchScroll () {
        let blogRihgt = document.querySelector('.blog-right')
        let blogRightBottom = blogRihgt.offsetTop + blogRihgt.offsetHeight
        let boundary = blogRightBottom + 10 - document.documentElement.clientHeight
        if (this.isFirefox) {
          window.addEventListener('DOMMouseScroll', event => {
            this.isShow = !!(document.documentElement.scrollTop > boundary + 40)
          })
        } else {
          window.onmousewheel = event => {
            this.isShow = !!(document.documentElement.scrollTop > boundary + 40)
          }
        }
      },
      backUp () {
        const time = setInterval(() => {
          let scrollTop = document.documentElement.scrollTop
          let speed = Math.ceil(scrollTop / 5)
          let position = scrollTop - speed
          document.documentElement.scrollTop = position
          if (scrollTop === 0) {
            clearInterval(time)
            this.isShow = false
          }
        }, 50)
      }
    },
    ready () {
      this.judge()
    }
  }
</script>

<style lang="scss">
  @import './../../assets/style/mixin.scss';
  .side-operate {
    position: fixed;
    bottom: 10px;
    right: 5%;
    width: 50px;
    border-radius: 3px;
    background-color: #f5f5f5;
  }
  .backup {
    background: url('http://7xrp7o.com1.z0.glb.clouddn.com/backup.png');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 50px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      @include transition($time: 0.5s);
    }
  }
</style>