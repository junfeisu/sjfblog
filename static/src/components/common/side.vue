<template>
  <div class="side-operate">
    <div class="concat"></div>
    <div class="backup"></div>
  </div>
</template>

<script>
  export default {
    name: 'sideOperate',
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  .side-operate {
    position: fixed;
    bottom: 20px;
    right: 100px;
    width: 50px;
    min-height: 50px;
    background-color: red;
  }
</style>