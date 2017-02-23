<template>
  <div class="detail-main">
    <article>
      <h2>{{currentBlog.title}}</h2>
      <div class="time">
        <h2>{{currentBlog.create_date | format_date}}</h2>
        <span>{{currentBlog.create_date | format_year_month}}</span>
      </div>
      <div class="clear"></div>
      <div class="article-content"></div>
    </article>
    <div class="comment"></div>
    <div class="main-bottom">
      <span v-show="prev" @click="changeBlog(prevBlog._id)">&lt;&lt;{{prevBlog.title}}</span>
      <span v-show="next" @click="changeBlog(nextBlog._id)">{{nextBlog.title}}&gt;&gt;</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  @import './../../assets/style/atom-one-dark.css';
  .detail-main {
    padding: 10px;
    background: #fff;
    border-radius: 3px;
    .main-bottom {
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
      .article-content {
        margin-top: 10px;
        blockquote {
          color: #777;
          padding: 0 5px;
          border-left: 2px solid #ddd
        }
      }
    }
  }
  .clear {
    @include clear-float
  }
</style>

<script>
  import hljs from 'highlight.js'
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
      changeBlog (id) {
        this.$router.go({name: 'blogDetail', params: {id: id}})
        this.getBlog(id)
      },
      dealData (data) {
        let self = this
        let content = document.querySelector('.article-content')
        content.innerHTML = data.content
        let ele = content.querySelectorAll('pre code')
        let img = content.querySelectorAll('p img')
        Array.prototype.forEach.call(ele, value => {
          hljs.highlightBlock(value)
        })
        Array.prototype.forEach.call(img, value => {
          hljs.highlightBlock(value)
          value.onload = () => {
            self.$parent.setHeight()
          }
        })
        self.$parent.setHeight()
      },
      getBlog (id) {
        typeof id === 'undefined' ? this.$route.params.id : id
        let blog = JSON.parse(window.sessionStorage.getItem('blog' + id))
        if (blog) {
          this.cursor = blog.currentBlog.create_date
          this.dealData(blog.currentBlog)
          this.currentBlog = blog.currentBlog
          this.prevBlog = blog.prevBlog
          this.nextBlog = blog.nextBlog
        } else {
          res.blog.post_blogbyid({_id: id})
            .then(data => {
              this.cursor = data.create_date
              this.dealData(data)
              this.currentBlog = data
              this.getNearBlog(id)
            })
            .catch(error => {
              this.$root.add({type: 'error', msg: JSON.stringify(error)})
            })
        }
      },
      async getNearBlog (id) {
        try {
          let data = await res.blog.get_nearblog({cursor: this.cursor})
          this.prevBlog = data.prevBlog
          this.nextBlog = data.nextBlog
          window.sessionStorage.setItem('blog' + id, JSON.stringify({
            currentBlog: this.currentBlog,
            prevBlog: this.prevBlog,
            nextBlog: this.nextBlog
          }))
        } catch (e) {
          this.$root.add({type: 'error', msg: JSON.stringify(e)})
        }
      },
      watchFun () {
        this.prev = !!(this.prevBlog.hasOwnProperty('_id'))
        this.next = !!(this.nextBlog.hasOwnProperty('_id'))
      }
    },
    watch: {
      'prevBlog': {
        handler: 'watchFun',
        deep: true
      }
    },
    ready () {
      this.getBlog(this.$route.params.id)
    }
  }
</script>