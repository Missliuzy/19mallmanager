<template>
  <div>
    <div class="forms">
      <el-form
        :rules="rules"
        :inline="true"
        :model="lasqForm"
        size="small"
        ref="lasqForm"
        label-position="right"
        label-width="150px"
        class="demo-ruleForm"
        style="height:100%"
        :disabled="disabled"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件号：">
              <el-input v-model="lasqForm.ajh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案由：" prop="ay" required>
              <el-select v-model="lasqForm.ay" value-key="value" :title="ayTitle" placeholder="请选择">
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ay_dmb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件来源：" prop="ajly" required>
              <el-select v-model="lasqForm.ajly" value-key="value" placeholder="请选择">
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ajly_dmb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="base">
          <div class="person">当事人基本信息</div>

          <el-row>
            <el-form-item label="当事人：" prop="dwmc" required>
              <el-input v-model="lasqForm.dwmc"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="地址：" prop="dwdz" required>
              <el-input v-model="lasqForm.dwdz" class="input_width"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人：" prop="lxr" required>
                <el-input v-model="lasqForm.lxr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="lxdh" required>
                <el-input v-model="lasqForm.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件类型：" prop="zjlx" required>
                <el-select v-model="lasqForm.zjlx" value-key="value" placeholder="请选择">
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in zjlx_dmb"
                    :key="item.dmid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号码：" prop="zjhm" required>
                <el-input v-model="lasqForm.zjhm"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="xcOpinion">
          <!-- <div class="person">案件基本情况及涉及违反的法律法规名称：</div> -->
          <el-form-item label="案件基本情况及涉及违反的法律法规名称" class="only box1" prop="ajjbqk" required>
            <el-input type="textarea" v-model="lasqForm.ajjbqk" class="noresize"></el-input>
          </el-form-item>
        </div>
        <div class="cbOpinion">
          <!-- <div class="person">承办人意见登记时间：</div> -->
          <el-form-item label="截止日期：" prop="jzrq" class="shijian">
            <el-date-picker type="date" v-model="lasqForm.jzrq" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="承办人意见" class="only1 box2" prop="cbyj" required>
            <el-input type="textarea" v-model="lasqForm.cbyj" class="noresize"></el-input>
          </el-form-item>
        </div>
        <div class="xcRemarks">
          <div class="person">备注</div>
          <el-form-item label class="box3" prop="bz">
            <el-input type="textarea" class="noresize" v-model="lasqForm.bz"></el-input>
          </el-form-item>
        </div>
        <!-- 延期 -->
        <el-form
          ref="form"
          :model="yq_form"
          label-width="80px"
          :rules="rules"
          status-icon
          class="xcRemarks"
          v-if="flag == 'yq'"
        >
          <div class="person">延期理由</div>
          <el-form-item label class="box4" prop="yqyy">
            <el-input type="textarea" class="noresize" v-model="yq_form.yqyy"></el-input>
          </el-form-item>
          <el-col :span="24" class="btn">
            <el-button type="primary" @click="submit">申请延期</el-button>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-form>

        <!-- 审皮 -->
        <el-form
          ref="forms"
          :model="sp_forms"
          label-width="80px"
          :rules="rules"
          class="xcRemarks"
          v-if="flag == 'sp'"
        >
          <!-- <div class="person">审批意见</div> -->
          <el-row>
            <el-form-item label="审批意见" class="box4 xjdj_jcnr" prop="spyj">
              <el-input
                type="textarea"
                class="noresize"
                v-model="sp_forms.spyj"
                :disabled="lasqsp_btn"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="!lasqsp_btn">
            <el-col :span="24" class="btn">
              <el-button type="primary" @click="sh_submit(41)">审批通过</el-button>
              <el-button type="primary" @click="sh_unsubmit(42)">审批退回</el-button>
              <el-button type="primary" @click="back">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 审核 -->
        <el-form
          ref="forms"
          :model="sp_forms"
          label-width="80px"
          :rules="rules"
          class="xcRemarks"
          v-if="flag == 'sh'"
        >
          <!-- <div class="person">审批意见</div> -->
          <el-row>
            <el-form-item label="审核意见" class="box4 xjdj_jcnr" prop="shyj">
              <el-input
                type="textarea"
                class="noresize"
                v-model="sp_forms.shyj"
                :disabled="lasqsp_btn"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="!lasqsp_btn">
            <el-col :span="24" class="btn">
              <el-button type="primary" @click="sh_submit(41)">审批通过</el-button>
              <el-button type="primary" @click="sh_unsubmit(42)">审批退回</el-button>
              <el-button type="primary" @click="back">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- <el-col :span="24" class="btn" v-if="flag == 'sp'">
          <el-button type="primary" @click="sh_submit(41)">审批通过</el-button>
          <el-button type="primary" @click="sh_unsubmit(42)">审批退回</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-col>-->
        <el-row v-show="!disabled" class="btn1">
          <!-- <el-form-item class="btn" v-else> -->
          <el-col :span="24">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="primary" @click="resetForm">提交</el-button>
            <el-button type="primary" @click="downLond" v-if="lasqForm.sfkxz === '1'">下载</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import $ from "@/common/js/axios";
