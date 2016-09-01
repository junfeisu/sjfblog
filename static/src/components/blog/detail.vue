<template>
  <div class="detail_main">
    <article>
      <h2 ng-bind="detail.currentBlog.title"></h2>
      <div class="time">
        <h2 ng-bind="detail.currentBlog.create_date | date:'dd'"></h2>
        <span ng-bind="detail.currentBlog.create_date | date:'yyyy-MM'"></span>
      </div>
      <div class="clear"></div>
      <div class="article_content">
      </div>
    </article>
    <div class="comment">
      <!-- 多说评论框 start -->
      <!-- <div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div> -->
      <!-- 多说评论框 end -->
      <!--   <script type="text/javascript">
    var duoshuoQuery = {
      short_name: "sjfblog"
    };
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';
      ds.async = true;
      ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
    </script> -->
    </div>
    <div class="main_bottom">
      <span ng-bind="'<< ' + detail.prevBlog.title" ng-show="detail.prev" ui-sref="detail({blogId: detail.prevBlog._id})"></span>
      <span ng-bind="detail.nextBlog.title + ' >>'" ng-show="detail.next" ui-sref="detail({blogId:detail.nextBlog._id})"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .detail_main {
    width: 65%;
    float: left;
    padding: 10px;
    background: #fff;
    border-radius: 3px;
    .main_bottom {
      width: 90%;
      margin: 0 auto;
      height: 40px;
      line-height: 40px;
      color: #2479CC;
      border-top: 0.5px solid #ccc;
      span {
        cursor: pointer;
        @include transition
        &:hover {
          margin-left: -5px
        }
        &:last-child {
          float: right;
          &:hover {
            margin-right: -5px;
          }
        }
      }
    }
    article {
      width: 90%;
      margin: 0 auto;
      margin-top: 10px;
      h2 {
        float: left;
        width: 50%;
        margin: 0px;
        height: 40px;
        font-size: 1.3em;
      }
      .time {
        width: 20%;
        float: right;
        text-align: right;
        height: 40px;
        line-height: 40px;
        font-style: italic;
        color: #555;
        h2 {
          float: none;
          height: 25px;
          width: 90%;
          line-height: 25px;
          color: #1ba1e2
        }
        span {
          display: block;
          height: 10px;
          line-height: 10px;
          font-size: $smallSize;
        }
      }
      .article_content {
        margin-top: 10px;
        h2 {
          float: none;
        }
        img {
          max-width: 100%;
          box-sizing: border-box
        }
      }
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