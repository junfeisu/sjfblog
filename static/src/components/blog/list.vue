<template>
  <div class="blog_list">
    <div class="blog_specifc" v-for="blog in blogs">
      <div class="blog_top">
        <a v-link="{name: 'blogDetail', params: {id: blog._id}}" v-text="blog.title"></a>
      </div>
      <div class="blog_content">
        <p class="blog_body"></p>
        <div class="tag">
          <div class="tag_left" @click="getBlogByTag($event)">
            <span>Tags:</span>
            <span class="tag-specifc" v-for="tag in blog.tags" v-text="tag"></span>
          </div>
          <div class="time" v-text="blog.create_date"></div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="page" @click="changeNum($event)">
    <button v-show="prev" @click="prevBlog()">&lt;&lt;</button>
    <button class="num" v-for="i in total" :class="$index === 0 ? 'active' : ''">{{i + 1}}</button>
    <button v-show="next" @click="nextBlog()">&gt;&gt;</button>
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
        -moz-line-clamp: 3;
        max-height: 56px;
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
          page_size: 1,
          tags: null,
          create_date: null
        },
        next: true,
        prev: false,
        total: null
      }
    },
    methods: {
      changeNum (event) {
        let target = event.target
        let activeNum = document.getElementsByClassName('active')[0]
        if (!target.classList.contains('active')) {
          if (target.classList.contains('num')) {
            this.listParam.page_size = +target.innerHTML
            activeNum.classList.remove('active')
            target.classList.add('active')
            this.getList()
            // +target.innerHTML === 1 ? this.prev = false : this.prev = true
            // +target.innerHTML === this.total.length ? this.next = false : this.next = true
          }
        }
      },
      dealData (data) {
        setTimeout(() => {
          let blogBody = document.getElementsByClassName('blog_body')
          data.blogs.forEach((value, index) => {
            value.content = value.content.replace(/<[^>]+>/g, '')
            blogBody[index].innerHTML = value.content
          })
        })
      },
      getBlogByTag (event) {
        let target = event.target
        if (target.className === 'tag-specifc') {
          this.listParam.tags = target.innerHTML
          this.getList()
        }
      },
      getList () {
        res.blog.get_bloglist(this.listParam)
          .then(data => {
            this.dealData(data)
            this.total = Math.ceil(data.total / 10)
            this.blogs = data.blogs
            this.total === 1 ? this.next = false : ''
            console.log('a is ' + this.next)
            setTimeout(() => {
              this.$parent.$parent.setHeight()
            })
          })
          .catch(error => {
            this.$root.add({msg: JSON.stringify(error), type: 'error'})
          })
      },
      prevBlog () {
        let activeNum = document.getElementsByClassName('active')[0]
        activeNum.classList.remove('active')
        activeNum.previousSibling.classList.add('active')
        this.listParam.page_size -= 1
        // this.listParam.page_size === 1 ? this.prev = false : this.prev = true
        // this.listParam.page_size === this.total.length ? this.next = false : this.next = true
        this.getList()
      },
      nextBlog () {
        let activeNum = document.getElementsByClassName('active')[0]
        activeNum.classList.remove('active')
        activeNum.nextSibling.classList.add('active')
        this.listParam.page_size += 1
      },
      watchFun () {
        console.log('123')
        this.listParam.page_size === 1 ? this.prev = false : this.prev = true
        this.listParam.page_size === this.total ? this.next = false : this.next = true
        console.log('b is ' + this.next)
      }
    },
    watch: {
      'listParam.page_size': {
        handler: 'watchFun',
        deep: true
      }
    },
    ready () {
      this.getList()
    }
  }
</script>
