<template>
  <div>
    <el-header style="background-color:#F5F5F5;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
        <el-breadcrumb-item :to="{ path: '/' }">工作任务</el-breadcrumb-item>
        <el-breadcrumb-item>案件登记</el-breadcrumb-item>
        <el-breadcrumb-item>案件登记审批</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <div class="com_content">
      <el-form
        :rules="rules"
        :inline="true"
        :model="xcdjForm"
        size="small"
        ref="xcdjForm"
        label-position="right"
        label-width="150px"
        class="demo-ruleForm"
        style="height:100%"
        :disabled="disabled"
      >
        <div class="register">
          <el-form-item label="案件来源">
            <el-input v-model="xcdjForm.ajly" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="案由" prop="ay">
            <el-select v-model="xcdjForm.ay" value-key="value" placeholder="请选择" clearable>
              <el-option
                :label="item.dmmc"
                :value="item.dmid"
                v-for="item in ay_dmb"
                :key="item.dmid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="base">
          <div class="person">单位基本信息：</div>
          <el-form-item label="检查时间" required style="width:100%;">
            <el-col :span="11">
              <el-form-item prop="jckssj">
                <el-date-picker
                  type="date"
                  :editable="false"
                  placeholder="请选择开始时间"
                  value-format="yyyy-MM-dd"
                  v-model="xcdjForm.jckssj"
                  :picker-options="pickerOptionsStart"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align:center;">至</el-col>
            <el-col :span="11">
              <el-form-item prop="jcjssj">
                <el-date-picker
                  type="date"
                  :editable="false"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择结束时间"
                  v-model="xcdjForm.jcjssj"
                  style="width: 100%;"
                  :picker-options="pickerOptionsEnd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="检查地点" style="width:100%;" prop="jcdz" required>
            <el-input v-model="xcdjForm.jcdz"></el-input>
          </el-form-item>
          <el-form-item label="被检查单位/人" prop="bjcdw" style="width: 50%;margin-right:0;" required>
            <el-input v-model="xcdjForm.bjcdw"></el-input>
          </el-form-item>
          <el-form-item label="现场人" prop="xcr" required>
            <el-input v-model="xcdjForm.xcr"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人" prop="frdb" style="width: 50%;margin-right:0;" required>
            <el-input v-model="xcdjForm.frdb"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="sf" required>
            <el-input v-model="xcdjForm.sf"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="lxdh" required>
            <el-input v-model="xcdjForm.lxdh"></el-input>
          </el-form-item>
        </div>
        <div class="procuratorate">
          <div class="person">监察员：</div>
          <el-col :span="24">
            <el-form-item label="监察小组">
              <el-input v-model="xcdjForm.jcxz" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主办监察员">
              <el-input v-model="xcdjForm.zbjcy" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="监察证号：">
              <el-input v-model="xcdjForm.zbjczh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协办监察员">
              <el-input v-model="xcdjForm.xbjcy" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="监察证号：">
              <el-input v-model="xcdjForm.xbjczh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div class="jcnr">
          <div class="person">检查主要内容（确定：检查内容）：</div>
          <el-form-item label prop="type">
            <el-checkbox-group v-model="jcnr">
              <el-checkbox
                name="type"
                v-for="item in xcdjForm.ccsx_dmb"
                :label="item.dmmc"
                :key="item.dmid"
                :id="item.dmid"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-col class="three">
              <el-input v-model="xcdjForm.ccnr_1" placeholder="附加检查内容1" porp="ccnr_1"></el-input>
              <el-input v-model="xcdjForm.ccnr_2" placeholder="附加检查内容2" porp="ccnr_2"></el-input>
              <el-input v-model="xcdjForm.ccnr_3" placeholder="附加检查内容3" porp="ccnr_3"></el-input>
            </el-col>
          </el-form-item>
        </div>
        <div class="problem">
          <div class="person">涉嫌存在问题</div>
          <el-form-item label>
            <el-radio-group v-model="xcdjForm.sfywt" @change="checkboxeven(xcdjForm.sfywt)">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="xcdjForm.sfywt == 1">
            <div>
              经查：该单位有员工
              <el-input v-model="xcdjForm.wtrs" class="people" prop="wtrs"></el-input>人，
              在
              <el-input type="textarea" autosize v-model="xcdjForm.wt" prop="wt"></el-input>方面涉嫌存在问题，现场取得
              <el-input type="textarea" autosize v-model="xcdjForm.wtcl" porp="wtcl"></el-input>等材料。
            </div>
          </el-form-item>
        </div>
        <div class="xcOpinion">
          <div class="person">现场人意见：</div>
          <el-form-item label class="box1" prop="xcryj">
            <el-input type="textarea" v-model="xcdjForm.xcryj"></el-input>
          </el-form-item>
        </div>
        <div class="cbOpinion">
          <div class="person">承办人意见：</div>
          <el-form-item label class="box2" prop="cbryj">
            <el-input type="textarea" v-model="xcdjForm.cbryj"></el-input>
          </el-form-item>
        </div>
        <div class="xcRemarks">
          <div class="person">备注：</div>
          <el-form-item label class="box3" prop="bz">
            <el-input type="textarea" v-model="xcdjForm.bz"></el-input>
          </el-form-item>
        </div>
        <!-- 审核 -->
        <el-form
          ref="forms"
          :model="sh_forms"
          label-width="80px"
          :rules="rules"
          status-icon
          class="xcRemarks"
          v-if="flag == 'sh'"
        >
          <div class="person">审核意见：</div>
          <el-form-item label class="box4" prop="shyj">
            <el-input type="textarea" v-model="sh_forms.shyj"></el-input>
          </el-form-item>
          <el-col :span="24" class="btn">
            <el-button type="primary" @click="sh_save()">审核通过</el-button>
            <el-button type="primary" @click="sh_cancel()">审核退回</el-button>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-form>

        <el-form-item v-show="!disabled" class="btn" v-else>
          <el-col :span="24" style="text-align: center;">
            <el-button type="primary" @click="submitForm('xcdjForm')">保存</el-button>
            <el-button type="primary" @click="resetForm('xcdjForm')">提交</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import $ from "@/common/js/axios";
