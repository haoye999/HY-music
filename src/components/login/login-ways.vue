<template>
  <div class="login-ways">
    <div class="nav">
      <div class="back" @click="back">
        <i class="iconfont icon-back icon"></i>
      </div>
      <h1 class="title">{{ loginWayTitle }}</h1>
    </div>
    <div v-if="loginWay === 'cell'" class="form-wrapper">
      <form method="get" class="form">
        <label class="input">
          <input ref="phone" type="tel" name="cell" placeholder="请输入手机号">
        </label>
        <label class="input">
          <input ref="password" type="password" name="password" placeholder="请输入密码">
        </label>
        <div class="btn-wrapper">
          <button type="submit" @click.prevent="_loginCell">登录</button>
        </div>
      </form>
    </div>
    <div v-if="loginWay === 'email'" class="form-wrapper">
      <form method="get" class="form">
        <label class="input">
          <input ref="email" type="email" name="email" placeholder="请输入您的邮箱">
        </label>
        <label class="input">
          <input ref="ePassword" type="password" name="e-password" placeholder="请输入密码">
        </label>
        <div class="btn-wrapper">
          <button type="submit" @click.prevent="_loginMail">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { loginCell, loginMail } from 'api/user';
import {
  ERR_OK, NEED_LOGIN, WRONG_PWD, CHEATING
} from 'api/config';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'login-cell',
  data() {
    return {
      info: ''
    };
  },
  computed: {
    loginWayTitle() {
      return this.loginWay === 'cell' ? '手机号登录' : '邮箱登陆';
    },
    ...mapGetters([
      'loggedin',
      'loginWay'
    ])
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    _loginCell() {
      const phone = this.$refs.phone.value;
      const password = this.$refs.password.value;
      loginCell({
        phone,
        password
      }).then(data => {
        if (data.code === ERR_OK) {
          this.setLoggedin(true);
          this.setUserId(data.account.id);
          this.setTips(`${data.profile.nickname}，你已经成功登录`);
          this.back();
          setTimeout(() => {
            this.$router.push('/recommend');
          }, 2000);
        }
      }).catch(err => {
        this.setTips(err.response.data.msg);
      });
    },
    _loginMail() {
      const email = this.$refs.email.value;
      const password = this.$refs.ePassword.value;
      loginMail({
        email,
        password
      }).then(data => {
        if (data.code === ERR_OK) {
          this.setLoggedin(true);
          this.setUserId(data.account.id);
          this.setTips(`${data.profile.nickname}，你已经成功登录`);
          this.back();
          setTimeout(() => {
            this.$router.push('/recommend');
          }, 2000);
        }
      }).catch(err => {
        if (err.response.data.code === CHEATING) {
          this.setTips('邮箱登陆方式出现问题，请改用手机登录');
          this.back();
          return;
        }
        this.setTips(err.response.data.msg);
      });
    },
    ...mapMutations({
      setLoggedin: 'SET_LOGGEDIN',
      setUserId: 'SET_USER_ID',
      setTips: 'SET_TIPS'
    })
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.login-ways {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @color-background;
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
  .form-wrapper {
    padding: 40px 0 0 0;
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    .form {
      height: 100%;
      width: 100%;
      padding: 0 20px;
      .input {
        display: block;
        height: 30px;
        margin: 0 0 40px 0;
        input {
          width: 100%;
          height: 100%;
          padding: 0 0 0 5px;
          border: none;
          border-bottom: 1px solid @color-background-d;
          outline: none;
          color: @color-text;
          background: @color-background;
          font-size: @font-size-medium-x;
        }
      }
      .btn-wrapper {
        margin: 0 auto;
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
}
</style>
