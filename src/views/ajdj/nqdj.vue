<template>
  <el-container>
    <div class="forms">
      <el-form
        :inline="true"
        :rules="rules"
        :model="formInline"
        label-position="right"
        label-width="155px"
        size="small"
        class="demo-form-inline"
        ref="ref_form"
        :disabled="disabled"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="案件来源" prop="ajly" required>
              <el-select v-model="formInline.ajly" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in formdmb.ajly_dmb"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="案由" prop="ay" required>
              <el-select v-model="formInline.ay" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in formdmb.ay_dmb"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="person">被投诉（举报）人：</div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称/姓名" prop="dwmc" required>
              <el-input v-model="formInline.dwmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人（负责人）" prop="fddbr">
              <el-input v-model="formInline.fddbr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册或登记地址" prop="szdwid">
              <el-input v-model="formInline.szdwid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="劳资负责人" prop="lzfzr">
              <el-input v-model="formInline.lzfzr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经营或办公地址" required prop="jyhbgdz">
              <el-input v-model="formInline.jyhbgdz"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="formInline.lxdh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="person">投诉（举报）人：</div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" label-width="80px" prop="xm">
              <el-input v-model="formInline.xm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" label-width="80px" prop="xb">
              <el-input v-model="formInline.xb"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投诉时间" label-width="80px" prop="tsjbsj">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formInline.tsjbsj"
                :picker-options="pickerOptions0"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话" label-width="80px" prop="tsrlxdh" required>
              <el-input v-model="formInline.tsrlxdh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号" label-width="80px" prop="sfzh">
              <el-input v-model="formInline.sfzh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-radio-group v-model="formInline.sfnh">
                <el-radio label="0">城镇</el-radio>
                <el-radio label="1">非城镇</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="送达信息地址（通讯地址）" label-width="200px" prop="txdz">
            <el-input v-model="formInline.txdz" class="txdz_input"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="person">投诉（举报）事项及要求：</div>
        </el-row>
        <el-row>
          <el-form-item prop="tj_nr">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              placeholder="请输入内容"
              v-model="formInline.tj_nr"
              style="width:500px"
              class="noresize"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="历史投诉(举报)时间" prop="lstjsj">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.lstjsj"
              :picker-options="pickerOptions0"
              style="width: 343px;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="历史投诉(举报)单位" prop="lstjdw">
              <el-input v-model="formInline.lstjdw" class="yq_input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="历史投诉(举报)结果" prop="lstjcljg">
              <el-input v-model="formInline.lstjcljg" class="yq_input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="历史投诉(举报)材料" prop="lstjcl">
              <el-input v-model="formInline.lstjcl" class="yq_input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="person">备注：</div>
        </el-row>
        <el-row>
          <el-form-item prop="bz">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              placeholder="请输入内容"
              style="width:500px;"
              v-model="formInline.bz"
              class="noresize"
            ></el-input>
          </el-form-item>
        </el-row>
        <!-- 保存提交 -->
        <el-row type="flex" justify="center" align="middle" v-show="!disabled">
          <el-button type="primary" size="medium" @click="save()">保存</el-button>
          <el-button type="primary" size="medium" @click="submit()">提交</el-button>
        </el-row>
      </el-form>
      <el-form v-if="shFlag" :model="shForm" :rules="rules" status-icon ref="sh_form">
        <el-row>
          <div class="person">审核意见：</div>
        </el-row>
        <el-row>
          <el-form-item prop="shyj">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              placeholder="请输入内容"
              style="width:500px;"
              v-model="shForm.shyj"
              class="noresize"
            ></el-input>
          </el-form-item>
        </el-row>
        <!-- 保存提交 -->
        <el-row type="flex" justify="center" align="middle">
          <el-button type="primary" size="medium" @click="sh_save()">审核通过</el-button>
          <el-button type="primary" size="medium" @click="sh_cancel()">审核退回</el-button>
          <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { mapActions, mapState } from "vuex";
