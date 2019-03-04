<template>
  <el-container>
    <div class="forms">
      <el-form :inline="true" :rules="rules" status-icon :model="xxmsg" label-position="right" label-width="155px" size="small" class="demo-form-inline">
        <el-row>
          <div class="steps">抽查步骤</div>
        </el-row>
        <div class="qiehuan"> 
          <ul>
            <li class="backs same">
              <p class="first">01</p>
              <p class="second">随机抽查基本填写</p>
            </li>
            <li class="two_backs same">
              <p class="first">02</p>
              <p class="second">设置随机抽查执法对象范围</p>
            </li>
            <li class="two_backs same">
              <p class="first">03</p>
              <p class="second">抽取结果确认</p>
            </li>
          </ul>
        </div>
        <div class="third-step">
          <el-row class="title">
            <div class="steps">抽取条件</div>
          </el-row>
          <el-row class="title titname">
            <el-col :span="8" class="padding_lft">
              <div>执法对象名称：{{xxmsg.zfdx}}</div>
            </el-col>
            <el-col :span="8">
              <div>所属地区:{{xxmsg.ssdqName}}</div>
            </el-col>
            <el-col :span="8">
              <div>机构类型:{{xxmsg.jglxName}}</div>
            </el-col>
          </el-row>
          <el-row class="title titname">
            <el-col :span="8" class="padding_lft">
              <div>所属行业:{{xxmsg.sshyName}}</div>
            </el-col>
            <el-col :span="8">
              <div>登记注册类型:{{xxmsg.djzclxName}}</div>
            </el-col>
            <el-col :span="8">
              <div>从业人员总数:{{xxmsg.cyryzsq}}~{{xxmsg.cyryzsz}}</div>
            </el-col>
          </el-row>
          <el-row class="title">
            <div class="steps">抽查内容</div>
          </el-row>
          <el-row class="title titname">
            <span class="padding_lft" v-for="item in xxmsg.cczynr" :value="item" :key="item">{{item}}</span>
          </el-row>
          <el-row class="title">
            <div class="person">抽取比例</div>
          </el-row>
          <el-row class="title">
            <el-col :span="6" class="padding_lft">
              <div>参与随机抽取总数量:{{xxmsg.cycqzs}}</div>
            </el-col>
            <el-col :span="7">
              <el-form-item label="抽取比例：" label-width="110px">
                <el-form-item prop="date">
                  <el-input v-model="cqbl" style="width:120px" :disabled="true"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最终抽取数量:" label-width="110px">
                <el-form-item prop="date">
                  <el-input v-model="search.cqsl" :disabled="disabled" style="width:120px" :max="10"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" :disabled="disabled" @click="Detail_list()">重新随机匹配</el-button>
            </el-col>
          </el-row>
          <div class="result_table">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#27B6C7'}">
              <el-table-column
                prop="date"
                label=""
                width="30">
              </el-table-column>
              <el-table-column
                prop="bjcdw"
                label="执法对象名称"
                width="">
              </el-table-column>
              <el-table-column
                prop="ssdqName"
                label="执法对象地址">
              </el-table-column>
              <el-table-column
                prop="frdb"
                label="法定代表人">
              </el-table-column>
              <el-table-column
                prop="jcxz"
                label="监察小组">
                <template slot-scope="scope">
                  <el-form-item style="width:100%;" prop="jcxz">
                    <el-select v-model="scope.row.jcxz">
                      <el-option
                        :label="item.jcxzmc"
                        :value="item.jcxzid"
                        v-for="item in jcxzDmb"
                        :key="item.jcxzid">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="zbjcy"
                label="主办人">
                <template slot-scope="scope">
                  <el-form-item style="width:100%;" prop="zbr">
                    <el-select v-model="scope.row.zbjcy" @change="getnum(scope.row.zbjcy,scope.row.xbjcy)">
                      <el-option
                        :label="item.xm"
                        :value="item.ryid"
                        v-for="item in zbjcyDmb"
                        :key="item.ryid">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="cxbjcy"
                label="协办人">
                <template slot-scope="scope">
                  <el-form-item style="width:100%;" prop="xbr">
                    <el-select v-model="scope.row.xbjcy" @change="getnum1(scope.row.xbjcy,scope.row.zbjcy)">
                      <el-option
                        :label="item.xm"
                        :value="item.ryid"
                        v-for="item in zbjcyDmb"
                        :key="item.ryid">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="ccsj"
                label="上次抽查时间">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-row class="btn">
          <el-button type="primary" size="small" class="backC" @click="Pred()">上一步</el-button>
          <el-button type="primary" size="small" class="backC" :disabled="disabled" @click="Qrjg()">确认匹配结果</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
