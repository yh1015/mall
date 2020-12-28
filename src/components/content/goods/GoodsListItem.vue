<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <img src="~assets/img/common/collect.svg" alt="" id="icon">
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        if(this.$route.path.indexOf('home') !== -1) {
          this.$bus.$emit("itemImgLoad")
        }else if(this.$route.path.indexOf('detail') !== -1) {
          this.$bus.$emit("imgLoad")
        }
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    text-align: center;
    margin-bottom: 10px;
    width: 50%;
  }

  .goods-list-item img {
    width: 95%;
    border-radius: 5px;
  }

  .goods-list-item p {
    width: 95%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
    margin-left: 8px;
  }

  .goods-info {}

  .price {
    color: var(--color-high-text);
  }

  #icon {
    width: 14px;
    height: 14px;
    display: inline;
  }
</style>
