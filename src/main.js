import Vue from 'vue'
import App from './App.vue'
import Vres from 'vue-resource'

Vue.use(Vres);

new Vue({
  el: '#app',
  render: h => h(App)
})
