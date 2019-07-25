import * as log from 'loglevel';
import Vue from 'vue';
import { plugin as functionAPI, createComponent } from 'vue-function-api';
import { useStore } from './composites/base/store';
import App from './App.vue';

log.setDefaultLevel('INFO');
Vue.config.productionTip = false;
Vue.use(functionAPI);

new Vue(createComponent({
  setup() {
    useStore();
  },
  render: h => h(App),
})).$mount('#app');
