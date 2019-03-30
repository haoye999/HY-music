<template>
  <div class="login-cell">
    <div class="nav">
      <div class="back" @click="back">
        <i class="iconfont icon-back icon"></i>
      </div>
      <h1 class="title">手机号登陆</h1>
    </div>
    <div class="form-wrapper">
      <form method="get" class="form">
        <label class="input">
          <input ref="phone" type="text" name="cell" placeholder="请输入手机号">
        </label>
        <label class="input">
          <input ref="password" type="password" name="password" placeholder="请输入密码">
        </label>
        <div class="btn-wrapper">
          <button type="submit" @click.prevent="login">登陆</button>        
        </div>
      </form>
    </div>
    <div class="info">{{ info }}</div>
  </div>
</template>

<script>
import { loginCell } from 'api/user';
import { ERR_OK, NEED_LOGIN, WRONG_PWD } from 'api/config';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'login-cell',
  data() {
    return {
      info: ''
    }
  },
  computed: {
    ...mapGetters([
      'loggedin'
    ])
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    login() {
      let phone = this.$refs.phone.value;
      let password = this.$refs.password.value;
      this._login(phone, password);
    },
    _login(phone, password) {
      loginCell({
        phone,
        password
      }).then(data => {
        console.log(data.code);
        if (data.code === ERR_OK) {
          this.info = `${data.profile.nickname}，你已经成功登陆`;
        }
        setTimeout(() => {
          this.$router.push('/recommend');
          this.setLoggedin(true);
        }, 2000);
      }).catch(err => {
        this.info = err.response.data.msg;
      })
    },
    ...mapMutations({
      setLoggedin: 'SET_LOGGEDIN'
    })
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.login-cell {
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .input {
        height: 30px;
        width: 90%;
        input {
          height: 100%;
          width: 100%;
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
  .info {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: greenyellow;
  }
}
</style>
