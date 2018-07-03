<template>
  <div v-show="remind" :class.sync="['sjf-remind-' + type]" @click="close()">{{msg}}</div>
</template>

<script>
  export default {
    name: 'sjfRemind',
    data () {
      return {
        msg: 'this is sjf-remind',
        remind: false,
        type: 'info',
        timeout: 3000
      }
    },
    methods: {
      addRemind (data) {
        this.$nextTick(() => {
          this.remind = true
          for (let i in data) {
            this[i] = data[i]
          }
          setTimeout(() => {
            this.close()
          }, this.timeout)
        })
      },
      clearRemind () {
        this.remind = false
      },
      close () {
        this.clearRemind()
      }
    }
  }
</script>

<style lang="scss">
  @mixin sjf-remind {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    line-height: 1.0;
    padding: 10px 0px;
    text-align: center;
    z-index: 999;
    color: #fff;
  }
  .sjf-remind {
    &-info {
      @include sjf-remind;
      background: #2f96b4;
    },
    &-success {
      @include sjf-remind;
      background: #51a351;
    },
    &-warn {
      @include sjf-remind;
      background: #f89406;
    },
    &-error {
      @include sjf-remind;
      background:  #bd362f;
    }
  }
  .fade-transition {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>


