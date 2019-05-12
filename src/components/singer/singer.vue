<template>
  <div class="singer">
    <div class="cat-content">
      <div class="cat-region-content cat-sub-content">
        <cat-list
          :list-items="catRegion"
          :list-item-active="catRegionIndex"
          @changeList="changeCatRegion($event)"
        ></cat-list>
      </div>
      <div class="cat-sex-content cat-sub-content">
        <cat-list
          :disabled="!~~catRegionIndex"
          :list-items="catSex"
          :list-item-active="catSexIndex"
          @changeList="changeCatSex($event)"
        ></cat-list>
      </div>
      <div class="cat-initial-content cat-sub-content">
        <cat-list
          :disabled="!~~catRegionIndex"
          :list-items="catInitial"
          :list-item-active="catInitialIndex"
          @changeList="changeCatInitial($event)"
        ></cat-list>
      </div>
    </div>

    <div class="singer-content">
      <div class="loading-container">
        <loading v-show="!singers.length"></loading>
      </div>
      <singer-item
        v-for="singer in singers"
        class="singer-item flex-3"
        :key="singer.id"
        :singer="singer"
        @select="selectSinger($event)"
      />
    </div>
    <transition name="singer-detail-router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopArtists, getArtistList } from 'api/singer';
import { ERR_OK } from 'api/config';

import CatList from 'components/base/cat-list.vue';
import SingerItem from 'components/singer/singer-item.vue';
import Loading from 'components/base/loading';
import { mapMutations } from 'vuex';

export default {
  name: 'singer',
  data() {
    return {
      singers: [],
      catRegion: {
        0: '热门',
        1: '华语',
        2: '欧美',
        6: '日本',
        7: '韩国',
        4: '其他'
      },
      catSex: { 1: '男', 2: '女', 3: '乐队/组合' },
      catRegionIndex: '0',
      catSexIndex: '1',
      catInitialIndex: '0'
    };
  },
  computed: {
    catInitial() {
      const result = { 0: '全部' };
      let initial = 'a';
      while (initial.match(/[a-z]/)) {
        result[initial.charCodeAt(0) - 'a'.charCodeAt(0) + 1] = initial;
        initial = String.fromCharCode(initial.charCodeAt(0) + 1);
      }

      return result;
    },
    cat() {
      return `${this.catRegionIndex}00${this.catSexIndex}`;
    }
  },
  components: {
    CatList,
    SingerItem,
    Loading
  },
  created() {
    this._getArtistList();
  },
  methods: {
    _getTopArtists(offset, limit) {
      getTopArtists({
        offset,
        limit
      })
        .then(data => {
          if (data.code === ERR_OK) {
            this.singers = data.artists;
          }
        })
        .catch(err => {
          throw err;
        });
    },
    _getArtistList() {
      if (this.catRegionIndex === '0') {
        this._getTopArtists(0, 100);
        return;
      }
      getArtistList({
        cat: this.cat,
        limit: 100,
        offset: 0,
        initial: this.catInitial[this.catInitialIndex].match(/[a-z]/)
          ? this.catInitial[this.catInitialIndex]
          : ''
      })
        .then(data => {
          if (data.code === ERR_OK) {
            this.singers = data.artists;
          }
        })
        .catch(err => {
          throw err;
        });
    },
    changeCatRegion(index) {
      this.catRegionIndex = index;
    },
    changeCatSex(index) {
      this.catSexIndex = index;
    },
    changeCatInitial(index) {
      this.catInitialIndex = index;
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    cat() {
      this.singers = [];
      this._getArtistList();
    },
    catInitialIndex() {
      this.singers = [];
      this._getArtistList();
    }
  }
};
</script>

<style lang="less" scoped>
.singer {
  margin: 95px 0 50px 0;
  overflow: hidden;
  .cat-content {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    .cat-sub-content {
      padding: 10px;
      overflow-x: auto;
    }
  }
  .singer-content {
    margin-top: 16px;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    min-height: 100vh;
    .singer-item {
      margin: 16px 0 0 0;
    }
    .loading-container {
      position: absolute;
      width: 30%;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
