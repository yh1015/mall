<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" class="tabControl"/>
    <scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="scroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template> 

<script>
  import HomeSwiper from 'views/home/childComps/HomeSwiper'
  import RecommendView from 'views/home/childComps/RecommendView'
  import Feature from 'views/home/childComps/Feature'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/common/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {debounce} from 'common/utils'

  export default {
    name: 'Vue',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        isShowBackTop: false,
        topOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      Feature,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // 监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on("itemImgLoad",()=> {
        refresh();
      });
    },
    methods: {
      /*
        事件监听相关的方法
      */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      backClick() {
        this.$refs.scroll.backTo(0,0,500)
      },

      scroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;
        // 2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > (this.tabOffsetTop - 46)
      },

      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      // 获取tabControl离顶部的高度
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*
        网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
      }
    },
    activated() {
      this.$refs.scroll.backTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .content {
    height: calc(100% - 49px);
    overflow: hidden;
  }

  .tabControl {
    position: absolute;
    float: left;
    z-index: 9;
    width: 100%;
  }
</style>
