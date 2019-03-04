import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from '@/common/js/axios'
import jq from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

// 审批状态
Vue.filter('zt', function (value, arr) {
  if (arr.length > 0 && value) {
    var res = arr.find(item => {
      return item.dmid == value;
    });
    return res.dmmc;
  }
})
/**
 * @desc 显示各个待办事项个数
 * */
Vue.prototype.dbNum = function () {
  $({
    url: '/dmbgl/dbsxzsCx',
    type: 'get'
  }).then(res => {
    this.$store.commit('getzs', res.returnData);
  });
}
router.beforeEach((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  if (from.name == 'NqdjXqxs' && to.name == 'Nqdj') {
    router.go(0)
  }
  next();
})
new Vue({
  router,
  store,
  jq,
  render: h => h(App)
}).$mount('#app')
var env = process.env.NODE_ENV
console.log(env)