<template>
  <div class="blog-list">
    <div class="blog-specifc" v-for="blog in blogs">
      <div class="blog-top">
        <a v-link="{name: 'blogDetail', params: {id: blog._id}}" v-text="blog.title"></a>
      </div>
      <div class="blog-content">
        <p class="blog-body" v-link="{name: 'blogDetail', params: {id: blog._id}}"></p>
        <div class="tag">
          <div class="tag-left" @click="getBlogByTag($event)">
            <span class="tag-specifc" v-for="tag in blog.tags" v-text="tag"></span>
          </div>
          <div class="time" v-text="blog.create_date"></div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="page" @click="changeNum($event)" v-show="total > 1">
    <button v-show="prev" @click="prevBlog()">&lt;&lt;</button>
    <button class="num" v-for="i in total" :class="i === currentSize? 'active' : ''">{{i + 1}}</button>
    <button v-show="next" @click="nextBlog()">&gt;&gt;</button>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .blog-list {
    width: 100%;
    margin: 0px auto;
    min-height: 500px;
    .blog-specifc {
      background: #fff;
      border: 1px solid $lightColor;
      border-radius: 5px;
      padding: 5px 2%;
      margin-bottom: 20px;
      opacity: 0.7;
      transition: 0.8s;
      .blog-top {
        margin-bottom: 30px;
        a {
          text-decoration: none;
          cursor: pointer;
          font-size: $largeSize;
          @include transition($time: .6s);
          color: #111;
          &:hover {
            margin-left: 10px
          }
        }
      }
      .blog-body {
        cursor: pointer;
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
        float: left;
        margin-right: 25px;
        height: 20px;
        line-height: 20px;
        padding: 0px 10px;
        position: relative;
        font-size: $smallSize;
        background: #6d6d6d;
        color: #fff;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
        &:before {
          content: "";
          width: 0px;
          height: 0px;
          border: 10px solid transparent;
          border-right-color: #6d6d6d;
          position: absolute;
          left: -20px;
        }
        &:after {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: #fff;
          position: absolute;
          left: 0px;
          top: 7px;
        }
      }
      .tag {
        .tag-left {
          float: left;
          margin-left: 10px;
        }
        .time {
          float: right;
          color: $strongColor
        }
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
        currentSize: 0,
        next: true,
        prev: false,
        total: null
      }
    },
    methods: {
      // 页码改变
      changeNum (event) {
        let target = event.target
        let activeNum = document.querySelector('.active')
        if (!target.classList.contains('active')) {
          if (target.classList.contains('num')) {
            this.$parent.listParam.page_size = +target.innerHTML
            activeNum.classList.remove('active')
            target.classList.add('active')
            this.$parent.getList()
          }
        }
      },
      // 处理博客内容
      dealData (data) {
        setTimeout(() => {
          let blogBody = document.querySelectorAll('.blog-body')
          data.blogs.forEach((value, index) => {
            value.content = value.content.replace(/<[^>]+>/g, '')
            blogBody[index].innerHTML = value.content
          })
        })
      },
      getBlogByTag (event) {
        if (event.target.classList.contains('tag-specifc')) {
          this.$parent.listParam.tags = event.target.innerHTML
          this.$parent.listParam.create_date = null
          this.$parent.getList()
        }
      },
      // 前一篇博客
      prevBlog () {
        let activeNum = document.querySelector('.active')
        activeNum.classList.remove('active')
        activeNum.previousSibling.classList.add('active')
        this.$parent.listParam.page_size -= 1
        this.$parent.getList()
      },
      // 后一篇博客
      nextBlog () {
        let activeNum = document.querySelector('.active')
        activeNum.classList.remove('active')
        activeNum.nextSibling.classList.add('active')
        this.$parent.listParam.page_size += 1
        this.$parent.getList()
      }
    },
    ready () {
      this.$parent.getList()
    }
  }
</script>