import { mapActions, mapState } from "vuex";
import { validator } from "@/common/js/valid";

export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.xcdjForm.jcjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.xcdjForm.jckssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      flag: "",
      disabled: Boolean(this.$route.query.disable),
      //审核数据
      sh_forms: {
        shyj: ""
      },
      // 案由
      ay_dmb: "",

      // 回显复选框的选中内容
      jcnr: [],
      update: [],
      new_update: "",
      new_checkbox: "",
      xcdjForm: {
        ccsx_dmb: [], //抽查内容(ldjg_ay)
        ajly: ""
      },
      rules: {
        ay: [{ validator: validator('20, "full", "案由", true') }],
        jcdz: [{ validator: validator('64, "full", "检查地点", false') }],
        bjcdw: [{ validator: validator('32, "full", "被检查单位人", false') }],
        frdb: [{ validator: validator('32, "full", "法定代表人", false') }],
        xcr: [{ validator: validator('32, "full", "现场人", false') }],
        sf: [{ validator: validator('32, "full", "身份", false') }],
        lxdh: [{ validator: validator('32, "phone", "联系电话", false') }],
        ccnr_1: [{ validator: validator('32, "full", "检查内容", true') }],
        ccnr_2: [{ validator: validator('32, "full", "检查内容", true') }],
        ccnr_2: [{ validator: validator('32, "full", "检查内容", true') }],

        wtrs: [{ validator: validator('2, "num", "问题人数", true') }],

        wt: [{ validator: validator('256, "full", "问题", true') }],
        cbryj: [{ validator: validator('128, "full", "承办人意见", false') }],
        xcryj: [{ validator: validator('256, "full", "现场人意见", false') }],
        bz: [{ validator: validator('512, "bz", "备注", true') }],
        jckssj: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        jcjssj: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        wtcl: [
          { validator: validator('128, "full", "历史投诉(举报)材料", true') }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    // 下拉控制参数id
    ready(flag) {
      this.$refs["xcdjForm"].validate(valid => {
        if (valid) {
          // 过滤复选框数据
          var aa = this.xcdjForm.ccsx_dmb.filter(item => {
            // 选中的复选框数据
            var bb = this.jcnr.map(item1 => {
              let newarr = "";
              if (item.dmmc == item1) {
                newarr = item.dmid;
              }
              this.update.push(newarr);
              return this.update;
            });
            return bb;
          });
          // console.log(this.update);
          // 数组去重
          var newArr = this.update.filter(function(ele, index, self) {
            return self.indexOf(ele) === index;
          });
          this.new_update = newArr.filter(function(s) {
            return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
          });

          this.new_checkbox = this.new_update.join(",");

          $.post("/wqdj/wqajSave", {
            flag: flag,
            ajdjbid: this.xcdjForm.ajdjbid,
            ajh: this.xcdjForm.ajh,
            xcryj: this.xcdjForm.xcryj, //	现场人意见
            cbryj: this.xcdjForm.cbryj, //	承办人意见
            jckssj: this.xcdjForm.jckssj, //	检查开始时间
            jcjssj: this.xcdjForm.jcjssj, //	检查结束时间
            jcdz: this.xcdjForm.jcdz, //检查地点
            bjcdw: this.xcdjForm.bjcdw, //被检查单位/人
            xcr: this.xcdjForm.xcr, //	现场人
            frdb: this.xcdjForm.frdb, //法人代表
            sf: this.xcdjForm.sf, //	现场人身份
            lxdh: this.xcdjForm.lxdh, //	现场人联系电话
            ay: this.xcdjForm.ay,

            ccsx: this.new_checkbox, //抽查内容

            sfywt: Number(this.xcdjForm.sfywt), //是否有问题
            wt: this.xcdjForm.wt, //	问题
            wtrs: this.xcdjForm.wtrs, //	问题涉及人数
            wtcl: this.xcdjForm.wtcl, //	问材料
            bz: this.xcdjForm.bz, //	备注
            ccnr_1: this.xcdjForm.ccnr_1,
            ccnr_2: this.xcdjForm.ccnr_2,
            ccnr_3: this.xcdjForm.ccnr_3
          }).then(res => {
            // console.log(res);
            if (res.returnData.executeResult != 1) {
              this.$message.warning(res.returnData.message);
            } else {
              this.$message.success("操作成功");
              this.$router.push({ name: "Xjdjsx" });
            }
          });
        } else {
          console.log("error submit!!");
          // this.$message.warning(res.returnData.message);
          return false;
        }
      });
    },
    // 提交
    resetForm() {
      this.$refs["xcdjForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.ready(1);
            })
            .catch(() => {
              this.$message.success("已取消");
            });
        }
      });
    },
    // 保存
    submitForm() {
      this.$refs["xcdjForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.ready(0);
            })
            .catch(() => {
              this.$message.success("已取消");
            });
        }
      });
    },
    checkboxeven(value) {
      // 判断选中是  无
      if (value == 0) {
        (this.xcdjForm.wtrs = ""),
          (this.xcdjForm.wt = ""),
          (this.xcdjForm.wtcl = "");
      } else {
        return;
      }
    },

    // 获取数据
    getData() {
      var id = this.$route.query.ajdjbid;
      this.flag = this.$route.query.flag;
      // var id = "12345678912345"
      $.get("/wqdj/wqajxgCx", {
        params: { ajdjbid: id }
      }).then(res => {
        console.log(res);
        this.xcdjForm = res.returnData.vb;
        // // 赋值复选框
        $.get("/dmbgl/dmblbCx", {
          params: {
            table_name: "ldjg_d_ccnr"
          }
        })
          .then(res => {
            // console.log('----',res);
            this.xcdjForm.ccsx_dmb = res.returnData.dmblb;
          })
          .catch(res => {});
        // 赋值表单
        $.get("/dmbgl/dmblbCx", {
          params: {
            table_name: "ldjg_ajly",
            dmid: this.xcdjForm.ajly
          }
        }).then(res => {
          // console.log(res);
          // 案件来源
          this.xcdjForm.ajly = res.returnData.dmblb[0].dmmc;
        });
        // 案由下拉
        $.get("/dmbgl/dmblbCx", {
          params: {
            table_name: "ldjg_ay"
          }
        }).then(res => {
          // console.log(res);
          this.ay_dmb = res.returnData.dmblb;
        });
        // 检查小组
        $.get("/dmbgl/jcxzcx", {
          params: {
            // jcxzid: this.xcdjForm.jcxz
          }
        }).then(res => {
          const _res = res.returnData;
          if (+_res.executeResult === 1) {
            // console.log(res);
            this.xcdjForm.jcxz = res.returnData.jcxzlb[0].jcxzmc;
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
        // 主办
        $.get("/dmbgl/ryxxcx", {
          params: {
            ryid: this.xcdjForm.zbjcy
          }
        }).then(res => {
          // console.log(res);
          this.xcdjForm.zbjcy = res.returnData.dmblb[0].xm;
        });
        //协办
        $.get("/dmbgl/ryxxcx", {
          params: {
            ryid: this.xcdjForm.xbjcy
          }
        }).then(res => {
          // console.log(res);
          this.xcdjForm.xbjcy = res.returnData.dmblb[0].xm;
        });
        // 获取选中的复选框内容
        if (this.xcdjForm.ccsx !== null) {
          var a = this.xcdjForm.ccsx.split(",");
          var aaa = [];
          a.map(item => {
            $.get("/dmbgl/dmblbCx", {
              params: {
                table_name: "ldjg_d_ccnr",
                dmid: item
              }
            }).then(res => {
              if (res.returnData.dmblb !== null) {
                const dmmc = res.returnData.dmblb[0].dmmc;
                this.jcnr.push(dmmc);
              } else {
                return;
              }
            });
          });
        }
      });
    },
    // 审核通过
    sh_save() {
      this.sh_event(31, "是否确认审核通过？");
    },
    // 审核不通过
    sh_cancel() {
      this.sh_event(32, "是否确认审核退回？");
    },
    sh_event(num, str) {
      if (num == 32 && !this.sh_forms.shyj) {
        this.$alert("审核意见不能为空", {
          center: true,
          confirmButtonText: "确定"
        });
        return;
      }
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $.post("/lasp/laqspSp", {
            ajdjbid: this.$route.query.ajdjbid, //	文本	必填	14,full,案件登记id,false
            ajh: this.$route.query.ajh, //	文本	必填	14,full,案件号,false
            ajzt: num, //	文本	必填	14,full,案件状态,false
            shyj: this.sh_forms.shyj //	文本	必填	256,full,审核意见,false
          }).then(res => {
            var _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.$message({
                type: "success",
                center: true,
                message: res.returnMsg
              });
              this.$router.go(-1);
            } else {
              this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        })
        .catch(() => {}); //一定别忘了这个
    },
    //审核
    // sh_submit(num) {
    //   this.$refs["forms"].validate(valid => {
    //     if (valid) {
    //       this.$confirm("是否提交", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "success"
    //       })
    //         .then(() => {
    //           $.post("/lasp/laqspSp", {
    //             ajdjbid: this.$route.query.data.ajdjbid, //	文本	必填	14,full,案件登记id,false
    //             ajh: this.$route.query.data.ajh, //	文本	必填	14,full,案件号,false
    //             ajzt: num, //	文本	必填	14,full,案件状态,false
    //             shyj: this.sh_forms.shyj //	文本	必填	256,full,审核意见,false
    //           }).then(res => {
    //             // console.log(res);
    //             this.$router.push({
    //               name: "Fagl"
    //             });
    //           });
    //         })
    //         .catch(() => {});
    //     }
    //   });
    // },
    back() {
      this.$router.go(-1);
    }
    // sh_unsubmit() {}
  },
  created() {
    this.login();
    this.getData();
  }
};
</script>

<style scoped>
.xcRemarks .box4 {
  border-radius: 4px;
  width: 80%;
  height: 50px;
}
.btn {
  width: 100%;
  text-align: center;
  margin: 0 auto;
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
