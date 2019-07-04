import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 状態`Auth`と状態`Board`をVuexのstateで一元管理できるよう定義する
const state = {
  auth: { // 状態`Auth`
    token: localStorage.getItem('token'), // `token`は locale storage から取得する
    userId: null // `userId`はnullで初期化
  },
  board: { // 状態`Board`
    lists: [] // 状態`TaskList`は空で初期化
  },
  dragging: { // ドラッグ&ドロップされるタスクを処理するための状態を格納する
    target: null, // ドラッグ&ドロップ対象のタスクID
    from: null, // ドラッグ元のタスクリストID
    to: null // ドロップ先のタスクリストID
  }
}

export default new Vuex.Store({
  state, // 定義したstateを`state`オプションに指定
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
