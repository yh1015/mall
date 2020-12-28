<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top  @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

  import {debounce} from 'common/utils'
  import {backTopMixin} from 'common/mixin'
  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        message: '',
        show: false
      }
    },
    mounted() {
      // 监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on("imgLoad",()=> {
        refresh()
      });
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid
      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 获取顶部的图片轮播数据
        // console.log(res)
        const data = res.data.result
        this.topImages = res.data.result.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns , data.shopInfo.services)
        // 获取店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // 请求推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.data.list
          // console.log(res.data.data.list)
        })

      })
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamsInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      Toast,
      GoodsList
    },
    mixins:[backTopMixin],
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop -44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44);
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.$refs.scroll.backTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) {
        const positionY = -position.y;
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++) {
          if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        this.listenShowBackTop(position);
      },
      addToCart() {
        // 获取购物车展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // product.isCheck = true;
        // 2.将商品添加购物车
        this.$store.dispatch('addCart',product).then(res => {
          this.show = true;
          this.message = res;
          setTimeout(() => {
            this.show = false;
            this.message = ''
          },1500)
        })
        console.log(this.$store.state.cartList.length)
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
