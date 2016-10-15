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
        let height = dHeight > sHeight ? dHeight : sHeight
        html.style.height = height + 'px'
      }
    },
    ready () {
      this.setHeight()
      console.log(this.$children)
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
