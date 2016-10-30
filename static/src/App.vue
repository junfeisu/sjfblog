<template>
  <div id="app">
    <top></top>
    <div class="content">
      <router-view></router-view>
    </div>
    <sjf-remind></sjf-remind>
  </div>
</template>

<script>
  import Top from './components/common/top'
  import sjfRemind from './components/common/sjf-remind'
  export default {
    components: {
      'top': Top,
      'sjf-remind': sjfRemind
    },
    methods: {
      add (data) {
        this.$root.$children[1].addRemind(data)
      },
      setHeight () {
        let html = document.getElementsByTagName('html')[0]
        let dHeight = document.documentElement.clientHeight
        let sHeight = document.scrollingElement.clientHeight
        let bHeight = document.body.scrollHeight
        let height = Math.max(dHeight, sHeight, bHeight)
        html.style.height = height + 'px'
      }
    },
    ready () {
      this.setHeight()
      console.log(this.$children)
      console.log('%c苏俊飞', ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16em;color:#fff;')
    }
  }
</script>

<style lang="scss">
  html {
    height: 100%;
    background: url('./assets/img/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-width: 1260px;
  }

  #app {
    color: #2c3e50;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    .content {
      width: 90%;
      margin: 0 auto;
      min-width: 1080px;
      padding: 10px 0px;
    }
  }
  
</style>
