<template>
  <div class="detail">
    <detail-nav-bar ref="detailNavBar" @itemClick="titleClick" class="detail-nav"/>

    <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" ref="base"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
    </scroll>

    <back-top @click.native="backTop" class="back-top" v-show="isShowBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComs/DetailNavBar'
import DetailSwiper from '@/views/detail/childComs/DetailSwiper'
import DetailBaseInfo from '@/views/detail/childComs/DetailBaseInfo'
import DetailShopInfo from '@/views/detail/childComs/DetailShopInfo'
import DetailGoodsInfo from '@/views/detail/childComs/DetailGoodsInfo'
import DetailParamInfo from '@/views/detail/childComs/DetailParamInfo'
import DetailCommentInfo from '@/views/detail/childComs/DetailCommentInfo'
import DetailRecommendInfo from '@/views/detail/childComs/DetailRecommendInfo'
import DetailBottomBar from '@/views/detail/childComs/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
// import Toast from '@/components/common/toast/Toast'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from '@/network/detail'
import { backTopMixin } from '@/common/mixin'
import { BACKTOP_DISTANCE } from '@/common/const'

import { mapActions } from 'vuex'

export default {
  name: 'detail',
  components: {
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      themeTops: [],
      paramInfo: {},
      commentInfo: {},
      recommendList: []
      // message: '',
      // show: false
    }
  },
  created () {
    this.getDetailData()
    this.getRecommend()
  },
  updated () {
    // 获取需要的offsetTop
    this.getOffsetTops()
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      // 1.获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // 2.将商品信息添加到购物车
      // this.$store.commit('addCart', product)
      /* this.$store.dispatch('addCart', product).then(res => {
        console.log(res)
      }) */
      this.addCart(product).then(res => {
        // toast普通封装，直接把组件导入进来
        /* this.show = true
        this.message = res

        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 500) */

        this.$toast.show(res, 500)
      })
    },
    contentScroll(position) {
      const positionY = -position.y

      for (let i = 0; i < this.themeTops.length; i++) {
        if (this.$refs.detailNavBar.currentIndex !== i && positionY >= this.themeTops[i] - 44 && positionY < this.themeTops[i + 1] - 44) {
          this.$refs.detailNavBar.currentIndex = i
        }
      }

      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index] + 44, 200)
    },
    getOffsetTops() {
      this.themeTops = []
      this.themeTops.push(this.$refs.base.$el.offsetTop)
      this.themeTops.push(this.$refs.param.$el.offsetTop)
      this.themeTops.push(this.$refs.comment.$el.offsetTop)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      this.themeTops.push(Number.MAX_VALUE)
    },
    getDetailData() {
      // 1.保存传入的id
      this.iid = this.$route.params.id

      // 2.根据iid获取数据
      getDetail(this.iid).then(res => {
        const data = res.result

        // 1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取商家信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 5.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }

        // 下一次事件循环,但是有可能图片没有渲染完
        /* this.$nextTick(() => {
          this.themeTops = []
          this.themeTops.push(this.$refs.base.$el.offsetTop)
          this.themeTops.push(this.$refs.param.$el.offsetTop)
          this.themeTops.push(this.$refs.comment.$el.offsetTop)
          this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          this.themeTops.push(Number.MAX_VALUE)
        }) */
      })
    },
    getRecommend() {
      getRecommend().then((res, error) => {
        console.log(res)
        if (error) return
        this.recommendList = res.data.list
      })
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
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
