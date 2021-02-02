<template>
  <div class="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <scroll class="slide-bar-height" ref="scroll">
      <silde-bar :slideBarList="goodsTitle" ref="silde" @slideBarItemClick="slideBarItemClick"/>
    </scroll>

    <scroll class="sub-category" ref="scroll">
      <sub-category :CategoryList="goods" @changeHeight="changeHeight"/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SildeBar from './children/SildeBar'
  import SubCategory from './children/SubCategory.vue'

  import {getCategory,getSubcategory} from 'network/category'
  import Scroll from "@/components/common/scroll/Scroll";

  export default {
    name: 'Category',
    data() {
      return {
        goodsTitle: [],
        goods:[]
      }
    },
    components: {
      NavBar,
      SildeBar,
      SubCategory,
      Scroll
    },
    created() {
      this.getCategory();
      this.slideBarItemClick({index: 0,maitKey: "3627"})
    },
    methods: {
      // 请求分类名称数据
      getCategory() {
        getCategory().then(res => {
          this.goodsTitle = res.data.data.category.list;
          // console.log(this.goodsTitle)
        })
      },
      slideBarItemClick(obj) {
          getSubcategory(obj.maitKey).then(res => {
            this.goods = res.data.data.list
            console.log(obj.index)
          })
      },
      changeHeight() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .category-nav {
      background-color: var(--color-tint);
      color: white;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;
  }

  .slide-bar-height {
    position: fixed;
    top: 44px;
    right: 0px;
    bottom: 49px;
    left: 0px;
    overflow: hidden;
    width: 100px;
    background-color: #f6f6f6;
    height: calc(100vh - 44px - 49px);
  }

  .sub-category {
    position: fixed;
    left: 100px;
    right: 0;
    top: 44px;
    bottom: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 44px - 49px);
    width: 275px;
  }
</style>
