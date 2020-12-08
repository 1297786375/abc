// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 静态文件 css公共样式
import './assets/css/reset.css'
// 配置element-ui
// import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
Vue.use(ElementUI);
// axios的封装
import {xiosget,xiospost} from './axios/index';
// vuex 引入
import {store} from './store/index'
Vue.prototype.xiosget = xiosget;
Vue.prototype.xiospost = xiospost;
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
