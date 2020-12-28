<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="shop-cart-nav">购物车({{cartLength}})</div>
    </nav-bar>
     <scroll class="content" ref="scroll">
      <cart-list/>
     </scroll>
     <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
 
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: 'Cart',
    data() {
      return {
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
      ...mapGetters(['cartLength','cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
      console.log(this.$store.state.cartList.length)
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }

  .content {
    height: calc(100% - 49px - 44px - 40px);
    overflow: hidden;
  }
</style>
