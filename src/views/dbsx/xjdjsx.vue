<template>
  <div>
    <div class="forms">
      <div class="check_top">
        <span>搜索条件</span>
      </div>
      <el-form
        :rules="rules"
        :model="xcdjForm"
        ref="xcdjForm"
        label-position="right"
        class="demo-ruleForm"
        :inline="true"
        label-width="200px"
      >
        <el-form-item label="案件登记号" prop="ajh">
          <el-input v-model="xcdjForm.ajh" clearable></el-input>
        </el-form-item>
        <el-form-item label="抽查内容（定：检查内容）" prop="ccsx">
          <!-- <i class="icon-ali-xiajiantou"></i> -->
          <el-select v-model="xcdjForm.ccsx" value-key="value" placeholder="请选择" clearable>
            <el-option
              :label="item.dmmc"
              :value="item.dmid"
              v-for="item in ccnr_dmbb"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查时间" prop="tsjbsj">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="xcdjForm.tsjbsj"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="单位名称" prop="dwmc">
          <el-input v-model="xcdjForm.dwmc" clearable></el-input>
        </el-form-item>
        <el-form-item label="案件登记状态" prop="ajzt">
          <el-select v-model="xcdjForm.ajzt" value-key="value" placeholder="请选择" clearable>
            <!-- <el-option></el-option> -->
            <el-option
              :label="item.dmmc"
              :value="item.dmid"
              v-for="item in ajzt_dmb"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主办监察员" prop="zbjcy">
          <el-select v-model="xcdjForm.zbjcy" value-key="value" placeholder="请选择" clearable>
            <el-option
              :label="item.xm"
              :value="item.ryid"
              v-for="item in zbjcy_dmbb"
              :key="item.ryid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件来源" prop="ajly">
          <!-- <i class="icon-ali-xiajiantou"></i> -->
          <el-select v-model="xcdjForm.ajly" value-key="value" placeholder="请选择" clearable>
            <el-option
              :label="item.dmmc"
              :value="item.dmid"
              v-for="item in ajly_dmbb"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="24">
          <span class="submit" @click="getlist(1,1)">查询</span>
        </el-col>
      </el-form>

      <div class="xjdjsx_table">
        <div class="check_top">
          <i class="icon-ali-wenben"></i>
          <span>查询结果</span>
        </div>
        <div class="result_table">
          <el-table
            :data="xjdjsx_table"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#27B6C7'}"
          >
            <el-table-column prop="ajh" label="案件号" min-width="10%" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column
              label="被检查单位"
              min-width="10%"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <span
                  class="jcdw_class"
                  @click="link(scope.row.ajdjbid,scope.row.ajh,true)"
                >{{ scope.row.bjcdw }}</span>
              </template>
            </el-table-column>
            <el-table-column label="案件来源" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.ajly | ly(ajly_dmbb) }}</span> -->
                <span>{{ scope.row.ajly }}</span>
              </template>
            </el-table-column>
            <el-table-column label="抽查内容（定：检查内容）" min-width="20%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-for="(item,i) in scope.row.ccsx" :key="i" class="p">{{item}}</span>
                <!-- <p>{{ scope.row.ccnr_1}}</p>
                <p>{{ scope.row.ccnr_2}}</p>
                <p>{{ scope.row.ccnr_3}}</p> -->
                <!-- <span>{{ scope.row.ccsx | xjnr(ccnr_dmbb)}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="jckssj" label="到达现场时间" min-width="10%" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jcjssj" label="离开现场时间" min-width="10%" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="主办人" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.zbjcy | zbr(people) }}</span> -->
                <span>{{ scope.row.zbjcy }}</span>
              </template>
            </el-table-column>
            <el-table-column label="协办人" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.xbjcy | zbr(people) }}</span> -->
                <span>{{ scope.row.xbjcy }}</span>
              </template>
            </el-table-column>
            <el-table-column label="巡检事项状态" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.ajzt | zt(ajzt_dmb) }}</span>
                <!-- <span>{{ scope.row.ajzt }}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="djr" label="登记人" min-width="10%" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <template slot-scope="scope" align="center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="link(scope.row.ajdjbid,scope.row.ajh, false)"
                  v-if="scope.row.ajzt == '10'"
                >提交</el-button>
                <!-- <span>|</span> -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="del(scope.row.ajdjbid,scope.row.ajh)"
                  v-if="scope.row.ajzt == '10'"
                >删除</el-button>
                <!-- <el-button type="primary" size="mini" @click="check()" v-else>查看</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="result_button"> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-size="pageSize"
          layout=" prev, pager, next, total"
          :total="total"
          prev-text="上一页"
          next-text="下一页"
          v-if="this.total !== 0"
        ></el-pagination>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script scoped>
