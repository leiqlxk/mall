import { ADD_COUNTER, ADD_PRODUCT } from '@/store/mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // const tempList = state.cartList.filter(item => item.iid === payload.iid)
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_PRODUCT, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
