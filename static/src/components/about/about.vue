<template>
  <div class="about">
    <div class="bg">
    </div>
    <div class="about-content">
      <div class="about_top">
        <h2>About Sjffly</h2>
      </div>
      <div id="description">
        <h3>个人简介</h3>
        <div class="user">
          <img src="http://7xrp7o.com1.z0.glb.clouddn.com/sjfblog.png" width="100" height="100" alt="">
          <span class="user_name">苏俊飞</span>
          <p>坚持就是胜利</p>
          <p>珍惜现在所有的,争取你该拥有的</p>
          <p>南昌大学～2014级～本科～网络工程</p>
        </div>
      </div>
      <div id="skill">
        <h3>专业技能</h3>
        <div class="skill_list">
          <div class="specifc">
            <div class="track"></div>
            <div class="left_circle"></div>
            <div class="right_circle"></div>
            <div class="master"></div>
            <span>50%</span>
            <span>HTML/CSS/JS</span>
          </div>
          <div class="specifc">
            <div class="track"></div>
            <div class="left_circle"></div>
            <div class="right_circle"></div>
            <div class="master"></div>
            <span>50%</span>
            <span>Node/Mongodb</span>
          </div>
          <div class="specifc">
            <div class="track"></div>
            <div class="left_circle"></div>
            <div class="right_circle"></div>
            <div class="master"></div>
            <span>50%</span>
            <span>Node/Mongodb</span>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div id="contact">
        <h3>联系方式</h3>
        <div class="contact_way">
          邮箱 : <span href="#">sjf1982764150@gmail.com</span>
        </div>
        <div class="contact_way">
          知乎 : <a href="https://www.zhihu.com/people/su-jun-fei-87">苏俊飞</a>
        </div>
        <div class="contact_way">
          Github : <a href="https://github.com/junfeisu">junfeisu</a>
        </div>
        <div class="contact_way">
          QQ : <span href="#">1982764150</span>
        </div>
        <div class="contact_way">
          电话 : <span href="#">18170415420</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .bg {
    position: absolute;
    bottom: 0px;
    top: 80px;
    left: 0px;
    right: 0px;
    opacity: 0.3;
    background: url('./../../assets/img/about.png')
  }

  .about-content {
    width: 90%;
    margin: 20px auto;
  }
  .about_top {
    height: 40px;
    line-height: 40px;
    h2{
      text-align: center;
      color: $color;
      margin: 0px;
    }
  }

  h3 {
    text-align: center;
    color: $strongColor;
    background: #e4e4e4;
    height: 30px;
    line-height: 30px;
    border-left: 4px solid #00a67c;
    margin-left: -4px;
  }

  #description {
    margin: 20px 0px;
    .user {
      width: 30%;
      margin: 0 auto;
      text-align: center;
      color: #555;
      img {
        @include transition($time: .9s);
        border-radius: 50px;
        &:hover {
          border-radius: 0px;
        }
      }
      span {
        display: block;
        margin-top: 5px;
      }
    }
  }

  #skill {
    margin: 10px 0px;
    padding-bottom: 20px;
    .skill_list {
      width: 90%;
      margin: 5px auto;
      text-align: center;
      .specifc {
        width: 20%;
        margin-left: 13%;
        height: 140px;
        line-height: 140px;
        position: relative;
        float: left;
        .track {
          @include position;
        }
        .master {
          clip: rect(0 50px 100px 0);
          @include position;
        }
        .left_circle {
          clip: rect(0 50px 100px 0);
          @include position;
          border-color: #6fec6f;
          @include transform($angel: 144deg);
        }
        .right_circle {
          clip: rect(0 50px 100px 0);
          opacity: 0;
          @include transform;
          @include position;
          border-color: #6fec6f;
        }
        span {
          position: absolute;
          left: 34px;
          top: 26%;
          height: 30px;
          line-height: 30px;
          &:last-child {
            left: 0%;
            top: 72%;
          }
        }
      }
    }
  }

  #contact {
    padding-bottom: 20px;
    .contact_way {
      text-align: left;
      width: 40%;
      margin: 5px auto;
      margin-left: 40%;
      a {
        text-decoration: none;
        color: #555;
      }
    }
  }
  .clear {
    @include clear-float
  }
</style>

<script>
  export default {
    name: 'about',
    data () {
      return {}
    },
    ready () {
      setTimeout(() => {
        this.$parent.setHeight()
      })
    }
  }
</script>