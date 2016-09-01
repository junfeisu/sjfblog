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
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  .content {
    width: 100%;
    min-width: 1080px;
    min-height: 598px;
    background: url('./assets/img/bg_body.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 80px;
    left: 0px;
    padding: 10px 0px;
  }
}
</style>