import { validator } from '@/common/js/valid';
import "../../../common/scss/public.scss";
import $ from "@/common/js/axios";
import { getdmb } from "@/common/js/common";
export default {
  name: '',
  data() {
    return {
      search: {
        sjccid:'',
        cqsl:''
      },
      xxmsg: {
        zfdx: '',   
        ssdq: '',   
        jglx: '',   
        sshy: '',   
        djzclx: '',   
        cyryzsq: '',   
        cyryzsz: '',  
        cczynr: '', 
        cycqzs: '',
        sjccid: ''
      },
      rules: {
        jcxz: [{ validator: validator('20, "full", "监察小组", false') }],
        zbr: [{ validator: validator('20, "full", "主办人", false') }],
        xbr: [{ validator: validator('20, "full", "协办人", false')}]
      },
      cqbl: '',
      options: [],
      tableData: [],
      disabled: false,
      save: {
        sjccid:'',
        dwids: [],
        jcxzs: [],
        zbjcys: [],
        xbjcys: []
      },
      jcxzDmb: [],
      zbjcyDmb: [],
      xbjcyDmb: []
    }
  },
  methods: {
    // 详细信息查询
    Table_search() {
      $.get('/ssj/cctjCx', {params: {sjccid: this.$route.query.id}}).then(res => {
        if (res.returnData.executeResult == '1') {
          this.xxmsg = res.returnData.vb;
          if (this.xxmsg.cycqzs == 0) {
            this.disabled = true;
            this.search.cqsl = 0;
            this.cqbl = 0;
          } else {
            this.disabled = false;
            this.search.cqsl = 10;
            this.cqbl = Math.floor(this.search.cqsl / this.xxmsg.cycqzs * 100) + '%';
            this.Detail_list();
            this.getDmb()
          }
        }
      })
    },
    getDmb () {
      // 监察员查询
      $.get('/dmbgl/ryxxcx', {params: {ryid: ''}}).then(res => {
        if (res.returnData.executeResult == '1') {
          this.zbjcyDmb = res.returnData.dmblb
        }
      });
      // 检查小组查询
      $.get('/dmbgl/jcxzcx', {params: {jcxzid: ''}}).then(res => {
        if (res.returnData.executeResult == '1') {
          this.jcxzDmb = res.returnData.jcxzlb
        }
      })
    },
    // 实现对应的检查账号
    getnum(val,name) {
      if (val == name && name != "") {
        this.$message.warning("不能选择同一个检查员");
        return val = "";
      }
    },
    getnum1(val,name) {
      if (val == name && name != "") {
        this.$message.warning("不能选择同一个检查员");
        return val = "";
      }
    },
    // 随机匹配
    Detail_list() {
      var _this = this;
      this.search.sjccid = this.$route.query.id;
      $.get('/ssj/sjppCx', {params: this.search}).then(res => {
        var data = res.returnData;
        if (data.executeResult == '1') {
          _this.tableData = data.vbs;
        }
      });
    },
    // 第三步保存
    Qrjg() {
      for (let i =0; i < this.tableData.length; i++) {
        this.save.dwids.push(this.tableData[i].dwid);
        this.save.jcxzs.push(this.tableData[i].jcxz);
        this.save.zbjcys.push(this.tableData[i].zbjcy);
        this.save.xbjcys.push(this.tableData[i].xbjcy);
      }
      this.save.sjccid = this.$route.query.id;
      $.post('/ssj/dwfpSave', this.save).then(res => {
        if (res.returnData.executeResult == '1') {
          this.$router.push({name: 'Ssjfp'})
        }
      })
    },
    // 上一步
    Pred() {
      this.$router.push({name: 'Second', query: {id: this.$route.query.id}});
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
.steps {
  color: #089FB1;
}
.padding_lft {
  padding-left: 20px;
}
.btn {
  text-align: center;
  margin: 30px 0;
  .backC {
    background-color: #089FB1;
    margin-right: 20px;
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
  width: 910px;
  height: 60px;
  margin: 0 auto 30px;
}
.title {
  margin-top: 10px;
}
.titname{
  color: #606266;
}
.same {
  p {
    color: #fff;
    margin: 0px;
    text-align: center;
  }
  .first {
    font-size: 18px;
  }
  .second {
    margin: 14px 0 0 30px;
  }
}
.backs {
  width: 248px;
  height: 60px;
  background: url('../../../assets/images/1.png') 100% 100% no-repeat;
  list-style:none;
  float: left;
  margin-right: 30px;
}
.two_backs {
  width: 260px;
  height: 60px;
  background: url('../../../assets/images/02.png') 100% 100% no-repeat;
  list-style:none;
  float: left;
  margin-right: 30px;
}
</style>