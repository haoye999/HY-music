<template>
  <div>
    <div class="loading-container" v-show="!recommendList.length">
      <loading :info="info"/>
    </div>
    <list-title>{{ title }}</list-title>
    <ul class="recommend-list">
      <preview-info class="flex-4" v-for="songList in recommendList" :key="songList.id" :info="songList" @select="$emit('select', $event)"></preview-info>
    </ul>
  </div>
</template>

<script>
import Loading from 'components/base/loading.vue';
import PreviewInfo from 'components/preview-info/preview-info.vue';
import ListTitle from 'components/base/list-title.vue';

export default {
  name: 'recommend-list',
  props: {
    recommendList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '歌单'
    },
    info: {
      type: String,
      default: ''
    }
  },
  components: {
    Loading,
    PreviewInfo,
    ListTitle
  }
};
</script>

<style lang="less" scoped>
.recommend-list-content {
  position: relative;
  overflow: hidden;
  min-height: 337px;
  margin: 20px 12px 0 12px;
  .loading-container {
    display: flex;
    position: absolute;
    top: 30%;
    left: 50%;
    width: 100px;
    transform: translate(-50%, 0);
  }
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

</style>
