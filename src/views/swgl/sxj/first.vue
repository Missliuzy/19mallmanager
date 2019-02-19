<template>
  <el-container>
    <el-header style="background-color:#F5F5F5;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
        <el-breadcrumb-item :to="{ path: '/' }">事务管理</el-breadcrumb-item>
        <el-breadcrumb-item>随机抽查</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <div class="forms">
      <el-form :inline="true" status-icon :rules="rules" :model="formInline" ref="ref_form" label-position="right" label-width="155px" size="small" class="demo-form-inline">
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
        <div class="first-step">
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间" prop="cjsj">
                <el-input v-model="formInline.cjsj" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记人（创建人）">
                <el-input v-model="formInline.cjr" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="案件来源" prop="cclx">
              <el-select v-model="formInline.cclx" placeholder="请选择案件来源" value-key="value">
                <el-option label="常规检查" value="0"></el-option>
                <el-option label="专项检查" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="抽查事项">
                <p v-for="(item,index) in options" :key="index" class="ccsx">
                  <input type="checkbox" v-model="formInline.ccsx" :value="item.dmid">
                  {{item.dmmc}}
                </p>
              </el-form-item>
              <!-- <el-form-item label="抽查事项" prop="type">
                <el-checkbox-group v-model="formInline.ccsx">
                  <el-checkbox
                    name="type"
                    v-for="item in options"
                    :label="item.dmmc"
                    :key="item.dmid"
                    :id="item.dmid"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item> -->
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="抽查依据" prop="ccyj">
              <el-input type="textarea" v-model="formInline.ccyj" style="width:740px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="抽查方向" prop="ccfx">
              <el-input type="textarea" v-model="formInline.ccfx" style="width:740px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注" prop="bz">
              <el-input type="textarea" v-model="formInline.bz" style="width:740px"></el-input>
            </el-form-item>
          </el-row>
        </div>
        <el-row class="btn">
          <el-button type="primary" size="small" class="backC" @click="nextStep()">下一步</el-button>
          <el-button type="primary" size="small" class="backB" @click="back()" >返回</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import { getdmb } from "@/common/js/common";
export default {
  name: '',
  data() {
    return {
      formInline: {
        sjccid: '',
        cjsj: '',
        cclx: '',
        ccsx: [],
        ccyj: '',
        ccfx: '',
        bz: '',
        cjr: ''
      },
      rules: {
        cclx: [{ required: true,validator: validator('1, "full", "抽查类型", false') }],
        ccsx: [{ required: true, validator: validator('32, "full", "抽查事项", false') }],
        ccyj: [{ validator: validator('128, "full", "抽查依据", true') }],
        ccfx: [{ required: true, validator: validator('128, "full", "抽查方向", false') }],
        bz: [{ validator: validator('1024, "full", "备注", true') }],
      },
      options: [],
      
    }
  },
  beforeMount() {
    var usertime = JSON.parse(sessionStorage.getItem('usertime'));
    this.formInline.cjsj = usertime.rq;
    this.formInline.cjr = usertime.username;
  },
  methods: {
    // 下一步
    nextStep() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.formInline.ccsx.join(',');
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $.post("/ssj/sjccjbxxSave", {
                cjsj: this.formInline.cjsj,
                cjr: this.formInline.cjr,
                ccsx: this.formInline.ccsx.join(','),
                ccyj: this.formInline.ccyj,
                ccfx: this.formInline.ccfx,
                bz: this.formInline.bz,
                cclx: this.formInline.cclx,
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.$router.push({name: 'Second'});
                } else {
                  this.$alert(_res.message, {
                    center: true,
                    confirmButtonText: "确定"
                  });
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    // 基本信息查询
    Getmess() {
      $.get('/ssj/sjccjbxxCx', {params: { sjccid: this.formInline.sjccid }}).then((res) => {
        if (res.returnData.executeResult == '1') {
          this.formInline = res.returnData.vb;
        }
      })
    },
    back() {
      this.$router.go(-1);
    },
    // 获取代码表
    ccnrdmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ccnr", function(res) {
        _this.options = res.returnData.dmblb;
      });
    },
  },
  created() {
    this.Getmess()
    this.ccnrdmb()
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
.ccsx {
  float: left;
  width: 30%;
  margin-left: 15%;
  line-height: 20px;
  color: #606266;
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