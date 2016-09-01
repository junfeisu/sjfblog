<template>
  <div class="blog-left">
    <router-view></router-view>
  </div>
  <div class="blog-right">
    <div class="tag_class">
      <h3>文章标签</h3>
      <div class="tags">
        <span ng-repeat="tag in home.tags" ng-bind="tag._id + '(' + tag.value + ')'" ng-click="home.blogByTag($event)"></span>
        <div class="clear"></div>
      </div>
    </div>
    <div class="time_class">
      <h3>文章归档</h3>
      <div class="times">
        <span ng-repeat="time in home.times" ng-bind="(time._id | date:'yyyy-MM') + '(' + time.value + ')'" ng-click="home.blogByTag($event)"></span>
        <div class="clear"></div>
      </div>
    </div>
  </div>
  <div class="clear"></div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .blog-left {
    float: left;
    width: 52.5%;
  }
  .blog-right {
    float: right;
    width: 25%;
    background: #fff;
    border-radius: 3px;
    .tag_class {
      width: 96%;
      margin: 0 auto;
      margin-top: 10px;
      h3 {
        text-align: center;
      }
      .tags {
        width: 90%;
        margin: 0 auto;
        span {
          @include archiveSpan
        }
      }
    }
    .time_class {
      width: 96%;
      margin: 0 auto;
      margin-top: 40px;
      h3 {
        text-align: center
      }
      .times {
        width: 90%;
        margin: 0 auto;
        span {
          @include archiveSpan;
        }
      }
    }
  }
  .clear {
    @include clear-float
  }
</style>

<script>
  export default {
    name: 'blog',
    data () {
      return {}
    }
  }
</script>