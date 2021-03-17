import { ADD_COUNTER, ADD_PRODUCT } from '@/store/mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件单一一点，方便之后跟踪状态变化
  /*    addCart(state, payload) {
    // payload新添加的商品
    // const tempList = state.cartList.filter(item => item.iid === payload.iid)
    const oldProduct = state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      state.cartList.push(payload)
    }
  } */
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_PRODUCT](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