import { deepClone, getdmb } from "@/common/js/common";
import { validator } from "@/common/js/valid";

export default {
  data() {
    return {
      
      lasqsp_btn: "",
      lasqsp: "",
      flag: "",
      ajdjbid: "",
      lasqbid: "",
      yq_form: {
        yqyy: ""
      },
      sp_forms: {
        shyj: ""
      },
      // disabled: this.$route.query.disable == 'false' ? false : true,
      disabled: "",
      //disabled: this.$route.query.disable == 'false' ? false : true,
      // 案由
      ay_dmb: "",
      ayTitle: "",
      //案件来源
      ajly_dmb: "",
      //证件类型
      zjlx_dmb: "",
      // 表单数据
      lasqForm: {},
      rules: {
        ay: [{ validator: validator('20, "full", "案由", false') }],
        ajly: [{ validator: validator('2, "full", "案件来源", false') }],
        dwmc: [{ validator: validator('32, "full", "当事人", false') }],
        dwdz: [{ validator: validator('64, "full", "地址", false') }],
        lxr: [{ validator: validator('32, "full", "联系人", false') }],
        lxdh: [{ validator: validator('32, "phone", "联系电话", false') }],
        zjlx: [{ validator: validator('2, "full", "证件类型", false') }],
        zjhm: [{ validator: validator('18, "full", "证件号码", false') }],
        ajjbqk: [
          {
            validator: validator(
              '4000, "full", "案件基本情况及涉及违反的法律法规名称", false'
            )
          }
        ],
        cbyj: [{ validator: validator('4000, "full", "承办意见", false') }],
        jzrq: [
          {
            type: "string",
            required: true,
            message: "截止日期不能为空",
            trigger: "blur"
          }
        ],
        bz: [{ validator: validator('512, "bz", "备注", true') }],
        yqyy: [{ validator: validator('128, "full", "延期原因", false') }],
        shyj: [
          { validator: validator('256, "full", "审核意见", false') },
          { required: true }
        ],
        spyj: [
          { validator: validator('256, "full", "审批意见", false') },
          { required: true }
        ]
      }
    };
  },
  methods: {
    // 下拉控制参数id
    ready(num) {
      this.$refs["lasqForm"].validate(valid => {
        if (valid) {
          const _obj = this.lasqForm
          _obj.flag = num
          $.post("/lasp/lasqxxSave", _obj).then(res => {
            // console.log(res);
            this.dbNum();
            this.$message.success("操作成功");
            this.$router.push({ name: "Lasq" });
          });
        } else {
          console.log("error submit!!");
          this.$message.warning(res.returnData.message);
          return false;
        }
      });
    },
    // 提交
    resetForm() {
      this.$refs["lasqForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.ready(1);
            })
            .catch(() => {});
        }
      });
    },
    // 保存
    submitForm(num) {
      this.$refs["lasqForm"].validate(valid => {
        this.lasqForm.flag = num;
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.ready(0);
            })
            .catch(() => {});
        }
      });
    },
    getData() {
      var id = this.$route.query.lasqbid;
      this.flag = this.$route.query.flag;
      $.get("/lasp/lasqxxCx", {
        params: { lasqbid: id }
      }).then(res => {
        // console.log(res);
        this.lasqForm = res.returnData.vb;
        if (res.returnData.vb.shyj) {
          this.sp_forms.shyj = res.returnData.vb.shyj;
        } else if (res.returnData.vb.spyj) {
          this.sp_forms.spyj = res.returnData.vb.spyj;
        }
        //清空校验
        if ((this.disabled = true)) {
          this.$nextTick(() => {
            this.$refs.lasqForm.clearValidate();
          });
        }
        // 页面数据项的状态
        if (
            this.$route.query.disable == "false" ||
            this.$route.query.disable == false
          ) {
            var is_disabled = false;
          } else if (
            this.$route.query.disable == "true" ||
            this.$route.query.disable == true
          ) {
            var is_disabled = true;
          }
          this.disabled = is_disabled;
        // 判断审批的状态
        if (
            this.$route.query.lasqsp == "false" ||
            this.$route.query.lasqsp == false
          ) {
            var is_lasqsp = false;
          } else if (
            this.$route.query.lasqsp == "true" ||
            this.$route.query.lasqsp == true
          ) {
            var is_lasqsp = true;
          }
          this.lasqsp_btn = is_lasqsp;
        //案由
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_ay", function(res) {
          // console.log(res);
          const _res = res.returnData;
          if (+_res.executeResult === 1) {
            // 循环dmb查询结果当sfky字段=0时下拉不可选
            for (let i in _res.dmblb) {
              if (_res.dmblb[i].sfky == 0) {
                _res.dmblb[i].disabled = true;
              }
            }
            _this.ay_dmb = _res.dmblb;
            if (_this.lasqForm.ay) {
              _this.ayTitle = _this.ay_dmb.find(item => {
                return item.dmid == _this.lasqForm.ay;
              }).dmmc;
            }
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
        //案件来源
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
          // console.log(res);
          const _res = res.returnData;
          if (+_res.executeResult === 1) {
            // 循环dmb查询结果当sfky字段=0时下拉不可选
            for (let i in _res.dmblb) {
              if (_res.dmblb[i].sfky == 0) {
                _res.dmblb[i].disabled = true;
              }
            }
            _this.ajly_dmb = res.returnData.dmblb;
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
        //案件来源
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_d_zjlx", function(res) {
          // console.log(res);
          _this.zjlx_dmb = res.returnData.dmblb;
        });

        this.lasqsp = this.$route.query.lasqsp;
      });
    },
    //延期提交
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $.post("/ajbl/yq", {
                lasqbid: this.lasqbid, //类型：String  必有字段  备注：14,full,立案申请id,false
                ajblid: this.ajdjbid, //类型：String  必有字段  备注：14,full,案件办理id,false
                yqyy: this.yq_form.yqyy //类型：String  必有字段  备注：128,full,延期原因,false
              }).then(res => {});
            })
            .catch(() => {});
        }
      });
    },
    // 结案申请审批审核提交
    ja_submit(Path) {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $.post(Path, {
                lasqbid: this.$route.query.lasqbid, //	文本	必填	14,full,案件登记id,false
                // wsid:this.$route.query.wsid,
                wsid: this.$route.query.wsid,
                thyy: this.sp_forms.shyj
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.back();
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
    // 立案申请审批审核提交
    la_submit(num) {
      // if (num == 42 && !this.sp_forms.shyj) {
      //   this.$alert("审核意见不能为空", {
      //     center: true,
      //     confirmButtonText: "确定"
      //   });
      //   return;
      // }
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $.post("/lasp/lasqSh", {
                lasqbid: this.$route.query.lasqbid, //	文本	必填	14,full,案件登记id,false
                ajdjbid: this.lasqForm.ajdjbid,
                shyj: this.sp_forms.shyj,
                ajh: this.lasqForm.ajh,
                ajzt: num
              }).then(res => {
                // console.log(res);
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.back();
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
    //审核提交
    sh_submit() {
      // this.$refs["forms"].resetFields();
      // 判断立案申请审批标识
      if (!this.$route.query.lasqsp) {
        this.la_submit(41);
      } else {
        this.ja_submit("/ajbl/jaxashtg");
      }
    },
    // 审核退回
    sh_unsubmit() {
      // 判断立案申请审批标识
      if (!this.$route.query.lasqsp) {
        this.la_submit(42);
      } else {
        // this.$refs["forms"].validate(valid => {
        //   if (valid) {
        if (!this.sp_forms.shyj) {
          this.$alert("审核意见不能为空", {
            center: true,
            confirmButtonText: "确定"
          });
          return;
        }
        this.ja_submit("/ajbl/jaxashth");
        //   }
        // });
      }
    },
    //返回
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.input_width {
  width: 400px;
}
.btn,
.btn1 {
  width: 100%;
  text-align: center;
  margin: 60px auto;
}
.btn1 {
  margin: 30px auto;
}
.cbOpinion .person {
  display: inline-block;
}

.shijian {
  margin-left: 32%;
  position: absolute;
}

.shijian .el-input {
  margin-left: 15px;
}
.three {
  margin: 15px 80px 0 80px;
}

.three .el-input {
  margin-bottom: 15px;
}
.register::after,
.base::after,
.procuratorate::after,
.xcOpinion::after,
.xcRemarks::after,
.btn::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}

.jczh {
  height: 62px;
  line-height: 40px;
}

.jcnr {
  width: 800px;
}

.jcnr .el-checkbox-group {
  margin-left: 80px;
  padding: 0;
  list-style: none;
}

.jcnr .el-checkbox {
  width: 350px;
  margin: 0;
}

.jcnr .el-checkbox + .el-checkbox {
  margin-left: 0;
}

.problem .el-form-item {
  margin-left: 80px;
  width: 100%;
}

.problem .people .el-input__inner {
  width: 30px;
  padding: 0;
  position: relative;
}

.problem .el-textarea__inner {
  border: 1px solid #dcdfe6;
}

.xcOpinion .box1,
.cbOpinion .box2,
.xcRemarks .box3 {
  border-radius: 4px;
  margin-left: 80px;
  width: 80%;
  height: 100%;
}

.xcRemarks .box4 {
  border-radius: 4px;
  width: 80%;
  height: 50px;
  margin-bottom: 50px;
}

.base .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.base .el-date-editor.el-input {
  width: 200px;
}

.person {
  color: #089fb1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}

.com_content {
  padding: 20px;
}

.el-range-input {
  width: 150px;
}
</style>
