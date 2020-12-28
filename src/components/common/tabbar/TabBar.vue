<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  import TabBarItem from './TabBarItem.vue'
  export default {
    name: 'TabBar',
    data() {
      return {

      }
    },
		components: {
			TabBarItem
		}
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }


</style>
