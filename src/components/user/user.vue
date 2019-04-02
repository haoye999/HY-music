<template>
  <div class="user">
    <div class="back" @click="back">
      <i class="iconfont icon-back icon"></i>
    </div>
    <div class="share">
      <i class="iconfont icon-share icon"></i>
    </div>
    <div class="common-info-container">
      <div class="bg-img" :style="bgImg"></div>
      <div class="avatar-wrapper">
        <div class="avatar" :style="avatar"></div>
        <h3 class="name">{{ user.nickname }}</h3>
      </div>
      <div class="base-info-container">
        <h4 class="subtitle">个人信息</h4>
        <div class="info-detail-wrapper">
          <div class="info-detail">等级：{{ level }}</div>
          <div class="info-detail">生日：{{ birthday }}</div>
        </div>
      </div>
    </div>
    <div class="logout">
      <button @click="logout">切换账号</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { loginCell, logout, getLoginStatus, getUserDetail } from 'api/user';
import { ERR_OK, NEED_LOGIN } from 'api/config';
import { httpsify } from 'assets/js/util';

export default {
  name: 'user',
  data() {
    return {
      user: {},
      level: 0
    }
  },
  computed: {
    bgImg() {
      return `background-image: url(${httpsify(this.user.backgroundUrl)})`;
    },
    avatar() {
      return `background-image: url(${httpsify(this.user.avatarUrl)})`;
    },
    birthday() {
      let birthday = new Date(this.user.birthday);
      return `${birthday.getMonth() + 1}月${birthday.getDate()}日`;
    },
    ...mapGetters([
      'loggedin',
      'userId'
    ])
  },
  activated() {
    if (this.loggedin) {
      this._getUserDetail();
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    _getUserDetail() {
      if (!this.userId) {
        this.$router.back();
        return;
      }
      getUserDetail({
        uid: this.userId
      }).then(data => {
        this.user = data.profile;
        this.level = data.level;
      })
    },
    logout() {
      logout().then((data) => {
        console.log(data);
        if (data.code === ERR_OK) {
          this.setLoggedin(false);
          this.setUserId(0);
          this.setTips('成功退出账号');
          
          setTimeout(() => {
            this.$router.push('/recommend');
          }, 2000);
        }
      })
    },
    ...mapMutations({
      setLoggedin: 'SET_LOGGEDIN',
      setUserId: 'SET_USER_ID',
      setTips: 'SET_TIPS'
    })
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';

.user {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @color-background;
  z-index: 10;
  .back {
    z-index: 100;
    .icon {
      font-size: @font-size-large;
      color: @color-icon;
    }
  }
  .share {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .icon {
      font-size: @font-size-large;
      color: @color-icon;
    }
  }
  .common-info-container {
    position: relative;
    height: 100%;
    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: no-repeat center / cover;
      opacity: .4;
    }
    .avatar-wrapper {
      position: absolute;
      left: 50%;
      top: 100px;
      transform: translate3d(-50%, 0, 0);
      .name {
        padding: 20px;
        text-align: center;
      }
      .avatar {
        background: no-repeat center / cover;
        height: 100px;
        width: 100px;
        border-radius: 50%;
      }
    }
    .base-info-container {
      position: absolute;
      top: 256px;
      left: 0;
      width: 100%;
      padding: 50px 100px;
      .subtitle {
        text-align: center;
        font-size: @font-size-large;
      }
      .info-detail-wrapper {
        padding-top: 20px;
        .info-detail {
          padding-top: 15px;
        }
      }
    }
  }
  .logout {
    position: absolute;
    // height: 30px;
    bottom: 30px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 30%;
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
</style>
