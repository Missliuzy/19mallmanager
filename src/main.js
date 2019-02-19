import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from '@/common/js/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

// 审批状态
Vue.filter('zt',function (value, arr) {
    if (arr.length > 0 && value) {
      var res = arr.find(item => {
        return item.dmid == value;
      });
      return res.dmmc;
    }
  })
// 案件来源
// Vue.filter('ly', function (data, arr) {
//   if (arr.length > 0 && data) {
//     var start_data = arr.find((item) => {
//       return item.dmid == data
//     })
//     if(start_data){
//       return start_data.dmmc
//     }else{
//       return data
//     }
//   }
// });
//主办人
// Vue.filter('zbr', function (data, arr) {
//   if (arr.length > 0 && data){
//     var bbb = arr.find((item) => {
//       return item.ryid == data;
//     });
//     return bbb.xm;
//   }
// });
//巡检内容  
// Vue.filter("xjnr", (data, arr) => {
//   var start_data = data.split(',')
//   if (arr instanceof Array) {
//     var arrlist = arr.map(item => { 
//       var ddd = start_data.map(item1 => {
//         return item.dmid == item1 ? item.dmmc : ''
//       })
//       for (var i = 0; i < ddd.length; i++) {
//         if (ddd[i] == '' || ddd[i] == null || typeof (ddd[i]) == undefined) {
//           ddd.splice(i, 1);
//           i = i - 1;
//         }
//       }
//       return ddd.join('')
//     })
//     for (var i = 0; i < arrlist.length; i++) {
//       if (arrlist[i] == '' || arrlist[i] == null || typeof (arrlist[i]) == undefined) {
//         arrlist.splice(i, 1);
//         i = i - 1;
//       }
//     }
//     var a = arrlist.join(',  ')
//     return a
//   }
//   return a
// })

Vue.prototype.dbNum = function(){
  $({
    url:'/dmbgl/dbsxzsCx',
    type:'get'
  }).then(res=>{
    this.$store.commit('getzs',res.returnData);
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
var env = process.env.NODE_ENV
console.log(env)