<template>
  <div class="search" @mousewheel.prevent @touchmove.prevent>
    <div class="back" @click="$emit('closeSearch')">
      <i class="iconfont icon-back icon"></i>
    </div>
    <div class="search-bar">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="搜索..."
        @input="handleSearchInput"
        v-model="keywords"
        autocomplete="off"
      />
      <hr class="underline" />
      <ul class="search-suggest">
        <li class="search-suggest-item search-button">搜索 "{{ keywords }}"</li>
        <li
          class="search-suggest-item"
          v-for="suggest in suggests"
          :key="suggest.keyword"
        >
          <span class="search-suggest-content">{{ suggest.keyword }}</span>
        </li>
      </ul>
    </div>
    <div class="search-content">
      <ul class="hots-container">
        <h1 class="hots-title">热门搜索</h1>
        <li class="hot-item" v-for="hot in hots" :key="hot.first">
          {{ hot.first }}
        </li>
      </ul>
      <hr class="separator" />
    </div>
  </div>
</template>

<script>
import { searchSuggest, searchHot } from 'api/search';
import { ERR_OK } from 'api/config';
import { mapMutations } from 'vuex';
import lodash from 'lodash';

export default {
  data() {
    return {
      hots: [],
      suggests: [],
      keywords: ''
    };
  },
  created() {
    this._searchHot();
    this.handleSearchInput = _.throttle(this.handleSearchInput, 300);
  },
  methods: {
    _searchHot() {
      searchHot()
        .then(data => {
          if (data.code === ERR_OK) {
            this.hots = data.result.hots;
          }
        })
        .catch(e => {
          const msg = e.response.data.msg;
          this.setTips(msg);
        });
    },
    _searchSuggest(params) {
      searchSuggest(params)
        .then(data => {
          if (data.code === ERR_OK) {
            this.suggests = data.result.allMatch;
          }
        })
        .catch(e => {
          const msg = e.response.data.msg;
          this.setTips(msg);
        });
    },
    handleSearchInput() {
      if (!this.keywords) {
        return;
      }
      this._searchSuggest({
        keywords: this.keywords
      });
    },
    ...mapMutations({
      setTips: 'SET_TIPS'
    })
  }
};
</script>

<style lang="less" scoped>
@import '~assets/style/variable.less';
@import '~assets/style/mixin.less';

.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 0 8px;
  background-color: @color-background;
  .back {
    z-index: 100;
    .icon {
      font-size: @font-size-large;
      color: @color-icon;
    }
  }
  .search-bar {
    margin: 0 0 0 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 0 20px 0 0;
    #search {
      .mixin-input-reset();
      height: 30px;
      width: 100%;
      color: @color-text-ll;
      border-bottom: 1px solid @color-text-d;
      font-size: @font-size-medium-x;
      &::-webkit-search-cancel-button {
        display: none;
      }
      &:focus {
        & + .underline {
          transform: scale(1);
        }
        & ~ .search-suggest {
          opacity: 1;
        }
      }
    }
    .underline {
      margin: -1px 0 0 0;
      border: 0;
      border-bottom: 1px solid @color-sub-theme;
      transform: scale(0);
      transition: transform 0.3s cubic-bezier(1, 0, 0, 1);
    }
    .search-suggest {
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      padding: 0 20px 0 0;
      background-clip: content-box;
      background-color: @color-dialog-background;
      opacity: 0;
      transition: opacity 0.2s ease-out;
      .search-suggest-item {
        height: 45px;
        line-height: 45px;
        position: relative;
        .search-suggest-content {
          display: inline-block;
          width: 80%;
          color: @color-text-d;
        }
        &:nth-child(n + 2)::before {
          content: '\e621';
          .iconfont();
          display: inline-block;
          margin: 0 8px;
        }
        &:nth-child(n + 2)::after {
          content: '\e7c3';
          // position: absolute;
          // right: 5px;
          .iconfont();
          display: inline-block;
        }
      }
      .search-button {
        padding: 0 0 0 10px;
        color: @color-link;
      }
    }
  }
  .search-content {
    .hots-container {
      padding: 10px 0 0 0;
      display: flow-root;
      .hots-title {
        padding: 6px 10px;
        font-size: @font-size-medium-x;
      }
      .hot-item {
        float: left;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        margin: 5px 4px;
        border-radius: 15px;
        font-size: @font-size-medium;
        background-color: @color-highlight-background;
      }
    }
    hr {
      border: 0;
      border-bottom: 1px solid @color-highlight-background;
      margin: 10px;
    }
  }
}
</style>
