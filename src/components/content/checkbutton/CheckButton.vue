<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{check:isCheck}">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isCheck:{
        type:Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button img{
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border:2px solid #c0c0c0;
    vertical-align: middle;
    margin-bottom: 6px;
  }
  .check {
    border:2px solid var(--color-tint) !important;
    background-color: var(--color-tint);
  }
</style>