import $ from "@/common/js/axios";
import { mapActions, mapState } from "vuex";
import { validator } from "@/common/js/valid";
import { deepClone, getdmb } from "@/common/js/common";
export default {
  data() {
    return {
      // 主办人
      arrNeirong:"",
      people: "",
      total: Number(0),
      pagenum: 1,
      pageSize: 10,
      ajly_dmbb: "", // "",
      ccnr_dmbb: "", //抽查内容
      zbjcy_dmbb: "",
      xcdjForm: {
        ajh: "", // "案件号",
        ccsx: "", // "抽查内容",
        tsjbsj: "",
        dwmc: "", // "单位名称",
        ajzt: "", // "案件登记状态",
        zbjcy: "", // "full",
        ajly: "", // "案件来源",
        pageNum: 1 // ""
      },
      xcdjForm_page: {
        ajh: "", // "案件号",
        ccsx: "", // "抽查内容",
        tsjbsj: "",
        dwmc: "", // "单位名称",
        ajzt: "", // "案件登记状态",
        zbjcy: "", // "full",
        ajly: "", // "案件来源",
        pageNum: 1 // ""
      },
      xjdjsx_table: [
        {
          ajdjbid: "", //  案件登记id
          ajh: "", //  案件号
          bjcdw: "", //  被检查单位
          ajly: "", //  案件来源（ldjg_ajly）
          ccsx: "", //  抽查内容(ldjg_ay)
          jckssj: "", //  到达现场时间
          jcjssj: "", //  离开现场时间
          zbjcy: "", //  主办监察员
          xbjcy: "", //  协办监察员
          ajzt: "", //  巡检事项状态（ldjg_ajzt）
          djr: "" //  登记人
        }
      ],
      rules: {
        ajh: [{ validator: validator('20, "ajh", "案件号", true') }],
        ccsx: [{ validator: validator('50, "full", "抽查事项", true') }],
        tsjbsj: [
          {
            type: "string",
            required: false,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        dwmc: [{ validator: validator('13, "full", "单位名称", true') }],
        ajzt: [{ validator: validator('13, "full", "案件状态", true') }],
        zbjcy: [{ validator: validator('13, "full", "主办检查员", true') }],
        ajly: [{ validator: validator('2, "full", "案件来源", true') }]
      }
    };
  },
  computed: {
    ...mapState(["ajzt_dmb"])
  },
  methods: {
    ...mapActions(["ajdjzt_dmb", "login"]),
    del(id, num) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $.post("/wqdj/wqajSave", {
            flag: 2,
            ajdjbid: id,
            ajh: num
          }).then(res => {
            // console.log(res);
            const returnMsg = res;
            if (res.returnData.executeResult === 1) {
              this.$message.success(returnMsg);
            } else {
              this.$message.warning(returnMsg);
            }
          });
        })
        .catch(() => {
        });
    },
    // 点击查询
    getlist(num, flag) {
      // 分页点击带参数问题处理
      if (flag == 1) {
        this.xcdjForm_page = deepClone(this.xcdjForm);
      }
      var _form = this.xcdjForm_page;
      _form.pageNum = num || this.pagenum;
      $({
        url: "/wqdj/wqajCx",
        method: "get",
        params: _form
      }).then(res => {
        console.log(res);
        const _res = res.returnData;
        if (+_res.executeResult === 1 ) {
          this.xjdjsx_table = res.returnData.vbs;
          this.xjdjsx_table.map(item => {
            if (item.ccsx !== null) {
              item.ccsx = item.ccsx.split(',')
            }
          })
          this.total = parseInt(res.rowsCount);
        } else {
          this.xjdjsx_table= [],
          this.total=0
        }
      });
    },
    handleCurrentChange(val) {
      this.getlist(val);
    },
    // 提交
    link(id, num, disable) {
      this.$router.push({
        name: "Bjxjdj",
        query: { ajdjbid: id, disable: disable }
      });
    },
    // 主办检查员
    zbjcy_select() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        _this.zbjcy_dmbb = res.returnData.dmblb;
      });
    },
    // 案件来源
    ajly_dmb() {
       var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
        _this.ajly_dmbb = res.returnData.dmblb;
      });
    },
    // 抽查内容
    ccnr_dmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_ay", function(res) {
        _this.ccnr_dmbb = res.returnData.dmblb;
      });
    },
    // 主办人
    zbr_dmb() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        _this.people = res.returnData.dmblb;
      });
    }
  },
  created() {
    this.getlist();
    this.zbjcy_select();
    // 案件来源
    this.ajly_dmb();
    this.ccnr_dmb();
    this.ajdjzt_dmb();
    this.zbr_dmb();
  }
};
</script>

<style scoped>
.p {
  margin: 0;
}
.jcdw_class {
  text-decoration: underline;
  color: #089fb1;
  cursor: pointer;
}
button {
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}
.check_top {
  color: #089fb1;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.check_top i {
  margin-right: 5px;
}
.last_label {
  margin-left: 28px;
}
.el-form {
  padding-left: 30px;
}
.submit {
  width: 80px;
  height: 30px;
  background: #0a9daf;
  opacity: 0.9;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  float: left;
  margin-left: 50%;
  transform: translate(-50%);
  cursor: pointer;
}

.result_table {
  margin-top: 20px;
}

.el-pagination {
  text-align: center;
  padding: 40px 0;
}
</style>

