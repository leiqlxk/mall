import Toast from '@/components/common/toast/Toast'

// 插件式分装组件
const obj = {}

// use默认会把Vue传参过来
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.通过new的方式使用组件构造器创建出来一个组件对象
  // eslint-disable-next-line new-cap
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
