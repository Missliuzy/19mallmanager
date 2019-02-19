<template>
  <el-container>
    <el-header style="background-color:#F5F5F5;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
        <el-breadcrumb-item :to="{ path: '/' }">事务管理</el-breadcrumb-item>
        <el-breadcrumb-item>随机抽查</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <div class="forms">
      <el-form :inline="true" status-icon :rules="rules" ref="ref_form" :model="formInline" label-position="right" label-width="155px" size="small" class="demo-form-inline">
        <el-row>
          <div class="person">抽查步骤</div>
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
        <div class="second-step">
          <el-row>
            <div class="person">抽查对象：</div>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="执法对象名称" label-width="110px">
                <el-form-item prop="date">
                  <el-input v-model="formInline.zfdxmc"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属地区" label-width="110px">
                <el-select v-model="formInline.ssdq" placeholder="请选择">
                  <!-- <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in ssdq_dmb"
                    :key="item.dmid">
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构类型" label-width="110px">
                <el-select v-model="formInline.jglx" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属行业" label-width="110px">
                <el-form-item prop="date">
                  <el-select v-model="formInline.sshy" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记注册类型" label-width="110px">
                <el-input v-model="formInline.djzclx"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="从业人员总数" label-width="110px">
                <el-input v-model="formInline.cyryzsq" style="width: 100px"></el-input>~
                <el-input v-model="formInline.zyryzsz" style="width: 100px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="btn">
            <el-button type="primary" size="small" class="backC" @click="query(1,1)">查询</el-button>
            <el-button type="primary" size="small" class="backC" @click="reset(ref_form)">重置</el-button>
          </el-row>
          <el-row>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              >
              <el-table-column
                prop=""
                label=""
                width="30">
              </el-table-column>
              <el-table-column
                prop="yyzzh"
                label="营业执照号码"
                width="">
              </el-table-column>
              <el-table-column
                prop="dwmc"
                label="执法对象名称">
              </el-table-column>
              <el-table-column
                prop="ssdq"
                label="所属地区">
              </el-table-column>
              <el-table-column
                prop="jglx"
                label="机构类型">
              </el-table-column>
              <el-table-column
                prop="frdb"
                label="法定代表人">
              </el-table-column>
              <el-table-column
                prop="sshy"
                label="所属行业">
              </el-table-column>
              <el-table-column
                prop="djzclx"
                label="登记注册类型">
              </el-table-column>
              <el-table-column
                prop="cyryzs"
                label="从业人员总数">
              </el-table-column>
              <el-table-column
                prop="dwzt"
                label="执法对象状态">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="result_button">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                layout=" prev, pager, next, total"
                :total="total"
                :page-size="pageSize"
                prev-text="上一页"
                next-text="下一页"
                v-if="this.total !== 0"
              ></el-pagination>
            </div>
          </el-row>
        </div>
        <el-row class="btn">
          <el-button type="primary" size="small" class="backC" @click="preStep()">上一步</el-button>
          <el-button type="primary" size="small" class="backC" @click="nextStep()">下一步</el-button>
          <el-button type="primary" size="small" class="backB" >返回</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
import "../../../common/scss/public.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getdmb } from "@/common/js/common";
import { Group, deepClone} from "@/common/js/common";
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
        cyryzsz: '',
        sjccid: ''
      },
      formInline_page: {
        zfdxmc: '',
        ssdq: '',
        jglx: '',
        sshy: '',
        djzclx: '',
        cyryzsq: '',
        cyryzsz: '',
        sjccid: ''
      },
      rules: {
        zfdxmc: [{ validator: validator('128, full, 执法对象名称, true') }],
        ssdq: [{ validator: validator('12,number,所属地区,true') }],
        jglx: [{ validator: validator('2,full,机构类型,true') }],
        sshy: [{ validator: validator('2,full,所属行业,true') }],
        djzclx: [{ validator: validator('2,full,登记注册类型,true') }],
        cyryzsq: [{ validator: validator('5,number,从业人员总数起,true') }],
        cyryzsz: [{ validator: validator('5,number,从业人员总数止,true') }]
      },
      //分页
      pageSize: 10,
      total: 0,
      pagenum: 1, //	无
      options: [],
      tableData: [],
      ssdq_dmb: '',
      jglx_dmb: '',
      sshy_dmb: ''
    }
  },
  methods: {
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    ssdqdmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
        // console.log(res);
        _this.ssdq_dmb = res.returnData.dmblb;
      });
    },
    // 下一步
    nextStep () {
      this.$router.push({name: 'Third'})
    },
    // 上一步
    preStep() {
      this.$router.push({name: 'First', query: { id: this.$router.query.id }})
    },
    // 查询
    query(num, flag) {
      if (flag == 1) {
        this.formInline_page = deepClone(this.formInline);
      }
      var _form = this.formInline_page;
      if (this.$route.query.id) {
        _form.sjccid = this.$route.query.id;
        // this.formInline = this.$route.query.id;
      }
      _form.pageNum = num || this.pageNum;
      $.get('/ssj/sjccdwCx', {params: _form}).then(res => {
        var _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.tableData = Group(_res.vbs);
          this.total = parseInt(res.rowsCount);
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 抽查信息保存
    Baocun() {
      $.post('/ssj/sjcxxxSave', this.formInline).then( res => {
        var _res = res.returnData;
        if (_res.executeResult == '1') {
          this.$message({
            type: "success",
            center: true,
            message: res.returnMsg
          });
          this.$router.push({name: 'Third'});
        }
      })
    }
  },
  created() {
    this.ssdqdmb()
    this.query();
  }
};
</script>
<style scoped lang="scss">
.el-breadcrumb-item {
  color: #5D5D5D;
}
.person {
  color: #089FB1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
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