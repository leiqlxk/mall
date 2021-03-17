<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content">
      <CartItem v-for="item in cartList" :key="item.iid" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import CartItem from '@/views/cart/childComps/CartItem'

import Scroll from '@/components/common/scroll/Scroll'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
