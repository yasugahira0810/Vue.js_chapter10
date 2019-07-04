import Vue from 'vue'
import 'es6-promise/auto' // プロミスをポリフィルする
import App from './App'
import ErrorBoundary from './ErrorBoundary.vue' // エラーを捕捉するコンポーネント
import router from './router'
import store from './store' // Vuexのストアインスタンスをインポート

Vue.config.productionTip = false
Vue.config.performance = true // NODE_ENV == 'development'で測定有効化

// ErrorBoundaryコンポーネントのインストール
Vue.component(ErrorBoundary.name, ErrorBoundary)

Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm:', vm)
  console.error('errorHandler info:', info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // インポートしたストアインスタンスを`store`オプションとして指定
  render: h => h(App)
})
