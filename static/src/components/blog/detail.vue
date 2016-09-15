<template>
  <div class="detail_main">
    <article>
      <h2>{{currentBlog.title}}</h2>
      <div class="time">
        <h2>{{currentBlog.create_date | format_date}}</h2>
        <span>{{currentBlog.create_date | format_year_month}}</span>
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
      <span v-show="prev" @click="getBlog(prevBlog._id)" v-link="{name: 'blogDetail', params: {id: prevBlog._id}}">&lt;&lt;{{prevBlog.title}}</span>
      <span v-show="next" @click="getBlog(nextBlog._id)" v-link="{name: 'blogDetail', params: {id: nextBlog._id}}">{{nextBlog.title}}&gt;&gt;</span>
    </div>
  </div>
  <script src="./../../../node_modules/prettify/prettify.js"></script>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  // @import './../../assets/pretty/prettify.scss';
  .detail_main {
    padding: 10px;
    background: #fff;
    border-radius: 3px;
    .main_bottom {
      width: 98%;
      margin: 0 auto;
      height: 40px;
      line-height: 40px;
      color: #2479CC;
      border-top: 0.5px solid #ccc;
      span {
        cursor: pointer;
        @include transition
        &:hover {
          margin-left: -5px;
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
      width: 96%;
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
          color: #1ba1e2;
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
      }
    }
  }
  .clear {
    @include clear-float
  }
</style>

<script>
  export default {
    name: 'blogDetail',
    data () {
      return {
        cursor: '',
        currentBlog: {},
        next: 'true',
        nextBlog: {},
        prev: false,
        prevBlog: {}
      }
    },
    methods: {
      dealData (data) {
        setTimeout(() => {
          var content = document.getElementsByClassName('article_content')[0]
          content.innerHTML = content.innerHTML.replace(/<h3>/g, '<h3 class="prettyprint">')
          content.innerHTML = content.innerHTML.replace(/<h5>/g, '<h5 class="prettyprint">')
          content.innerHTML = content.innerHTML.replace(/<img.+>/g, '<img class="prettyprint">')
          content.innerHTML = content.innerHTML.replace(/<code>/g, '<code class="prettyprint">')
          content.innerHTML = data.content
          this.$parent.$parent.setHeight()
        })
      },
      getBlog (id) {
        typeof id === 'undefined' ? this.$route.params._id : id
        this.$http.post('/api/blog/getblogbyid', {_id: id})
          .then(response => {
            let data = JSON.parse(response.body)[0]
            this.cursor = data.create_date
            this.dealData(data)
            this.currentBlog = data
            this.getNearBlog()
          }, error => {
            console.log(error)
          })
      },
      getNearBlog () {
        this.$http.get('/api/blog/getnearblog/' + this.cursor)
          .then(response => {
            let data = JSON.parse(response.body)
            this.prevBlog = data.prevBlog
            this.prevBlog.hasOwnProperty('_id') ? this.prev = true : this.prev = false
            this.nextBlog = data.nextBlog
            this.nextBlog.hasOwnProperty('_id') ? this.next = true : this.next = false
          }, error => {
            console.log(error)
          })
      }
    },
    ready () {
      this.getBlog()
    }
  }
</script>