<template>
  <tab-bar class="tab-bar">
    <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/homeActive.svg" alt="" slot="item-icon-active">
        <div slot="item-name" class="item-name">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/categoryActive.svg" alt="" slot="item-icon-active">
        <div slot="item-name" class="item-name">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart">
        <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/cartActive.svg" alt="" slot="item-icon-active">
        <div slot="item-name" class="item-name">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/profileActive.svg" alt="" slot="item-icon-active">
        <div slot="item-name">我的</div>
      </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  data () {
    return {

    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
  .tab-bar img {
    width: 30px;
  }
</style>