export default {
  name: "Nqdj",
  computed: {},
  data() {
    var _this = this;
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      disabled: Boolean(this.$route.query.disable),
      shFlag: Boolean(this.$route.query.flag == "sh"),
      shForm: {
        shyj: ""
      },
      formdmb: {
        ajly_dmb: [],
        ay_dmb: []
      },
      formInline: {
        ajdjbid: "",
        ajh: "",
        ay: "",
        dwmc: "", //类型：String  必有字段  备注：64,full,单位名称/姓名,false
        ajly: "", //类型：String  必有字段  备注：2,full,案件来源,false(案件来源：ldjg_ajly)
        fddbr: "", //类型：String  必有字段  备注：32,full,法定代表人,true
        szdwid: "", //类型：String  可有字段  备注：256,full,注册或登记地址,true
        lzfzr: "", //类型：String  可有字段  备注：32,full,劳资负责人,true
        jyhbgdz: "", //类型：String  可有字段  备注：256,full,经营或办公地址,true
        lxdh: "", //类型：String  可有字段  备注：32,full,联系电话,true
        xm: "", //类型：String  可有字段  备注：32,full,投诉举报人姓名,true
        xb: "", //类型：String  可有字段  备注：1,full,性别,true（性别：cdg_sex）
        tsrlxdh: "", //类型：String  可有字段  备注：32,full,投诉人联系电话,true
        sfzh: "", //类型：String  可有字段  备注：18,full,身份证号,true
        txdz: "", //类型：String  可有字段  备注：256,full,通讯地址,true
        sfnh: "", //类型：String  可有字段  备注：1,full,户籍性质,true（0否，1是）
        tsjbsj: "", //类型：String  可有字段  备注：14,full,投诉/举报时间,true
        bz: "", //类型：String  可有字段  备注：512,full,备注,true
        flag: "", //类型：String  必有字段  备注：0:保存，1提交
        tj_nr: "", //类型：String  必有字段  备注：512,full,投诉(举报)事项及要求,true
        lstjsj: "", //类型：String  必有字段  备注：10,rq_8,历史投诉(举报)时间,true
        lstjdw: "", //类型：String  必有字段  备注：128,full,历史投诉(举报)单位,true
        lstjcljg: "", //类型：String  必有字段  备注：256,full,历史投诉(举报)结果,true
        lstjcl: "" //类型：String  必有字段  备注：128,full,历史投诉(举报)材料,true
      },
      rules: {
        dwmc: [{ validator: validator('64, "full", "单位名称/姓名", false') }],
        ajly: [{ validator: validator('2, "full", "案件来源", false') }],
        ay: [{ validator: validator('2, "full", "案由", false') }],
        fddbr: [{ validator: validator('32, "full", "法定代表人", true') }],
        szdwid: [
          { validator: validator('256, "full", "注册或登记地址", true') }
        ],
        lzfzr: [{ validator: validator('32, "full", "劳资负责人", true') }],
        jyhbgdz: [
          { validator: validator('156, "full", "经营或办公地址", false') }
        ],
        lxdh: [{ validator: validator('64, "phone", "联系电话", true') }],
        xm: [{ validator: validator('32, "full", "投诉举报人姓名", true') }],
        xb: [{ validator: validator('1, "full", "性别", true') }],
        tsrlxdh: [
          { validator: validator('32, "phone", "投诉人联系电话", false') }
        ],
        sfzh: [{ validator: validator('18, "sfzhm", "身份证号", true') }],
        txdz: [{ validator: validator('256, "full", "通讯地址", true') }],
        sfnh: [{ validator: validator('1, "full", "户籍性质", false') }],
        tsjbsj: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        bz: [{ validator: validator('512, "full", "备注", true') }],
        shyj: [{ validator: validator('512, "full", "审核意见", true') }],
        tj_nr: [
          { validator: validator('512, "full", "投诉(举报)事项及要求", true') }
        ],
        lstjsj: [
          {
            type: "string",
            required: false,
            message: "请选择历史投诉(举报)时间",
            trigger: "change"
          }
        ],
        lstjdw: [
          { validator: validator('128, "full", "历史投诉(举报)单位", true') }
        ],
        lstjcljg: [
          { validator: validator('256, "full", "历史投诉(举报)结果", true') }
        ],
        lstjcl: [
          { validator: validator('128, "full", "历史投诉(举报)材料", true') }
        ]
      }
    };
  },
  created() {
    // this.getCom();
    this.getajly(); //获取案件来源（代码表）
    this.getay(); //获取案由（代码表）
    this.echo(); //参数回显
  },
  methods: {
    // 参数回显
    echo() {
      var flag = this.$route.query.flag || false;
      if (this.$route.query.ajdjbid) {
        var ajdjbid = this.$route.query.ajdjbid;
        var ajh = this.$route.query.ajh;
        $({
          url: "/nqdj/ajxxxgcx",
          method: "get",
          params: {
            ajdjbid: ajdjbid,
            ajh: ajh
          }
        }).then(res => {
          var _res = res.returnData;
          if (+_res.executeResult == 1) {
            this.formInline = _res.ajxxxq;
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
      }
    },
    // 保存
    save() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.formInline.ajdjbid = this.$route.query.ajdjbid || "";
              this.formInline.ajh = this.$route.query.ajh || "";
              $({
                url: "/nqdj/djbc",
                method: "post",
                data: this.formInline
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.dbNum();
                  this.$router.push({
                    name: "Tsjbsx"
                  });
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
    // 提交
    submit() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.formInline.ajdjbid = this.$route.query.ajdjbid || "";
              this.formInline.ajh = this.$route.query.ajh || "";
              $({
                url: "/nqdj/djtj",
                method: "post",
                data: this.formInline
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.$refs["ref_form"].clearValidate();
                  this.$refs["ref_form"].resetFields();
                  this.dbNum();
                  // this.$router.push({
                  //   name: "Tsjbsx"
                  // });
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
    // 审核通过
    sh_save() {
      this.sh_event(31, "是否确认审核通过？");
    },
    // 审核不通过
    sh_cancel() {
      this.sh_event(32, "是否确认审核退回？");
    },
    sh_event(num, str) {
      if (num == 32 && !this.shForm.shyj) {
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
          $({
            url: "/lasp/laqspSp",
            method: "post",
            data: {
              ajdjbid: this.$route.query.ajdjbid,
              ajh: this.$route.query.ajh,
              ajzt: num,
              shyj: this.shForm.shyj
            }
          }).then(res => {
            var _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.$message({
                type: "success",
                center: true,
                message: res.returnMsg
              });
              this.goBack();
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
    // 返回上一层
    goBack() {
      this.$router.go(-1);
    },
    // 获取案件来源（代码表）
    getajly() {
      $({
        url: "/dmbgl/dmblbCx",
        method: "get",
        params: {
          table_name: "ldjg_ajly"
        }
      }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.formdmb.ajly_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 获取案由（代码表）
    getay() {
      $({
        url: "/dmbgl/dmblbCx",
        method: "get",
        params: {
          table_name: "ldjg_ay"
        }
      }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.formdmb.ay_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    }
  },
  watch: {
    // "formInline.ajly": function(n, o) {
    //   console.log("n", n);
    //   console.log("o", o);
    // }
  }
};
</script>
<style scoped lang="scss">
.el-breadcrumb-item {
  color: #5d5d5d;
}
.person {
  color: #089fb1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}
.txdz_input {
  width: 400px;
}
.yq_input {
  width: 343px;
}
.el-textarea {
  .el-textarea__inner {
    resize: none !important;
  }
}
</style>
