<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <div class="slider-content">
      <div v-if="banners.length">
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
    </div>
    <div class="catalog-content">
      <catalog-btn class="flex-3" v-for="catalog in catalogs" :key="catalog.id" :catalog="catalog" @click="catalogBtnClickHandle">
        <i class="iconfont icon" :class="catalog.icon"></i>
      </catalog-btn>
    </div>
    
    <div class="song-list-wrapper">
      <recommend-list 
        v-for="recommendList in recommends"
        :key="recommendList.title"
        :title="recommendList.title"
        class="recommend-list-content"
        :recommendList="recommendList.recommend"
        @select="selectSongList"
        :info="recommendList.info"
      />
    </div>

    <transition name="singer-detail-router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Slider from 'components/base/slider.vue';
import ListTitle from 'components/base/list-title.vue';
import PreviewInfo from 'components/preview-info/preview-info.vue';
import Loading from 'components/base/loading.vue';
import CatalogBtn from 'components/base/catalog-btn.vue';
import RecommendList from 'components/recommend/recommend-list.vue';

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
          id: 0,
          title: '私人FM',
          icon: 'icon-Radio-'
        },
        {
          id: 1,
          title: '每日推荐',
          icon: 'icon-cc-calendar'
        },
        {
          id: 2,
          title: '歌单',
          icon: 'icon-musiclist'
        },
        {
          id: 3,
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
    recommends() {
      return [
        {
          title: '推荐歌单',
          recommend: this.personalized,
          info: ''
        },
        {
          title: '个性化推荐',
          recommend: this.recommendResource,
          info: ''
        },
        {
          title: '热门新碟',
          recommend: this.albumNewest,
          info: ''
        },
        {
          title: '电台推荐',
          recommend: this.djRecommend,
          info: ''
        }
      ]
    },
    ...mapGetters([
      'loggedin'
    ])
  },
  created() {
    this._fresh();
  },
  methods: {
    catalogBtnClickHandle(id) {
      switch (id) {
        case 0:
          this.setDevelopingTips();
          break;
        case 1:
          this.$router.push({
            path: '/recommend/dailyrecommend'
          });
          break;
        case 2:
          this.setDevelopingTips();
          break;
        case 3:
          this.setDevelopingTips();
          break;
      
        default:
          break;
      }
    },
    setDevelopingTips() {
      this.setTips('此功能正在开发，尽情期待');
    },
    selectSongList(songList) {
      this.$router.push({
        path: `/recommend/${songList.id}`
      });
      this.setSongList(songList);
    },
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
          this.setTips('部分功能登录后加载');
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
      setLoggedin: 'SET_LOGGEDIN',
      setSongList: 'SET_SONG_LIST',
      setTips: 'SET_TIPS'
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
    CatalogBtn,
    RecommendList
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
    margin: 0 4vw;
    height: 92vw * 400 / 1080;
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
  .catalog-content {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid#262626;
  }
}
</style>
