import Vue from 'vue'
import App from './App.vue'
import './firebase'
import vuefire from 'vuefire'

Vue.use(vuefire)

new Vue({
  el: '#app',
  render: h => h(App)
})
