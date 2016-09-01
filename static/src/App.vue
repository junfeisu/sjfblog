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
    }
  }
</script>

<style lang="scss">
  html {
    height: 100%;
    background: url('./assets/img/bg_body.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  #app {
    color: #2c3e50;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    .content {
      width: 90%;
      margin: 0 auto;
      min-width: 1080px;
      padding: 10px 0px;
    }
  }
</style>
