<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" @load="imgLoad" :src="item" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        // 判断所有图片加载完了，那么进行一次回调就可以啦
        if(++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
    .info-desc {
      padding: 20px 15px;
    }

    .info-desc .start,
    .info-desc .end {
      position: relative;
      width: 90px;
      height: 1px;
      background-color: #a3a3a5;
    }

    .info-desc .start {
      float: left;
    }

    .info-desc .end {
      float: right;
    }

    .info-desc .start::before,
    .info-desc .end::after {
      position: absolute;
      bottom: 0;
      width: 5px;
      height: 5px;
      content: "";
      background-color: #333333;
    }

    .info-desc .end::after {
      right: 0;
    }

    .info-desc .desc {
      font-size: 14px;
      padding: 15px 0;
    }

    .info-key {
      font-size: 15px;
      margin: 10px 0 10px 15px;
      color: #333333;
    }

    .info-list img {
      width: 100%;
    }
</style>
