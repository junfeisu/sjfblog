<template>
  <div class="blog">
    <div class="blog-left">
      <router-view></router-view>
    </div>
    <div class="blog-right">
      <div class="tag-class">
        <h3>文章标签</h3>
        <div class="tags" @click="blogByTag($event)">
          <span v-for="tag in tags" class="tag-specifc">{{tag._id}}({{tag.value}})</span>
          <span>所有</span>
          <div class="clear"></div>
        </div>
      </div>
      <div class="tag-class">
        <h3>文章归档</h3>
        <div class="tags" @click="blogByTag($event)">
          <span class="time-specifc" v-for="time in times">{{time._id | format_year_month}}({{time.value}})</span>
          <span>所有</span>
          <div class="clear"></div>
        </div>
      </div>
      <div class="tag-class contact">
        <h3>联系我</h3>
        <div><img width="100%" src="http://7xrp7o.com1.z0.glb.clouddn.com/wechat.png" alt=""></div>
      </div>
      <div class="tag-class">
        <h3>作者简介</h3>
        <div>苏俊飞，南昌大学，网络工程2014级，大学一直在南昌大学家园工作室学习前端开发，开发过一些工作室内的项目和自己的个人项目。</div>
        <div class="link">
          <a href="https://github.com/junfeisu">Github</a>
          <a href="https://www.zhihu.com/people/su-jun-fei-87">知乎</a>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <side></side>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .blog {
    background: url('http://7xrp7o.com1.z0.glb.clouddn.com/running.png');
    background-size: cover;
    padding: 10px 5%;
  }

  .blog-left {
    float: left;
    width: 70%;
  }

  .blog-right {
    display: flex;
    float: right;
    width: 25%;
    justify-content: center;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 3px;
    .tag-class {
      width: 86%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .tags {
        display: flex;
        flex-wrap: wrap;
        span {
          @include archiveSpan
        }
      }
      .link {
        width: 50%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      a {
        color: #2c3e50;
        &:hover {
          transform: scale(1.5, 1.5);
          transform-origin: left;
          @include transition($time: 0.3s)
        }
      }
      .tel {
        width: 100%;
        text-align: center;
      }
    }
    .contact {
      display: block;
      text-align: center;
    }
  }
  .clear {
    @include clear-float
  }
</style>

<script>
  import side from '../common/side.vue'
  export default {
    name: 'blog',
    components: {
      'side': side
    },
    data () {
      return {
        listParam: {
          page_size: 1,
          tags: null,
          create_date: null
        },
        tags: [],
        times: []
      }
    },
    methods: {
      blogByTag (event) {
        let target = event.target
        // This is to separate the tagName and number
        let re = /[^()]+/g
        // This is to judge the create_date
        let typeReg = /[\d]{4}-[\d]{2}/
        let matchResults = target.innerHTML.match(re)
        this.listParam.tags = null
        this.listParam.create_date = null
        if (matchResults.length > 1) {
          typeReg.test(matchResults[0]) ? this.listParam.create_date = matchResults[0]
            : this.listParam.tags = matchResults[0]
          Math.ceil(matchResults[1] / 7) < this.listParam.page_size
            ? this.listParam.page_size = 1 : ''
        }
        this.$children[0].currentSize = this.listParam.page_size
        this.getList()
      },
      // 获取博客列表
      async getList () {
        try {
          let data = await res.blog.get_bloglist(this.listParam)
          this.$router.go({path: '/'})
          this.$children[1].dealData(data)
          this.$children[1].total = Math.ceil(data.total / 7)
          this.$children[1].blogs = data.blogs
          this.$children[1].total === 1 ? this.$children[1].next = false : ''
          setTimeout(() => {
            this.setHeight()
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
          })
        } catch (e) {
          this.$root.add({msg: JSON.stringify(e), type: 'error'})
        }
      },
      getTags () {
        res.blog.get_blogtype()
          .then(data => {
            this.tags = data.tags
            this.times = data.times
            window.sessionStorage.setItem('tags', JSON.stringify(data.tags))
            window.sessionStorage.setItem('times', JSON.stringify(data.times))
          })
          .catch(error => {
            console.log(error)
          })
      },
      setHeight () {
        let blog = document.querySelector('.blog')
        blog.style.height = window.screen.availHeight - 80 + 'px'
        let dHeight = document.documentElement.scrollHeight
        let bHeight = document.body.scrollHeight
        let height = Math.max(dHeight, bHeight)
        blog.style.height = height - 80 + 'px'
      },
      // 监测页码变化
      watchFun () {
        this.$children[1].prev = !!(this.listParam.page_size !== 1)
        this.$children[1].next = !!(this.listParam.page_size !== this.$children[1].total)
      }
    },
    watch: {
      'listParam.page_size': {
        handler: 'watchFun',
        deep: true
      }
    },
    ready () {
      let tags = JSON.parse(window.sessionStorage.getItem('tags'))
      let times = JSON.parse(window.sessionStorage.getItem('times'))
      if (tags && times) {
        this.times = times
        this.tags = tags
      } else {
        this.getTags()
      }
    }
  }
</script>
