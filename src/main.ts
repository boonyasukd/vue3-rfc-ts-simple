import Vue from 'vue';
import { plugin } from 'vue-function-api';
import * as log from 'loglevel';

import App from './App.vue';

log.setDefaultLevel('INFO');
Vue.config.productionTip = false;
Vue.use(plugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
