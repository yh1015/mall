<template>
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info">
    <div class="title"> {{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-base-info {
    padding: 0 5px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0 15px;
  }

  .info-price {
    height: 40px;
    display: flex;
  }

  .new-price {
    font-size: 25px;
    margin-left: 5px;
    color: var(--color-high-text);
    font-weight: bold;
  }

  .old-price {
    text-decoration: line-through;
    font-size: 15px;
    margin-top: 10px;
    margin-left: 5px;
  }

  .discount {
    padding: 5px;
    background-color: var(--color-high-text);
    border-radius: 10px;
    font-size: 12px;
    margin-left: 5px;
    color: white;
    height: 20px;
    line-height: 10px;
  }

  .info-other {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 5px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }

  .info-service {
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }


  .info-service-item img{
    width: 15px;
    vertical-align: middle;
  }

  .info-service-item span {
    font-size: 15px;
    font-weight: 600;

  }
</style>
