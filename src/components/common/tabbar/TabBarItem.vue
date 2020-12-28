<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active: !isActive, itemName: true}">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) == -1;
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    line-height: 49px;
  }

  .tab-bar-item img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-top: -15px;
  }
  .tab-bar-item .itemName {
    margin-top: -32px;
    font-size: 14px;
  }
  .active {
    color: red;
  }
</style>
