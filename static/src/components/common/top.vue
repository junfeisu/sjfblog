<template>
  <header class="top" class="top">
    <div class="show-logo">
      <div class="logo"></div>
      <h3>Sjffly</h3>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
    <div class="top-main">
      <div id="nav">
        <li v-link="{name: 'blog'}">Home</li>
        <li v-link="{name: 'demo'}">Demos</li>
        <li v-link="{name: 'about'}">About</li>
        <li><a href="https://github.com/junfeisu" title="">Github</a></li>
        <div class="clear"></div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .top {
    width: 100%;
    height: 80px;
    line-height: 80px;
    min-width: 1080px;
    background: $strongColor;
    position: fixed;
    top: 0px;
    z-index: 999;
  }

  .show-logo {
    float: left;
    margin-left: 30px;
    margin-top: 16px;
    .logo {
      float: left;
      background: #fff;
      width: 48px;
      height: 48px;
      background-image: url('http://7xrp7o.com1.z0.glb.clouddn.com/baby.png');
      background-size: 48px 48px;
      border-radius: 24px;
      @include transition($time: 2s);
      &:hover {
        border-radius: 0px
      }
    }
    h3 {
      color: #fff;
      float: right;
      margin: 0px;
      margin-left: 5px;
      height: 48px;
      line-height: 48px;
      font-size: 22px
    }
  }
  
  .top-main {
    width: 60%;
    margin: 0 auto;
    color: #fff;
    font-size: $largeSize;
    #nav {
      width: 90%;
      margin: 0 auto;
      li {
        list-style: none;
        width: 16%;
        margin-left: 4%;
        height: 80px;
        line-height: 80px;
        float: left;
        cursor: pointer;
        text-align: center;
        @include transition;
        &:hover {
          margin-top: 5px;
        }
        a {
          text-decoration: none;
          color: #fff
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'top'
  }
</script>
