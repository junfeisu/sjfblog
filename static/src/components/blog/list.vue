<template>
  <div class="blog_list">
    <div class="blog_specifc" ng-repeat="blog in home.blogs">
      <div class="blog_top">
        <a ui-sref='detail({blogId: blog._id})' ng-bind="blog.title"></a>
      </div>
      <div class="blog_content">
        <p class="blog_body"></p>
        <div class="tag">
          <div class="tag_left">
            <span>Tags:</span>
            <span ng-repeat="tag in blog.tags" ng-click='home.blogByTag($event)' ng-bind="tag"></span>
          </div>
          <div class="time" ng-bind="blog.create_date | date:'yyyy-MM-dd HH:mm'"></div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="page">
    <button ng-show="home.prev">&lt;&lt;</button>
    <button ng-repeat="i in home.total" ng-class="{active: $index === 0}">{{$index + 1}}</button>
    <button ng-show="home.next">&gt;&gt;</button>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .blog_list {
    width: 100%;
    margin: 0px auto;
    .blog_specifc {
      background: #fff;
      border: 1px solid $lightColor;
      border-radius: 5px;
      padding: 5px 2%;
      margin-top: 20px;
      opacity: 0.7;
      transition: 0.8s;
      .blog_top {
        margin-bottom: 30px;
        a {
          text-decoration: none;
          cursor: pointer;
          font-size: $largeSize;
          @include transition($time: .8s);
          color: #111;
          &:hover {
            margin-left: 10px
          }
        }
      }
      .blog_body {
        height: 60px;
        overflow: hidden;
        margin-bottom: 30px
      }
      span {
        display: block;
        float: left;
        margin-right: 20px;
        height: 20px;
        line-height: 20px;
        font-size: $middleSize;
        color: #0a0a0a;
        &:hover {
          margin-top: 2px;
          color: $color;
          cursor: pointer
        }
        ;
        &:first-child {
          margin-right: 2px;
          cursor: default;
          &:hover {
            margin-top: 0px;
            color: #0a0a0a;
            cursor: default
          }
        }
      }
      .tag {
        .tag_left {
          float: left;
        }
        .time {
          float: right;
          color: $strongColor
        }
      }
      &:first-child {
        margin-top: 0px
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  .page {
    width: 260px;
    margin: 30px auto;
    button {
      @include button;
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
    .active {
      color: #fff;
      background: #4078c0;
      opacity: 1
    }
  }
</style>

<script>
  export default {
    name: 'blogList',
    data () {
      return {}
    }
  }
</script>
