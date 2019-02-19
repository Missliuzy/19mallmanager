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
        <el-form-item label="案件号">
          <el-input v-model="lasqForm.lasqbid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="案由" prop="ay" required>
          <el-select v-model="lasqForm.ay" value-key="value" placeholder="请选择">
            <el-option
              :label="item.dmmc"
              :value="item.dmid"
              v-for="item in ay_dmb"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件来源" prop="ajly" required>
          <el-select v-model="lasqForm.ajly" value-key="value" placeholder="请选择">
            <el-option
              :label="item.dmmc"
              :value="item.dmid"
              v-for="item in ajly_dmb"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="base">
          <div class="person">请核实单位基本信息：</div>
          <el-form-item label="单位名称/当事人" prop="dwmc" style="width: 50%;margin-right:0;" required>
            <el-input v-model="lasqForm.dwmc"></el-input>
          </el-form-item>
          <el-form-item label="地址" style="width:100%;" prop="dwdz" required>
            <el-input v-model="lasqForm.dwdz"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="lxr" required>
            <el-input v-model="lasqForm.lxr"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" style="width: 50%;margin-right:0;" prop="lxdh" required>
            <el-input v-model="lasqForm.lxdh"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="zjlx" required>
            <el-select v-model="lasqForm.zjlx" value-key="value" placeholder="请选择">
              <el-option
                :label="item.dmmc"
                :value="item.dmid"
                v-for="item in zjlx_dmb"
                :key="item.dmid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" style="width: 50%;margin-right:0;" prop="zjhm" required>
            <el-input v-model="lasqForm.zjhm"></el-input>
          </el-form-item>
        </div>
        <div class="xcOpinion">
          <div class="person">案件基本情况及涉及违反的法律法规名称：</div>

          <el-form-item label class="box1" prop="ajjbqk">
            <el-input type="textarea" v-model="lasqForm.ajjbqk"></el-input>
          </el-form-item>
        </div>
        <div class="cbOpinion">
          <div class="person">承办人意见：</div>
          <el-form-item label prop="jzrq" class="shijian">时间
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="lasqForm.jzrq"></el-date-picker>
          </el-form-item>
          <el-form-item label class="box2" prop="cbyj">
            <el-input type="textarea" v-model="lasqForm.cbyj"></el-input>
          </el-form-item>
        </div>
        <div class="xcRemarks">
          <div class="person">备注：</div>
          <el-form-item label class="box3" prop="bz">
            <el-input type="textarea" v-model="lasqForm.bz"></el-input>
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
          <div class="person">延期理由：</div>
          <el-form-item label class="box4" prop="yqyy">
            <el-input type="textarea" v-model="yq_form.yqyy"></el-input>
          </el-form-item>
          <el-col :span="24" class="btn">
            <el-button type="primary" @click="submit">申请延期</el-button>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-form>

        <!-- 审核 -->
        <el-form
          ref="forms"
          :model="sp_forms"
          label-width="80px"
          :rules="rules"
          class="xcRemarks"
          v-if="flag == 'sp'"
        >
          <div class="person">审批意见：</div>
          <el-form-item label class="box4">
            <el-input type="textarea" v-model="sp_forms.spyj"></el-input>
          </el-form-item>
          <el-col :span="24" class="btn">
            <el-button type="primary" @click="sh_submit(41)">审批通过</el-button>
            <el-button type="primary" @click="sh_unsubmit(42)">审批退回</el-button>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-form>

        <el-form-item v-show="!disabled" class="btn">
          <el-col :span="24">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="primary" @click="resetForm">提交</el-button>
          </el-col>
        </el-form-item>
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
      lasqsp: "",
      flag: "",
      ajdjbid: "",
      lasqbid: "",
      yq_form: {
        yqyy: ""
      },
      sp_forms: {
        spyj: ""
      },
      disabled: Boolean(this.$route.query.disable),
      // 案由
      ay_dmb: "",
      //案件来源
      ajly_dmb: "",
      //证件类型
      zjlx_dmb: "",
      // 表单数据
      lasqForm: {},
      rules: {
        ay: [{ validator: validator('20, "full", "案由", false') }],
        ajly: [{ validator: validator('2, "full", "案件来源", false') }],
        dwmc: [
          { validator: validator('32, "full", "单位名称/当事人", false') }
        ],
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
        bz: [{ validator: validator('512, "bz", "备注", true') }],
        yqyy: [{ validator: validator('128, "full", "延期原因", false') }]
        // spyj: [{ validator: validator('256, "full", "审批意见", false') }]
      }
    };
  },
  methods: {
    // 下拉控制参数id
    ready(num) {
      this.$refs["lasqForm"].validate(valid => {
        if (valid) {
          $.post("/lasp/lasqxxSave", {
            flag: num, //	文本	必填	1,full,标志,false
            ajdjbid: this.lasqForm.ajdjbid, //	文本	必填	14,full,案件登记id,false
            lasqbid: this.lasqForm.lasqbid, //	文本	必填	14,full,立案申请id,false
            lar: this.lasqForm.lar, //	文本	必填	6,full,立案人,false
            lah: this.lasqForm.lah, //	文本	选填	12,full,立案号,true
            ajly: this.lasqForm.ajly, //	文本	必填	2,full,案件来源,false(ldjg_ajly)
            dwmc: this.lasqForm.dwmc, //	文本	必填	64,full,单位名称,false
            lxr: this.lasqForm.lxr, //	文本	必填	32,full,联系人,false
            lxdh: this.lasqForm.lxdh, //	文本	必填	32,full,联系电话,false
            ajjbqk: this.lasqForm.ajjbqk, //	文本	必填	4000,full,案件基本情况,false
            cbyj: this.lasqForm.cbyj, //	文本	必填	4000,full,承办意见,false
            lasj: this.lasqForm.lasj, //	文本	必填	14,full,立案时间,false
            dwdz: this.lasqForm.dwdz, //	文本	必填	256,full,单位地址,false
            bz: this.lasqForm.bz, //	文本	必填	256,full,单位地址,false
            zjlx: this.lasqForm.zjlx, //	文本	必填	2,full,证件类型,false(ldjg_d_zjlx)
            zjhm: this.lasqForm.zjhm, //	文本	必填	18,full,证件号码,false
            ay: this.lasqForm.ay, //	文本	必填	2,full,案由,false
            jzrq: this.lasqForm.jzrq //	文本	必填	14,full,调查检查截止日期,false}
          }).then(res => {
            // console.log(res);
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
      // this.lasqsp = this.$route.query.lasqsp;
      // console.log(this.lasqsp);

      $.get("/lasp/lasqxxCx", {
        params: { lasqbid: id }
      }).then(res => {
        console.log(res);
        this.lasqForm = res.returnData.vb;
        //案由
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_ay", function(res) {
          // console.log(res);
          _this.ay_dmb = res.returnData.dmblb;
        });
        //案件来源
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
          // console.log(res);
          _this.ajly_dmb = res.returnData.dmblb;
        });
        //案件来源
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_d_zjlx", function(res) {
          // console.log(res);
          _this.zjlx_dmb = res.returnData.dmblb;
        });
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
              }).then(res => {
                console.log(res);
              });
            })
            .catch(() => {
              this.$message.success("已取消");
            });
        }
      });
    },
    // 结案申请审批审核提交
    ja_submit(Path) {
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
            thyy: this.sp_forms.spyj
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
    },
    // 立案申请审批审核提交
    la_submit(num) {
      if (num == 42 && !this.sp_forms.spyj) {
        this.$alert("审核意见不能为空", {
          center: true,
          confirmButtonText: "确定"
        });
        return;
      }
      this.$confirm("是否提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          $.post("/lasp/lasqSh", {
            lasqbid: this.$route.query.lasqbid, //	文本	必填	14,full,案件登记id,false
            ajdjbid: this.lasqForm.ajdjbid,
            spyj: this.sp_forms.spyj,
            ajh: this.lasqForm.ajh,
            ajzt: num
          }).then(res => {
            console.log(res);
            
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
    },
    //审核提交
    sh_submit() {
      this.$refs["forms"].resetFields();
      // 判断立案申请审批标识
      if (this.$route.query.lasqsp) {
        this.la_submit(41);
      } else {
        this.ja_submit("/ajbl/jaxashtg");
      }
    },
    // 审核退回
    sh_unsubmit() {
      // 判断立案申请审批标识
      if (this.$route.query.lasqsp) {
        this.la_submit(42);
      } else {
        // this.$refs["forms"].validate(valid => {
        //   if (valid) {
        if (!this.sp_forms.spyj) {
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
.btn {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.cbOpinion .person {
  display: inline-block;
}

.shijian {
  margin-left: 350px;
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

/* .problem .el-input {
  width: 30px;
} */

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
