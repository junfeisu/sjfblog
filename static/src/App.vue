<template>
  <div id="app">
    <top></top>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Top from './components/common/top'
  export default {
    components: {
      Top
    },
    methods: {
      setHeight () {
        let html = document.getElementsByTagName('html')[0]
        let dHeight = document.documentElement.clientHeight
        let sHeight = document.scrollingElement.clientHeight
        let height = dHeight > sHeight ? dHeight : sHeight
        html.style.height = height + 'px'
      }
    },
    ready () {
      this.setHeight()
    }
  }
</script>

<style lang="scss">
  html {
    height: 100%;
    background: url('./assets/img/bg_body.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-width: 1260px;
    h1, h2, h3, h4, h5 {
      margin: 0px;
    }
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
