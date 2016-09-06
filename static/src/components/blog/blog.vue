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
        <span v-for="time in times">{{time._id | format_year_month}}({{time.value}})</span>
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
    width: 60%;
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
    .time_class {
      width: 96%;
      margin: 0 auto;
      margin-top: 40px;
      h3 {
        text-align: center;
        margin-bottom: 10px;
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
        times: []
      }
    },
    methods: {
      blogByTag (event) {
        let target = event.target
        this.$children[0].listParam.cursor = null
        if (target.parentElement.className === 'tags') {
          this.$children[0].listParam.time = null
          this.$children[0].listParam.tag = target.innerHTML.split('(')[0]
        } else {
          this.$children[0].listParam.tag = null
          this.$children[0].listParam.time = target.innerHTML.split('(')[0]
        }
        this.$children[0].getList()
      }
    },
    ready () {
      this.$http.get('/api/blog/getblogtype')
        .then(response => {
          let data = JSON.parse(response.body)
          // let newTime = []
          this.tags = data.tags
          this.times = data.times
        }, error => {
          console.log(error)
        })
    }
  }
</script>