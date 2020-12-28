<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
   <div class="total-price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.isCheck
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => {
          return item.isCheck
        }).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.isCheck)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.isCheck = false)
        } else {
          this.$store.state.cartList.forEach(item => item.isCheck = true)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .check-content {
    display: flex;
    margin-left: 5px;
  }
  .check-button {
    width: 22px;
    height: 22px;
  }
  .calculate {
    width: 90px;
    background-color: #FFFF00;
    text-align: center;
  }
</style>
