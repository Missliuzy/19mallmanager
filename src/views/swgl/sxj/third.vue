<template>
  <el-container>
    <el-header style="background-color:#F5F5F5;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
        <el-breadcrumb-item :to="{ path: '/' }">事务管理</el-breadcrumb-item>
        <el-breadcrumb-item>随机抽查</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <div class="forms">
      <el-form :inline="true" status-icon :rules="rules" :model="formInline" label-position="right" label-width="155px" size="small" class="demo-form-inline">
        <el-row>
          <div>抽查步骤</div>
        </el-row>
        <div class="qiehuan"> 
          <ul>
            <li class="backs">
              <p class="first">第一步</p>
              <p class="second">随机抽查基本填写</p>
            </li>
            <li class="backs">
              <p class="first">第二步</p>
              <p class="second">设置随机抽查执法对象范围</p>
            </li>
            <li class="backs">
              <p class="first">第三步</p>
              <p class="second">抽取结果确认</p>
            </li>
          </ul>
        </div>
        <div class="third-step">
          <el-row class="title">
            <div class="person">抽取条件</div>
          </el-row>
          <el-row class="title">
            <el-col :span="8" class="padding_lft">
              <div>执法对象名称：{{formInline.zfdxmc}}</div>
            </el-col>
            <el-col :span="8">
              <div>所属地区:{{formInline.ssdq}}</div>
            </el-col>
            <el-col :span="8">
              <div>机构类型:{{formInline.jglx}}</div>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="8" class="padding_lft">
              <div>所属行业:{{formInline.sshy}}</div>
            </el-col>
            <el-col :span="8">
              <div>登记注册类型:{{formInline.djzclx}}</div>
            </el-col>
            <el-col :span="8">
              <div>从业人员总数:{{formInline.cyryzsq}}</div>
            </el-col>
          </el-row>
          <el-row class="title">
            <div class="person">抽查主要内容</div>
          </el-row>
          <el-row class="title">
            <div class="padding_lft">规章制度情况:{{formInline.djr}}</div>
          </el-row>
          <el-row class="title">
            <div class="person">抽取比例</div>
          </el-row>
          <el-row class="title">
            <el-col :span="6" class="padding_lft">
              <div>参与随机抽取总数量:{{formInline.cqsl}}</div>
            </el-col>
            <el-col :span="7">
              <el-form-item label="抽取比例：" label-width="110px">
                <el-form-item prop="date">
                  <el-input v-model="formInline.djr" style="width:120px" :disabled="true"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最终抽取数量:" label-width="110px">
                <el-form-item prop="date">
                  <el-input v-model="formInline.cqsl" style="width:120px" max="10"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" @click="Table_search()">重新随机匹配</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label=""
              width="30">
            </el-table-column>
            <el-table-column
              prop="dwmc"
              label="被检查单位"
              width="">
            </el-table-column>
            <el-table-column
              prop="ssdq"
              label="检查地址">
            </el-table-column>
            <el-table-column
              prop="frdb"
              label="法定代表人">
            </el-table-column>
            <el-table-column
              prop="jcxz"
              label="监察小组">
            </el-table-column>
            <el-table-column
              prop="zbjcy"
              label="主办人">
            </el-table-column>
            <el-table-column
              prop="cxbjcy"
              label="协办人">
            </el-table-column>
            <el-table-column
              prop="cxbjcy"
              label="">
            </el-table-column>
            <el-table-column
              prop="cxbjcy"
              label="">
            </el-table-column>
            <el-table-column
              prop="ccsj"
              label="上次抽查时间">
            </el-table-column>
          </el-table>
        </div>
        <el-row class="btn">
          <el-button type="primary" size="small" class="backC">上一步</el-button>
          <el-button type="primary" size="small" class="backC" >确认匹配结果</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
// import { validator } from '@/common/js/valid';
import "../../../common/scss/public.scss";
import $ from "@/common/js/axios";
export default {
  name: '',
  data() {
    return {
      formInline: {
        zfdxmc: '',
        ssdq: '',	
        jglx: '',	
        sshy: '',	
        djzclx: '',
        cyryzsq: '',
        zyryzsz: '',
        cqsl: '',
        sjccid: ''
      },
      options: [],
      tableData: [],
      sjccid: '',
    }
  },
  methods: {
    // 查询
    Table_search() {
      $.get('/ssj/sjppCx', {params: this.formInline}).then( res => {
        var _res = res.returnData;
        if (_res.executeResult == '1') {
          this.tableData = _res.vbs;
        }
      })
    },
    // 随机匹配
    Detail_list() {
      var _this = this;
      $.get('/ssj/sjppCx', {params: this.formInline}).then(res => {
        var data = res.returnData;
        if (data.executeResult == '1') {
          _this.formInline = data.vbs;
        }
      });
    }
  },
  created() {
    this.Table_search()
  }
};
</script>
<style scoped lang="scss">
.el-breadcrumb-item {
  color: #5D5D5D;
}
.person {
  background-color: #089FB1;
  color: #fff;
  font-size: 16px;
  line-height: 30px;
  padding-left: 20px;
  margin-bottom: 10px;
}
.padding_lft {
  padding-left: 20px;
}
.btn {
  text-align: center;
  margin-bottom: 30px;
  .backC {
    background-color: #089FB1;
  }
  .backC:hover {
    background-color: #089FB1;
    opacity: 0.7;
  }
  .backB {
    border: 1px solid #089FB1;
    color: #fff;
  }
  .backB:hover {
    background-color: #089FB1;
    opacity: 0.7;
  }
}
.qiehuan {
  height: 60px;
  margin-bottom: 30px;
}
.title {
  margin-bottom: 8px;
}
.backs {
  width: 248px;
  height: 60px;
  background: url('../../../assets/images/1.png') 100% 100% no-repeat;
  list-style:none;
  float: left;
  margin-right: 30px;
  p {
    color: #fff;
    margin: 0 0 0 10px;
  }
  .first {
    font-size: 18px;
  }
  .second {
    margin-top: 14px;
  }
}
</style>