<template>
    <div>
        <h2>商户审核</h2>
    <!--展示数据表格-->
    <el-table :data="Shcxsz.filter(data => !search || data.shname.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商户ID">
                        <span>{{ props.row.shid}}</span>
                    </el-form-item>
                    <el-form-item label="商户名称">
                        <span>{{ props.row.shname}}</span>
                    </el-form-item>
                    <el-form-item label="负责人姓名">
                        <span>{{ props.row.shfuzename}}</span>
                    </el-form-item>
                    <el-form-item label="负责人联系方式">
                        <span>{{ props.row.shphone}}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <span>{{ props.row.shaddr}}</span>
                    </el-form-item>
                    <el-form-item label="负责人身份证">
                        <span>{{ props.row.shfuzecard}}</span>
                    </el-form-item>
                    <el-form-item label=" 店铺营业执照">
                        <span><img :src="'http://localhost:8090/tian/'+props.row.shzhizhao"></span>
                    </el-form-item>
                    <el-form-item label="店铺注册日期">
                        <span>{{ props.row.shzhucetime}}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
                label="商户Id"
                prop="shid">
        </el-table-column>
        <el-table-column
                label="商户名称"
                prop="shname">
        </el-table-column>
        <el-table-column label="营业执照"
                         prop="shzhizhao"
                         align="center">
            <template slot-scope="scope">
                <img :src="'http://localhost:8090/tian/'+scope.row.shzhizhao">
            </template>
        </el-table-column>
        <el-table-column
                label="审核状态"
                prop="">
            <template slot-scope="scope">
                <span>{{scope.row.shzhuangtai=='K001'?'未审核':scope.row.shzhuangtai=='K002'?'待审核':scope.row.shzhuangtai=='K003'?'已审核':scope.row.shzhuangtai=='K004'?'已删除':''}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="操作"
                prop="desc">
            <template slot="header" slot-scope="scope">
                <el-input
                        v-model="search"
                        size="mini"
                        style="width: 200px"
                        placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button @click="btgsh(scope.row.shid)" type="primary">不通过</el-button>
                <el-button @click="tgsh(scope.row.shid)" type="primary">通过</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
            style="margin:25px 0px 0px -150px"
            background
            :page-size="pageSize"
            :current-page="pageNO"
            :total="Total2"
            @current-change="fy">
    </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "ShanghuSh",
        data(){
            return{
                pageSize:5,
                pageNO:1,
                total2:0,
                search:'',
                Shcxsz:[]
            }
        },
        methods:{
            //商户查询待审核的
            Shcx(){
                var param=new URLSearchParams();
                param.append("pageNo",this.pageNO)
                param.append("pageSize",this.pageSize)
                var _this=this;
             this.$axios.post("Shanghu/SelectAll.action",param).then(value => {
                 _this.Shcxsz=value.data.list;
                 _this.Total2=value.data.total
             }).catch()
            },
        //修改商户的状态
            //通过审核
            tgsh(shid){
                this.$confirm('此操作将供应商通过审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var param=new URLSearchParams();
                    param.append("shid",shid);
                    this.$axios.post("Shanghu/xgshzt.action",param).then(value => {
                        this.$message({
                            type: 'success',
                            message: '成功审核!'
                        });
                        this.Shcx();
                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },



            //不通过审核
            btgsh(shid){
                this.$confirm('此操作将供应商通过审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var param=new URLSearchParams();
                    param.append("shid",shid);
                    this.$axios.post("Shanghu/xgsh.action",param).then(value => {
                        this.$message({
                            type: 'success',
                            message: '成功取消审核!'
                        });
                        this.Shcx();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },

            //分页
          fy(val){
              this.pageNO=val
              this.Shcx();
          }
        },
        created() {
            this.Shcx();
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>