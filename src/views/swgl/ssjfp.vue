<template>
  <div>
    <router-view></router-view>
    <el-container>
      <div class="forms">
        <el-form :inline="true" status-icon :model="form" label-position="right" label-width="155px" size="medium" class="demo-form-inline">
          <el-row>
            <div class="person">随机抽查基本信息</div>
          </el-row>
          <el-row>
            <el-col class="search">查询条件</el-col>
            <el-col :span="10">
              <el-form-item>
                <el-select placeholder="抽查内容" clearable v-model="form.ccsx" style="width:25%;margin:0 20px">
                  <el-option
                    v-for="item in ccsx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
                <el-select placeholder="抽查类型" clearable v-model="form.cclx" style="width:25%;margin:0 20px 0 0">
                  <el-option
                    v-for="item in cclx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
                <el-select placeholder="状态" clearable v-model="form.cczt" style="width:25%">
                  <el-option
                    v-for="item in zt_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              创建时间
              <el-date-picker size="medium"
                v-model="form.jckssj"
                type="date"
                value-format="yyyy-MM-dd"
                :editable="false"
                :picker-options="pickerOptionsStart"
                placeholder="开始日期" style="width:32%;margin-right: 20px">
              </el-date-picker> 
              <span>至</span>
              <el-date-picker size="medium"
                v-model="form.jcjssj"
                type="date"
                value-format="yyyy-MM-dd"
                :editable="false"
                :picker-options="pickerOptionsEnd"
                placeholder="结束日期" style="width:32%;margin-left: 20px">
              </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="query(1, 1)">查询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-button icon="el-icon-plus" style="margin-bottom:20px"><a @click="selectSinger">新建双随机</a></el-button>
          </el-row>
        </el-form>
        <el-row>
          <div class="result_table">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#27B6C7'}">
              <el-table-column width="50"></el-table-column>
              <el-table-column prop="cjsj" label="创建时间" min-width="10%"></el-table-column>
              <el-table-column prop="cclx" label="案件来源" min-width="15%"></el-table-column>
              <el-table-column prop="ccsx" label="抽查内容" min-width="15%"></el-table-column>
              <el-table-column prop="ccyj" label="抽查依据" min-width="15%"></el-table-column>
              <el-table-column prop="ccfx" label="抽查方向" min-width="15%"></el-table-column>
              <el-table-column prop="ccztName" label="状态" min-width="10%"></el-table-column>
              <el-table-column label="操作" min-width="15%" align="center">
                <template slot-scope="scope" align="center">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="sub(scope.row)"
                    class="btns"
                  >分配</el-button>
                  <!-- <span>|</span> -->
                  <el-button
                    type="primary"
                    size="mini"
                    @click="del(scope.row)"
                    class="btns"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
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
      </div>
    </el-container>
  </div>
</template>
<script>
// import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import "../../common/scss/public.scss";
import { deepClone, getdmb } from "@/common/js/common";

export default {
  name: '',
  data () {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.jcjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.jckssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      total: 0,
      pageNum: 1,
      pageSize: 12,
      form: {
        ccsx: '',
        cclx: '',
        cczt: '',
        jckssj: '',
        jcjssj: '',
        pageNum: 1
      },
      form_page: {
        ccsx: '',
        cclx: '',
        cczt: '',
        jckssj: '',
        jcjssj: '',
        pageNum: ''
      },
      options: [],
      tableData: [],
      ccsx_dmb: [],
      cclx_dmb: [
        {
          dmid: '0',
          dmmc: '常规检查'
        },{
          dmid: '1',
          dmmc: '专项检查'
        }
      ],
      zt_dmb: [
        {
          dmid: '10',
          dmmc: '待分配'
        },
        {
          dmid: '20',
          dmmc: '已分配'
        },
        {
          dmid: '30',
          dmmc: '已完成'
        }
      ]
    }
  },
  methods: {
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    query(num, flag) {
      // 分页点击带参数问题处理
      if (flag == 1) {
        this.form_page = deepClone(this.form);
      }
      var _form = this.form_page;
      _form.pageNum = num || this.pagenum;
      $.get('/ssj/sjccxxCx', {params: this.form_page}).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.tableData = res.returnData.vbs;
          this.total = parseInt(res.rowsCount);
        } else {
          this.tableData = res.returnData.vbs;
          this.total = parseInt(res.rowsCount);
          if (_res.message != '无查询结果') {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        }
      }); 
    },
    // 跳转到新建双随机页面
    selectSinger() {
      this.$router.push({path: '/ssjfp/first'})
    },
    // 分配功能
    sub(id) {
      this.$router.push({name: 'Second', query: { id: id.sjccid }});
    },
    // 删除功能
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $.post('/ssj/ssjDelete', {sjccid: id.sjccid}).then(res => {
          var _res = res.returnData;
          if (_res.executeResult == '1') {
            this.$message({
              type: "success",
              center: true,
              message: res.returnMsg
            });
            this.query(1,1);
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        })
      })
    },
    Search_dmb () {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ccnr", function(res) {
        _this.ccsx_dmb = res.returnData.dmblb;
      });
    }
  },
  created() {
    this.Search_dmb()
    this.query()
  },
  watch: {
    $route(to, from) {
    console.log(this.$route.meta);
    }
  },
};
</script>
<style scoped lang="scss">
.person {
  color: #089FB1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}
button {
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}
.search {
  margin-bottom: 20px;
}
.check_top {
  color: #089fb1;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
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
.btns {
  margin: 5px 5px 0;
}
</style>