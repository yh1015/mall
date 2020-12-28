<template>
  <div class="list-item">
    <div class="item-selector" >
      <check-button :is-check="product.isCheck" @click.native="changeCheck"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'
  export default {
    name: "CartGoodsListItem",
    props:{
      product: {
        type:Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isCheck: false
      }
    },
    methods: {
      changeCheck() {
        this.product.isCheck = !this.product.isCheck;
        console.log(this.product.isCheck)
      }
    },
    components: {
      CheckButton
    }
  }
</script>

<style scoped>
  .list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .item-title {
    font-size: 18px;
    margin-bottom: 4px;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color:#333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info, .item-desc {
    color: #666;
    font-size: 14px;
  }
  .item-desc {
    margin-top:15px;
  }
  .info-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  .item-price {
    color: #ffb805;
    font-size: 20px;
  }
  .item-count {
    font-size: 20px;
  }
</style>
