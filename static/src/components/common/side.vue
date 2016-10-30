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
        isShow: false
      }
    },
    methods: {
      watchScroll () {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
          console.log('firefox')
          window.addEventListener('DOMMouseScroll', event => {
            document.body.scrollTop > 50 ? this.isShow = true : this.isShow = false
          })
        } else {
          window.onmousewheel = event => {
            document.body.scrollTop > 50 ? this.isShow = true : this.isShow = false
          }
        }
      },
      backUp () {
        let time = setInterval(() => {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          let speed = Math.ceil(scrollTop / 5)
          document.body.scrollTop = scrollTop - speed
          if (scrollTop === 0) {
            clearInterval(time)
            this.isShow = false
          }
        }, 50)
      }
    },
    ready () {
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
    background-color: #999;
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