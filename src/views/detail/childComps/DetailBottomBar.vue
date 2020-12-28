<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .detail-bottom-bar {
    background-color: #fff;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
    padding: 0 5px;
  }
  .left {
    width: 50%;
  }
  .left,.right {
    display: flex;
    width: 50%;
    /* justify-content: space-between; */
  }
  .left .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 5px 21px 3px;
    background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }
  .left .shop {
    background-position: 0 57px;
  }
  .left .service {
    background-position: 0 107px;
  }
  .text {
    font-size: 14px;
  }
  .cart {
    height: 49px;
    width: 94px;
    background-color: #fff737;
    text-align: center;
    color:#666;
    font-size: 16px;
    line-height: 49px;
  }
  .buy {
    height: 49px;
    width: 94px;
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
    font-size:16px;
    line-height: 49px;
    flex: 1;
  }
</style>
