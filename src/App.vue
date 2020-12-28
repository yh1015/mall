<template>
	<div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar></main-tab-bar>
	</div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'APP',
  data () {
    return {

    }
  },
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
	@import url("assets/css/base.css");
</style>
