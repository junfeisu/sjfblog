<template>
  <div class="blog-left">
    <router-view></router-view>
  </div>
  <div class="blog-right">
    <div class="tag_class">
      <h3>文章标签</h3>
      <div class="tags" @click="blogByTag($event)">
        <span v-for="tag in tags">{{tag._id}}({{tag.value}})</span>
        <div class="clear"></div>
      </div>
    </div>
    <div class="time_class">
      <h3>文章归档</h3>
      <div class="times" @click="blogByTag($event)">
        <span v-for="time in times">{{time._id}}({{time.value}})</span>
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
    margin-left: 5%;
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
      return {
        tags: [],
        times: [],
        total: [],
        blogs: [],
        next: true
      }
    },
    methods: {
      blogByTag (event) {
        let target = event.target
        this.cursor
        this.getList()
      },
      dealData (data) {
        let self = this
        setTimeout(() => {
          let blogBody = document.getElementsByClassName('blog_body')
          data.blogs.forEach((value, index) => {
            if (index === 0) {
              self.cursor = value.create_date
            }
            blogBody[index].innerHTML = value.content
          })
        })
      },
      getList () {
        this.$http.get('/api/blog/getbloglist/' + this.cursor)
          .then(response => {
            let data = JSON.parse(response.body)
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
          }, error => {
            console.log(error)
          })
      },

    },
    ready () {
      this.$http.get('/api/blog/getblogtype')
        .then(response => {
          let data = JSON.parse(response.body)
          this.tags = data.tags
          data.times.forEach((value, index) => {
            data.times[index]._id = value._id.split(':')[0]
          })
          this.times = data.times
        }, error => {
          console.log(error)
        })
    }
  }
</script>