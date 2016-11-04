<template>
  <div class="resume">
    <div class="resume-top">
      <div class="resume-contact">
        <div class="way">
          <img class="code" src="http://7xrp7o.com1.z0.glb.clouddn.com/wechat.png" width="130" height="130" alt="">
          <div>
            <img width="25" height="25" src="http://7xrp7o.com1.z0.glb.clouddn.com/mail.png" alt="">
            <span>sjf1982764150@gmail.com</span>
            <p class="clear"></p>
          </div>
          <div>
            <img width="25" height="25" src="http://7xrp7o.com1.z0.glb.clouddn.com/weixin.png" alt="">
            <span>sjffly</span>
            <p class="clear"></p>
          </div>
          <div>
            <img width="25" height="25" src="http://7xrp7o.com1.z0.glb.clouddn.com/phone.png" alt="">
            <span>18170415420</span>
            <p class="clear"></p>
          </div>
          <div>
            <img width="25" height="25" src="http://7xrp7o.com1.z0.glb.clouddn.com/Github.png" alt="">
            <a href="https://github.com/junfeisu">junfeisu</a>
            <p class="clear"></p>
          </div>
          <div>
            <img width="25" height="25" src="http://7xrp7o.com1.z0.glb.clouddn.com/weibo.png" alt="">
            <span>http://115.159.224.128</span>
            <p class="clear"></p>
          </div>
        </div>
      </div>
      <div class="resume-user">
        <h1>苏俊飞</h1>
        <h3>前端实习生</h3>
      </div>
      <div class="clear"></div>
    </div>
    <div class="resume-content">
      项目经历
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .resume {
    background: #fff;
    margin: 0px auto;
    border-radius: 3px;

    .resume-top {
      width: 100%;
      margin: 0 auto;
      height: 200px;
      background: #000;
      color: #fff;
    }
    .resume-contact {
      width: 30%;
      float: left;
      margin-left: 10%;
      margin-top: 37.5px;
    }
    .way {
      position: relative;
      float: right;
      .code {
        position: absolute;
        left: -140px;
        top: 0px;
      }
      div {
        height: 25px;
        line-height: 25px;
        img {
          float: left;
        }
        span {
          text-align: left;
          display: block;
          float: right;
          width: 80%;
        }
        a {
          text-align: left;
          display: block;
          float: right;
          width: 80%;
          color: #fff;
          text-decoration: none;
          margin-left: 5px;
        }
      }
    }
    .resume-user {
      width: 30%;
      float: right;
      text-align: center;
      margin-top: 37.5px;
      h1 {
        height: 80px;
        line-height: 80px;
        margin: 0px;
        font-size: 60px;
      }
      h3 {
        height: 30px;
        margin: 0px;
        line-height: 30px;
      }
    }

    .resume-content {
      padding: 10px;
    }
  }
  .clear {
    @include clear-float
  }
</style>

<script>
  export default {
    name: 'resume',
    data () {
      return {}
    }
  }
</script>