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
      }
    },
    ready () {
      console.log('%c苏俊飞', ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16em;color:#fff;')
    }
  }
</script>

<style lang="scss">
  @import './assets/style/normalize.scss';
  html {
    height: 100%;
    min-width: 1260px;
  }

  #app {
    color: #2c3e50;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    width: 100%;
    margin-top: 80px;
    .content {
      margin: 0 auto;
      min-width: 1080px;
    }
  }
  
</style>
