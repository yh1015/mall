<template>
  <div class="cart-list">
   <cart-list-item v-for="(item,index) in cartListInfo" :key="index" :product="item" />
  </div>
</template>

<script>

  import CartListItem from './CartListItem.vue'
  export default {
    name: 'CartList',
    computed: {
      cartListInfo() {
        return this.$store.state.cartList
      }
    },
    components: {
      CartListItem
    },
  }
</script>

<style scoped>
</style>
