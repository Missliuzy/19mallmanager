<template>
  <div id="app">
    <MHeader></MHeader>
    <div class="content">
      <div class="con_left">
        <tree :menu="menu" v-if="flag"></tree>
      </div>
      <div class="con_right">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px;background-color:#F5F5F5;padding-left:20px;">
          <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">
            <router-link :to="item.link" v-if="item.link" :class="[{'mb_active':item.target}]">{{item.name}}</router-link>
            <span v-else :class="[{'mb_active':item.target}]">{{item.name}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from "./components/header/header";
import Tree from "./components/tree/tree";
import $ from "@/common/js/axios";
import { mapActions } from "vuex";

export default {
  name: "app",
  components: { MHeader, Tree },
  data() {
    return {
      menu: [],
      flag: false,
      usertime: {}
    };
  },
  methods: {
    ...mapActions(["getComMes"]),
    // 获取左侧列表树
    Get_tree() {
      $.get("/getmenu").then(res => {
        // console.log(res);
        if (res.returnData.executeResult == "1") {
          this.menu = res.returnData.menu;
          // console.log(this.menu[0].children);
          this.flag = true;
        }
      });
    },
    // 获取当前时间和登录人
    Get_dqsj() {
      $.get("/dmbgl/dqsj").then(res => {
        var data = res.returnData;
        if (data.executeResult == "1") {
          this.usertime.userid = data.userid;
          this.usertime.username = data.username;
          this.usertime.rq = data.rq;
          sessionStorage.setItem("usertime", JSON.stringify(this.usertime));
        }
      }); 
    }
  },
  created() {
    this.Get_tree();
    this.Get_dqsj();
    this.getComMes();
  }
};
</script> 
<style>
body {
  margin: 0;
  background-color: #f5f5f5;
}
.con_left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  overflow: auto;
  background-color: #ffffff;
}
.con_right {
  border-top-left-radius: 5px;
  position: relative;
  margin-left: 220px;
  margin-right: 20px;
  background-color: #ffffff;
}
.content {
  position: relative;
  margin-bottom: 20px;
}
.forms {
  width: 100%;
  margin: 0;
  padding: 30px 20px 30px 20px;
  background-color: #ffffff;
  min-height: 650px;
  box-sizing: border-box;
}
.person {
  color: #089fb1;
  font-size: 16px;
  font-weight: bold;
  font-family: "微软雅黑";
  line-height: 30px;
  margin-bottom: 20px;
}
.com_content {
  padding: 30px;
}
.clearfloat {
  zoom: 1;
}
.text_center {
  text-align: center;
}
.page_class {
  text-align: center;
  margin-top: 30px;
}
.noresize .el-textarea__inner {
  resize: none;
}
.el-menu-item.is-active {
  background: #ecf5ff;
}
/* 下拉框 */
.el-input--suffix .el-input__inner {
  padding-right: 15px;
}
/* 日期框 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 207px;
}
/*面包屑样式*/
.mb_active{
   color: #089fb1 !important;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
  color: #606266 !important;
  font-weight: normal !important;
  cursor: pointer !important;
} 
.el-breadcrumb__inner a:hover,.el-breadcrumb__inner.is-link:hover{
  color: #089fb1 !important;
  text-decoration: underline !important;
}
.bt1,.bt2{
  margin: 5px 5px 0;
}
</style>

