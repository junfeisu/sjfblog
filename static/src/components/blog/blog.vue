<template>
  <div class="blog-left">
    <router-view keep-alive></router-view>
  </div>
  <div class="blog-right">
    <div class="tag-class">
      <h3>文章标签</h3>
      <div class="tags" @click="blogByTag($event)">
        <span v-for="tag in tags" class="tag-specifc">{{tag._id}}({{tag.value}})</span>
        <div class="clear"></div>
      </div>
    </div>
    <div class="tag-class">
      <h3>文章归档</h3>
      <div class="tags" @click="blogByTag($event)">
        <span class="time-specifc" v-for="time in times">{{time._id | format_year_month}}({{time.value}})</span>
        <div class="clear"></div>
      </div>
    </div>
    <div class="tag-class">
      <h3>作者简介</h3>
      <div class="author-description">
        苏俊飞，南昌大学，网络工程2014级，大学四年一直在南昌大学家园工作室学习前端开发
      </div>
    </div>
  </div>
  <div class="clear"></div>
  <side></side>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .blog-left {
    float: left;
    width: 70%;
    // margin-left: 5%;
  }
  .blog-right {
    float: right;
    width: 25%;
    background: #fff;
    border-radius: 3px;
    .tag-class {
      width: 96%;
      margin: 0 auto;
      margin-top: 10px;
      h3 {
        text-align: center;
        margin-bottom: 10px;
      }
      .tags {
        width: 90%;
        margin: 0 auto;
        span {
          @include archiveSpan
        }
      }
    }
    .author-description {
      padding: 10px;
      line-height: 1.6;
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
        tags: [],
        times: []
      }
    },
    methods: {
      blogByTag (event) {
        let target = event.target
        if (target.className === 'tag-specifc') {
          this.$children[0].listParam.tags = target.innerHTML.split('(')[0]
          this.$children[0].listParam.create_date = null
        } else if (target.className === 'time-specifc') {
          this.$children[0].listParam.create_date = target.innerHTML.split('(')[0]
          this.$children[0].listParam.tags = null
        }
        this.$children[0].getList()
      },
      getTags () {
        res.blog.get_blogtype()
          .then(data => {
            this.tags = data.tags
            this.times = data.times
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    ready () {
      this.getTags()
    }
  }
</script>