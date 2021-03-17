<template>
  <div class="cart">
<!--    导航-->
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list/>

<!--    汇总信息-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import CartList from '@/views/cart/childComps/CartList'
import CartBottomBar from '@/views/cart/childComps/CartBottomBar'

import NavBar from '@/components/common/navbar/NavBar'

// vue提供的另一种getters、mutations、actions等的使用方法
// mapGetters是一个辅助函数，其可以将getters中的方法映射成计算属性
// 映射的时候有两种方式，1.数组形式，2.对象形式
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartList,
    NavBar,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
