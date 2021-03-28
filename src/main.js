import Vue from 'vue'
import App from './App.vue'
import twitter from 'vue-twitter'
import VueHtml2Canvas from 'vue-html2canvas';

Vue.config.productionTip = false
Vue.use(twitter)
Vue.use(VueHtml2Canvas);

new Vue({
  components: { twitter },
  render: h => h(App),
}).$mount('#app')
