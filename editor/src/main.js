import Vue from "vue";
import App from "./App.vue";
import router from './router/index.js'

import vuetify from '@/plugins/vuetify'
import VModal from "vue-js-modal";
import VueHtml2Canvas from 'vue-html2canvas';

Vue.use(VueHtml2Canvas);
Vue.use(VModal)

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
