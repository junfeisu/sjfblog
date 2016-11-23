<template>
  <div class="side-operate">
    <div class="backup" v-show="isShow" @click="backUp()"></div>
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
        navigator.userAgent.toLowerCase().indexOf('firefox') >= 0 ? this.isFirefox = true : this.isFirefox = false
      },
      watchScroll () {
        if (this.isFirefox) {
          console.log(document.documentElement.scrollTop)
          window.addEventListener('DOMMouseScroll', event => {
            document.documentElement.scrollTop > 50 ? this.isShow = true : this.isShow = false
          })
        } else {
          window.onmousewheel = event => {
            document.body.scrollTop > 50 ? this.isShow = true : this.isShow = false
          }
        }
      },
      backUp () {
        const time = setInterval(() => {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          let speed = Math.ceil(scrollTop / 5)
          let position = scrollTop - speed
          this.isFirefox ? document.documentElement.scrollTop = position : document.body.scrollTop = position
          if (scrollTop === 0) {
            clearInterval(time)
            this.isShow = false
          }
        }, 50)
      }
    },
    ready () {
      this.judge()
      this.watchScroll()
    }
  }
</script>

<style lang="scss">
  @import './../../assets/style/mixin.scss';
  .side-operate {
    position: fixed;
    bottom: 20px;
    right: 100px;
    width: 50px;
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