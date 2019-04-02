<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <div class="slider-content" v-if="banners.length">
      <slider>
        <div v-for="banner in banners" :key="banner.imageUrl">
          <a>
            <img :src="httpsify(banner.imageUrl)" alt="banner">
            <span
              class="type-title"
              :style="`background: ${banner.titleColor}`"
            >{{ banner.typeTitle }}</span>
          </a>
        </div>
      </slider>
    </div>
    <div class="catalog-content">
      <catalog-btn class="flex-3" v-for="catalog in catalogs" :key="catalog.title" :title="catalog.title">
        <i class="iconfont icon" :class="catalog.icon"></i>
      </catalog-btn>
    </div>
    <!-- 推荐歌单 / personlized -->
    <div class="recommend-list-content">
      <div class="loading-container" v-show="!personalized.length">
        <loading ></loading>
      </div>
      <list-title>推荐歌单</list-title>
      <ul class="recommend-list">
        <preview-info v-for="songList in personalized" :key="songList.id" :info="songList" class="flex-4"></preview-info>
      </ul>
    </div>
    <!-- 个性化推荐 / recommend-resource -->
    <div class="recommend-list-content">
      <div class="loading-container" v-show="!recommendResource.length">
        <loading ></loading>
      </div>
      <list-title class="list-title">个性化推荐</list-title>
      <ul class="recommend-list" v-if="recommendResource.length">
        <preview-info v-for="songList in recommendResource" :key="songList.id" :info="songList" class="flex-4"></preview-info>
      </ul>
      <div class="meg" v-if="!loggedin">{{ msg }}</div>
    </div>
    <!-- 热门新碟 / album-newest -->
    <div class="recommend-list-content">
      <div class="loading-container" v-show="!albumNewest.length">
        <loading ></loading>
      </div>
      <list-title class="list-title">热门新碟</list-title>
      <ul class="recommend-list" v-if="albumNewest.length">
        <preview-info v-for="songList in albumNewest" :key="songList.id" :info="songList" class="flex-4"></preview-info>
      </ul>
    </div>
    <!-- 推荐电台 / dj-recommend -->
    <div class="recommend-list-content">
      <div class="loading-container" v-show="!djRecommend.length">
        <loading ></loading>
      </div>
      <list-title class="list-title">电台推荐</list-title>
      <ul class="recommend-list" v-if="djRecommend.length">
        <preview-info v-for="dj in djRecommend" :key="dj.id" :info="dj" class="flex-4"></preview-info>
      </ul>
    </div>
  </div>
</template>

<script>
import Slider from 'components/base/slider.vue';
import ListTitle from 'components/base/list-title.vue';
import PreviewInfo from 'components/preview-info/preview-info.vue';
import Loading from 'components/base/loading.vue';
import CatalogBtn from 'components/base/catalog-btn.vue';

import {
  getBanners, getPersonalized, getRecommendResource, getAlbumNewest, getDjRecommend
} from 'api/recommend';
import { loginCell, getLoginStatus } from 'api/user';
import { ERR_OK, NEED_LOGIN } from 'api/config';
import { httpsify } from 'assets/js/util';

import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'Recommend',
  data() {
    return {
      banners: [],
      personalized: [],
      catalogs: [
        {
          title: '私人FM',
          icon: 'icon-Radio-'
        },
        {
          title: '每日推荐',
          icon: 'icon-cc-calendar'
        },
        {
          title: '歌单',
          icon: 'icon-musiclist'
        },
        {
          title: '排行榜',
          icon: 'icon-ranking'
        }
      ],
      recommendResource: [],
      albumNewest: [],
      djRecommend: [],
      loggedIn: false,
      msg: ''
    };
  },
  computed: {
    ...mapGetters([
      'loggedin'
    ])
  },
  created() {
    this._fresh();
  },
  methods: {
    httpsify(url) {
      return httpsify(url);
    },
    _fresh() {
      this._getBanners();
      this._getPersonalized();
      this._getRecommendResource();
      this._getAlbumNewest();
      this._getDjRecommend();
    },
    _getBanners() {
      getBanners().then(data => {
        if (data.code === ERR_OK) {
          this.banners = data.banners;
        }
      });
    },
    _getPersonalized() {
      getPersonalized({
        limit: 6
      }).then(data => {
        if (data.code === ERR_OK) {
          this.personalized = data.result;
        }
      });
    },
    _getRecommendResource() {
      getRecommendResource().then(data => {
        if (data.code === ERR_OK) {
          this.recommendResource = Array.prototype.slice.call(data.recommend, 0, 6);
        }
      }).catch(err => {
        if (err.response.data.code === NEED_LOGIN) {
          this.msg = err.response.data.msg;
        }
      });
    },
    _getAlbumNewest() {
      getAlbumNewest().then(data => {
        if (data.code === ERR_OK) {
          this.albumNewest = Array.prototype.slice.call(data.albums, 0, 6);
        }
      });
    },
    _getDjRecommend() {
      getDjRecommend().then(data => {
        if (data.code === ERR_OK) {
          this.djRecommend = Array.prototype.slice.call(data.djRadios, 0, 6);
        }
      });
    },
    ...mapMutations({
      setLoggedin: 'SET_LOGGEDIN'
    })
  },
  watch: {
    loggedin() {
      this._fresh();
    }
  },
  components: {
    Slider,
    ListTitle,
    PreviewInfo,
    Loading,
    CatalogBtn
  }
};
</script>

<style lang="less" scoped>
@import "~assets/style/variable.less";

.recommend {  
  margin: 95px 0 50px 0;
  // position: fixed;
  // overflow-y: auto;
  // width: 100%;
  // top: 88px;
  // bottom: 0;
  .slider-content {
    position: relative;
    overflow: hidden;
    margin: 0 12px;
    font-size: 0;
    border-radius: 8px;
    .type-title {
      position: absolute;
      display: block;
      padding: 5px;
      bottom: 0;
      right: 0;
      font-size: @font-size-small-s;
      color: white;
      border-radius: 5px 0 0 0;
      opacity: 0.9;
      letter-spacing: 1px;
    }
  }
  .recommend-list-content {
    position: relative;
    overflow: hidden;
    min-height: 337px;
    margin: 20px 12px 0 12px;
    .recommend-list {
      display: flex;
      flex-wrap: wrap;
    }
    .list-title {
      padding-left: 5px;
    }
    .meg {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .loading-container {
    display: flex;
    position: absolute;
    top: 30%;
    left: 50%;
    width: 100px;
    transform: translate(-50%, 0);
  }
  .catalog-content {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid#262626;
  }
}
</style>
