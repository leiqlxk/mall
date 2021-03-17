<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control v-show="isShowTab" ref="tabControl1" class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2" class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from '@/views/home/childComs/HomeSwiper'
import HomeRecommendView from '@/views/home/childComs/HomeRecommendView'
import FeatureView from '@/views/home/childComs/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from '@/common/utils'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    NavBar,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isShowTab: false,
      scrollY: 0,
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      }
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听事件总线发射的事件
    this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  methods: {
    /* 事件监听方法 */
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShow = (-position.y) > 1000

      // 2.判断tabControl是否吸顶(position: fixed)
      // this.isTabFixed = (-position.y) > this.tabOffsetTop
      this.isShowTab = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    /* 网络请求方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].page = page
        // ...其实也是一种结构，解构出每一个元素给push
        // push方法其实也可以传可变参数
        this.goods[type].list.push(...res.data.list)

        // 完成上拉加载更多，不调用finish的话不会进行下次的加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  destroyed () {
    console.log('hahah')
  },
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)
  },
  deactivated () {
    this.scrollY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航固定住*/
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  /*.tab-control {
    !*简单实现吸顶效果*!
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {
    margin-top: 44px;
    height: calc(100% - 93px);
    overflow: hidden;
  }*/
</style>
