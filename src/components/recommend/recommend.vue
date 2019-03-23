<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <div class="slider-content" v-if="banners.length">
      <slider>
        <div v-for="banner in banners" :key="banner.imageUrl">
          <a :href="banner.url">
            <img :src="banner.imageUrl" alt="banner">
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
    <div class="personlized-list-content">
      <div class="loading-container" v-show="!personalized.length">
        <loading ></loading>
      </div>
      <list-title>推荐歌单</list-title>
      <ul class="personlized-list">
        <preview-info v-for="songList in personalized" :key="songList.id" :info="songList" class="flex-4"></preview-info>
      </ul>
    </div>
  </div>
</template>

<script>
import Slider from "components/base/slider.vue";
import ListTitle from "components/base/list-title.vue";
import PreviewInfo from "components/preview-info/preview-info.vue";
import Loading from 'components/base/loading.vue';
import CatalogBtn from 'components/catalog-btn/catalog-btn.vue';

import { getBanners, getPersonalized } from "api/recommend";
import { ERR_OK } from "api/config";

export default {
  name: "Recommend",
  data() {
    return {
      banners: [],
      personalized: [],
      catalogs: [
        {
          title: '私人FM',
          icon: 'icon-Radio-',
        },
        {
          title: '每日推荐',
          icon: 'icon-cc-calendar',
        },
        {
          title: '歌单',
          icon: 'icon-playlist',
        },
        {
          title: '排行榜',
          icon: 'icon-ranking',
        },
      ]
    };
  },
  created() {
    this._getBanners();
    setTimeout(this._getPersonalized, 1000);
  },
  methods: {
    _getBanners() {
      getBanners().then(data => {
        if (data.code === ERR_OK) {
          this.banners = data.banners;
        }
      });
    },
    _getPersonalized() {
      getPersonalized({
        limit: 6,
        alg: "featured"
      }).then(data => {
        if (data.code === ERR_OK) {
          this.personalized = data.result;
        }
      });
    }
  },
  components: {
    Slider,
    ListTitle,
    PreviewInfo,
    Loading,
    CatalogBtn,
  }
};
</script>

<style lang="less" scoped>
@import "~assets/style/variable.less";

.recommend {
  position: fixed;
  overflow-y: auto;
  width: 100%;
  top: 88px;
  bottom: 0;
  .slider-content {
    width: 95%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
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
  .personlized-list-content {
    width: 95%;
    position: relative;
    overflow: hidden;
    min-height: 337px;
    margin: 20px auto 0 auto;
    .personlized-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .loading-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100px;
    transform: translate(-50%, 0);
    z-index: 100;
  }
  .catalog-content {
    display: flex;
    margin-top: 20px;
  }
}
</style>
