<template>
  <div class="login">
    <div class="nav">
      <div class="back" @click="back">
        <i class="iconfont icon-back icon"></i>
      </div>
      <h1 class="title">登陆</h1>
    </div>
    <div class="logo-wrapper">
      <i class="iconfont icon-music logo"></i>
    </div>
    <div class="login-way-select">
      <router-link tag="div" to="/login/logincell" class="btn-wrapper"><button>手机号登陆</button></router-link>
      <router-link tag="div" to="" class="btn-wrapper"><button>邮箱登陆</button></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    back() {
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @color-background;
  z-index: 10;
  .nav {
    display: flex;
    align-items: center;
    .back {
      width: 40px;
      position: static;
    }
    .title {
      height: 30px;
      line-height: 30px;
      flex: 1;
    }
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60%;
    width: 100%;
    .logo {
      font-size: 80px;
      color: @color-icon;
    }
  }
  .login-way-select {
    display: flex;
    height: 20%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .btn-wrapper {
      width: 80%;
      button {
        height: 35px;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 15px 15px;
        font-size: @font-size-small-x;
        color: @color-text-light;
        background: @color-icon;
        letter-spacing: 4px;
      }
    }
  }
}
</style>
