<template>
    <div>
        <div class="ay_content">
            <el-col :span="24">
                <span class="newadd" @click="newAdd">新增</span>
            </el-col>
            <div class="newadd_table" v-if="flag">
                <el-table :data="fz_tableData" style="width: 100%" :header-cell-style="{background:'#27B6C7',color:'#ffffff'}">
                    <el-table-column prop="xh" label="序号" min-width="10%" align="center">                       
                    </el-table-column>
                    <el-table-column prop="jcxzmc" label="组名" min-width="15%" align="center">
                    </el-table-column>
                    <el-table-column label="监察员1" min-width="15%" align="center">  
                    <template slot-scope="scope">
                        <span>{{ scope.row.jcy1?scope.row.jcy1:"--" }}</span>
                    </template>                
                    </el-table-column>
                    <el-table-column label="监察员1证号" min-width="15%" align="center"> 
                    <template slot-scope="scope">
                        <span>{{ scope.row.jczh1?scope.row.jczh1:"--" }}</span>
                    </template>                       
                    </el-table-column>
                    <el-table-column label="监察员2" min-width="15%" align="center"> 
                    <template slot-scope="scope">
                        <span>{{ scope.row.jcy2?scope.row.jcy2:"--" }}</span>
                    </template>                      
                    </el-table-column>
                    <el-table-column label="监察员2证号" min-width="15%" align="center"> 
                    <template slot-scope="scope">
                        <span>{{ scope.row.jczh2?scope.row.jczh2:"--" }}</span>
                    </template>                   
                    </el-table-column>                                
                    <el-table-column label="操作" min-width="15%" align="center">
                        <template slot-scope="scope" align="center">
                            <el-button type="primary"  size="mini" @click="bJ(scope.$index)">编辑</el-button>                        
                            <el-button type="primary" class="scbtn" size="mini" @click="del(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--弹出框-->
            <el-dialog  :visible.sync="dialogFormVisible">
                <el-form :model="form" label-width="80px" :label-position="labelPosition" :rules="rules" status-icon ref="form">
                    <el-form-item label="组名" prop="jcxzmc" required>
                        <el-input v-model="form.jcxzmc" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="监察员1" prop="ryid1" required>
                        <el-select v-model="form.ryid1"  placeholder="请选择" @change="changeJcone">
                            <el-option :label="item.xm" :value="item.ryid" v-for="item in value" :key="item.ryid"></el-option>
                        </el-select>
                    </el-form-item>  
                    </el-form-item>
                    <el-form-item label="监察员2" prop="ryid2" required >
                        <el-select v-model="form.ryid2"  placeholder="请选择" @change="changeJctwo">
                            <el-option :label="item.xm" :value="item.ryid" v-for="item in value" :key="item.ryid"></el-option>
                        </el-select>
                    </el-form-item>    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="saveCancel('form')">取 消</el-button>
                    <el-button type="primary" @click="saveData('form')">确 定</el-button>
                </div>
            </el-dialog> 
            <!--分页-->
            <!--total共多少条,current-change改变触发，pageNum当前页，pageSize一页几个-->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                layout=" prev, pager, next, total"              
                :total="total"
                :page-size='pageSize'
                prev-text="上一页"
                next-text="下一页"
                v-if="this.total !== 0"
            ></el-pagination>       
        </div>
    </div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from "@/common/js/valid";
    export default {
        data() {
            return {
                editIndex: false,
                total:0,
                pageSize:12,
                pageNum: 1,
                labelPosition: 'right',
                dialogFormVisible: false,
                formLabelWidth: '80px',  
                fz_tableData: [],
                value:[], 
                form: {
                    jcxzmc:'',
                    jczh:"",
                    xm:"",
                    id1:"",
                    id2:"",
                    ryid1:'',
                    ryid2:'',
                    },
                rules:{jcxzmc: [{ validator: validator('32, "full", "监察小组名称", false') }],
                        ryid1: [{ validator: validator('14, "full", "人员id1", false') }],
                        ryid2: [{ validator: validator('14, "full", "人员id2", false') }]
                },                             
                flag:false
                }
            }, 
        methods: {
            // 分页的相关方法
            handleCurrentChange(val) {
                this.pageNum = val;
                this.fzData(val);
            },  
            // 显示数据
            fzData(num){            
                const pageNum = num || this.pageNum;
                $.get('/yhgl/xzxxcx', {
                    params: {
                        'pageNum': pageNum
                    }
                    }).then((result) => {
                    var _res = result.returnData;
                    if (+_res.executeResult == 1) {    
                        this.fz_tableData=result.returnData.xzxx;
                        this.total = parseInt(result.rowsCount); 
                        this.flag=true;                
                    } else {
                        this.$message({
                            type: "info",
                            message: "数据错误，请刷新重试"
                        })
                    }
                }).catch(() => { });
            },
            // 新增
            newAdd() {
                this.editIndex = false;
                this.dialogFormVisible = true;
                this.form.jcxzmc="";
                this.form.ryid1 = "";
                this.form.ryid2 = "";
                this.commonNewedit();
            },
            // 编辑
            bJ(index) {
                this.form.jcxzmc = this.fz_tableData[index].jcxzmc;
                this.form.ryid1 = this.fz_tableData[index].ryid1;
                this.form.ryid2 = this.fz_tableData[index].ryid2;
                this.editIndex = index;
                this.dialogFormVisible = true;
                this.commonNewedit();
            },
            // 点击新增和修改共同方法
            commonNewedit(){            
                $.get('/dmbgl/ryxxcx').then((result) => {
                    var _res = result.returnData;
                    if (+_res.executeResult == 1) {    
                        this.value=result.returnData.dmblb;            
                    } else {
                        this.$message({
                            type: "info",
                            message: "数据错误，请刷新重试"
                        })
                    }
                }).catch(() => { });
            },
            // 改变监察员1
            changeJcone($event){
                // this.form.ryid1=$event;
                if(this.form.ryid2 != "" && this.form.ryid1 == this.form.ryid2) {
                    this.form.ryid1 = "";
                    this.$message({
                        type: "info",
                        message: "监察员1和监察员2不能选择相同的"
                    })
                }
            },
            // 改变监察员2
            changeJctwo($event){
                if(this.form.ryid1 != "" && this.form.ryid2 == this.form.ryid1) {
                    this.form.ryid2 = "";
                    this.$message({
                        type: "info",
                        message: "监察员2和监察员1不能选择相同的"
                    }) 
                }
            },
            // 保存修改
            saveData() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                    // this.$confirm("是否保存", "提示", {
                    //     confirmButtonText: "确定",
                    //     cancelButtonText: "取消",
                    //     type: "success"
                    // }).then(() => {
                        const index = this.editIndex;
                        const pushData = {
                            'jcxzmc':this.form.jcxzmc,
                            'ryid1':this.form.ryid1,
                            'ryid2':this.form.ryid2                   
                            };
                        if(index !== false){
                            pushData.jcxzid = this.fz_tableData[index].jcxzid;
                        }
                        this.communFf(pushData)
                        this.dialogFormVisible = false;
                    }
                })          
            },
            // 取消修改
            saveCancel() {
                this.editIndex = false;
                this.dialogFormVisible = false;
            },           
            // 公共保存
            communFf(data){
                $.post('/yhgl/xzfz', data).then((result) => {
                    var _res = result.returnData;
                    if (+_res.executeResult == 1) {
                            this.$message({
                                type: "success",
                                message: "操作成功!"
                            });
                            this.fzData();
                    } else {
                        this.$message({
                            type: "info",
                            message: "组名不能为空"
                        });
                    }
                }).catch(() => { })
            },
            // 删除
            del(index) {
                this.$confirm("是否删除?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.editIndex = true;
                    $.post('/yhgl/scxz', {
                            'id1':this.fz_tableData[index].id1,
                            'id2':this.fz_tableData[index].id2,
                            'jcxzid':this.fz_tableData[index].jcxzid
                        }).then((result) => {
                        var _res = result.returnData;
                        if (+_res.executeResult == 1) {    
                            this. fzData();                      
                        } else {
                            this.$message({
                                type: "info",
                                message: "数据错误，请刷新重试"
                            })
                        }
                    })                
                })
            },
            // if( this.dialogFormVisible == 'false'){
            //     this.form.jcxzmc="";
            //     this.form.ryid1 = "";
            //     this.form.ryid2 = "";
            // }
        },
        mounted: function(){
            // 显示数据
            this.fzData();
        }
    }
</script>
<style scoped>
    .newadd {
        width: 80px;
        height: 30px;
        background: #0a9daf;
        opacity: 0.9;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        line-height: 30px;
        float: left;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .newadd_table {
        margin-top: 20px;
    }
    .ay_content{
        margin: 0;
        padding: 30px 20px 30px 20px;
        background-color: #ffffff;
        min-height:620px;
    }
    /*分页*/
    .el-pagination {
        text-align:center;
        padding: 40px 0;
    }
    .scbtn {
    margin-top: 5px;
    margin-left: 10px; 
    }
</style>