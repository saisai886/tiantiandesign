<template>
    <div>
        <h2>商户查询</h2>
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
                    <el-button  type="primary">编辑</el-button>
                    <el-button @click="sc(scope.row.shid)"  type="primary">删除</el-button>
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
        name: "ShanghuCx",
        data(){
            return{
                pageSize:5,
                pageNO:1,
                Total2:0,
                search:'',
                Shcxsz:[],
            }
        },
        methods:{
            //商户查询已审核的
            Shtgsh(){
                var param=new URLSearchParams();
                param.append("pageNo",this.pageNO)
                param.append("pageSize",this.pageSize)
                var _this=this;
                this.$axios.post("Shanghu/SelectCxzt.action",param).then(value => {
                    _this.Shcxsz=value.data.list
                    _this.Total2=value.data.total
                }).catch()
            },
            sc(shid){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                var param=new URLSearchParams();
                    param.append("shid",shid);
                    this.$axios.post("Shanghu/deletesh.action",param).then(value => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.Shtgsh();
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },



            //分页
            fy(val){
                this.pageNO=val
                this.Shtgsh();
            }
        },
        created() {
            this.Shtgsh();
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