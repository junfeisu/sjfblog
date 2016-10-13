<template>
  <div class="blog_list">
    <div class="blog_specifc" v-for="blog in blogs">
      <div class="blog_top">
        <a v-link="{name: 'blogDetail', params: {id: blog._id}}">{{blog.title}}</a>
      </div>
      <div class="blog_content">
        <p class="blog_body"></p>
        <div class="tag">
          <div class="tag_left" @click="getBlogByTag($event)">
            <span>Tags:</span>
            <span v-for="tag in blog.tags">{{tag}}</span>
          </div>
          <div class="time">{{blog.create_date}}</div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="page" @click="changeNum($event)">
    <button v-show="prev">&lt;&lt;</button>
    <button v-for="i in total" :class="$index === 0 ? 'active' : ''">{{i}}</button>
    <button v-show="next">&gt;&gt;</button>
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
        margin-bottom: 30px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
  .clear {
    @include clear-float
  }
</style>

<script>
  export default {
    name: 'blogList',
    data () {
      return {
        blogs: [],
        listParam: {
          cursor: null,
          tag: null,
          time: null
        },
        next: true,
        prev: false,
        total: []
      }
    },
    methods: {
      changeNum (event) {
        let target = event.target
        console.log(target)
      },
      dealData (data) {
        let self = this
        setTimeout(() => {
          let blogBody = document.getElementsByClassName('blog_body')
          data.blogs.forEach((value, index) => {
            if (index === 0) {
              self.cursor = value.create_date
            }
            // clear the html tag
            value.content = value.content.replace(/<[^>]+>/g, '')
            blogBody[index].innerHTML = value.content
          })
        })
      },
      getList () {
        this.$http.get('/api/blog/getbloglist/' + this.listParam.cursor + '/' + this.listParam.tag + '/' + this.listParam.time)
          .then(response => {
            let data = response.body
            this.dealData(data)
            let total = Math.ceil(data.total / 10)
            this.blogs = data.blogs
            if (total === 1) {
              this.total = [1]
              this.next = false
            } else {
              for (let i = 0; i < total; i++) {
                this.total.push(i + 1)
              }
            }
            setTimeout(() => {
              this.$parent.$parent.setHeight()
            })
          }, error => {
            console.log(error)
          })
      },
      getCursor () {
        this.$http.get('/api/blog/getnewcursor/')
          .then(response => {
            let data = response.body
            this.listParam.cursor = data[0].create_date
            this.getList()
          })
      }
    },
    ready () {
      this.getCursor()
    }
  }
</script>
