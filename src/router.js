import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index/index.vue'
import Nqdj from './views/ajdj/nqdj.vue';
import NqdjXqxs from './views/ajdj/nqdj.vue';
import Tsjbsx from './views/dbsx/tsjbsx.vue';
// import Ajdj from './views/dbsx/tsjb/ajdj.vue';
import Ajbl from './views/dbsx/ajbl.vue';
import Ajblgc from './views/dbsx/ajblgc.vue';
import JaxaCx from './views/dbsx/jaxa.vue';
import Lasq from './views/dbsx/lasq.vue';
import Ladj from './views/dbsx/lasq/ladj.vue';
import Xjdjsx from './views/dbsx/xjdjsx.vue';
import Bjxjdj from './views/dbsx/xjdj/xjdj.vue';
import Ajly from './views/jczlgl/ajly.vue';
import Ay from './views/jczlgl/ay.vue';
import Ccsx from './views/jczlgl/ccsx.vue';
import Ssjfp from './views/swgl/ssjfp.vue';
import Jaxasp from './views/swgl/jaxasp.vue';
import Lasqsp from './views/swgl/lasqsp.vue';
import Nwqsp from './views/swgl/nwqsp.vue';
import Ajfp from './views/swgl/ajfp.vue';
import Fagl from './views/swgl/fagl.vue';
import First from './views/swgl/sxj/first.vue';
import Second from './views/swgl/sxj/second.vue';
import Third from './views/swgl/sxj/third.vue';
import Wsgl from './views/wsgl/wsmbgl.vue';
import Wsxq from './views/wsgl/wsxq.vue';
import Fzwh from './views/yhgl/fzwh.vue';
import Yhwh from './views/yhgl/yhwh.vue';

Vue.use(Router)
// let base = `${process.env.BASE_URL}`
const router = new Router({
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/nqdj',
      name: 'Nqdj',
      component: Nqdj,
      meta: [{
        name: '案件登记'
      }, {
        name: '内勤登记',
        target: true
      }]
    },
    {
      path: '/tsjbsx/xqxs',
      name: 'NqdjXqxs',
      component: NqdjXqxs,
      meta: [{
        name: '待办事项'
      }, {
        name: '投诉举报事项',
        link: '/tsjbsx'
      }, {
        name: '详情显示',
        target: true
      }]
    },
    {
      path: '/tsjbsx',
      name: 'Tsjbsx',
      component: Tsjbsx,
      meta: [{
        name: '待办事项'
      }, {
        name: '投诉举报事项',
        target: true
      }]
    },
    {
      path: '/fagl',
      name: 'Fagl',
      component: Fagl,
      meta: [{
        name: '事务管理'
      }, {
        name: '分案',
        target: true
      }]
    },
    {
      path: '/ajbl',
      name: 'Ajbl',
      component: Ajbl,
      meta: [{
        name: '待办事项'
      }, {
        name: '案件办理',
        target: true
      }]
    },
    {
      path: '/ajblgc',
      name: 'Ajblgc',
      component: Ajblgc,
      meta: [{
        name: '待办事项'
      }, {
        name: '案件办理',
        link: '/ajbl'
      }, {
        name: '案件办理过程',
        target: true
      }]
    },
    {
      path: '/JaxaCx',
      name: 'JaxaCx',
      component: JaxaCx,
      meta: [{
        name: '综合查询'
      }, {
        name: '结案销案查询',
        target: true
      }]
    },
    {
      path: '/lasq',
      name: 'Lasq',
      component: Lasq,
      meta: [{
        name: '待办事项'
      }, {
        name: '立案申请',
        target: true
      }]
    },
    {
      path: '/lasq/ladj',
      name: 'Ladj',
      component: Ladj,
      meta: [{
        name: '待办事项'
      }, {
        name: '立案申请',
        link: '/lasq'
      }, {
        name: '立案登记',
        target: true
      }]
    },
    {
      path: '/xjdjsx',
      name: 'Xjdjsx',
      component: Xjdjsx,
      meta: [{
        name: '待办事项'
      }, {
        name: '巡检登记事项',
        target: true
      }]
    },
    {
      path: '/xjdjsx/xcdj',
      name: 'Bjxjdj',
      component: Bjxjdj,
      meta: [{
        name: '待办事项'
      }, {
        name: '案件登记',
        link: '/nqdj'
      }, {
        name: '案件登记审批',
        target: true
      }]
    },
    {
      path: '/ajly',
      name: 'Ajly',
      component: Ajly,
      meta: [{
        name: '系统管理'
      }, {
        name: '案件来源维护',
        target: true
      }]
    },
    {
      path: '/ay',
      name: 'Ay',
      component: Ay,
      meta: [{
        name: '系统管理'
      }, {
        name: '案由维护',
        target: true
      }]
    },
    {
      path: '/ccsx',
      name: 'Ccsx',
      component: Ccsx,
      meta: [{
        name: '系统管理'
      }, {
        name: '抽查事项维护',
        target: true
      }]
    },
    {
      path: '/ssjfp',
      name: 'Ssjfp',
      component: Ssjfp,
      meta: [{
        name: '事务管理'
      }, {
        name: '双随机分配',
        target: true
      }]
    },
    {
      path: '/jaxasp',
      name: 'Jaxasp',
      component: Jaxasp,
      meta: [{
        name: '事务管理'
      }, {
        name: '结案销案审批',
        target: true
      }]
    },
    {
      path: '/lasqsp',
      name: 'Lasqsp',
      component: Lasqsp,
      meta: [{
        name: '事务管理'
      }, {
        name: '立案申请审批',
        target: true
      }]
    },
    {
      path: '/nwqsp',
      name: 'Nwqsp',
      component: Nwqsp
    },
    {
      path: '/ajfp',
      name: 'Ajfp',
      component: Ajfp
    },
    {
      path: '/ssjfp/first',
      name: 'First',
      component: First,
      meta: [{
        name: '事务管理'
      }, {
        name: '双随机分配',
        target: true
      }, {
        name: '新建双随机',
        target: true
      }]
    },
    {
      path: '/ssjfp/second',
      name: 'Second',
      component: Second,
      meta: [{
        name: '事务管理'
      }, {
        name: '双随机分配',
        target: true
      }, {
        name: '新建双随机',
        target: true
      }]
    },
    {
      path: '/ssjfp/third',
      name: 'Third',
      component: Third,
      meta: [{
        name: '事务管理'
      }, {
        name: '双随机分配',
        target: true
      }, {
        name: '新建双随机',
        target: true
      }]
    },
    {
      path: '/wsgl',
      name: 'Wsgl',
      component: Wsgl,
      meta: [{
        name: '文书管理'
      }, {
        name: '文书列表',
        target: true
      }]
    },
    {
      path: '/wsxq',
      name: 'Wsxq',
      component: Wsxq,
      meta: [{
        name: '文书管理'
      }, {
        name: '文书详情',
        target: true
      }]
    },
    {
      path: '/fzwh',
      name: 'Fzwh',
      component: Fzwh,
      meta: [{
        name: '用户管理'
      }, {
        name: '分组维护',
        target: true
      }]
    },
    {
      path: '/yhwh',
      name: 'Yhwh',
      component: Yhwh,
      meta: [{
        name: '用户管理'
      }, {
        name: '用户维护',
        target: true
      }]
    }
  ]
})

export default router