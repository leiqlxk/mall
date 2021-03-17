import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// 解决移动端300ms延迟
import FastClick from 'fastclick'

import toast from '@/components/common/toast'

Vue.config.productionTip = false

// 添加事件总线，赋值为vue实例，这样就可以使用vue实例的$emit发射以及$on监听事件
Vue.prototype.$bus = new Vue()

// 安装toast插件,use就会执行对象的install函数
Vue.use(toast)

FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
