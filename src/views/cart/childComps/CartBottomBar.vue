<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/views/cart/childComps/CheckButton'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.$store.getters.cartList.length === 0) {
        return false
      }
      return !(this.$store.getters.cartList.find(item => !item.checked))
    }
  },
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        this.$store.getters.cartList.forEach(item => { item.checked = false })
      } else {
        this.$store.getters.cartList.forEach(item => { item.checked = true })
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate{
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
