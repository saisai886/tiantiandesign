<template>
    <div>
        <h2>供应商查询</h2>
        <!--展示数据表格-->
        <el-table :data="CxGys.filter(data => !search || data.gname.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="公司名称">
                            <span>{{ props.row.gname}}</span>
                        </el-form-item>
                        <el-form-item label="地址">
                            <span>{{ props.row.gaddre}}</span>
                        </el-form-item>
                        <el-form-item label="电话">
                            <span>{{ props.row.gphone}}</span>
                        </el-form-item>
                        <el-form-item label="主体类型">
                            <span>{{ props.row.gzhutitype}}</span>
                        </el-form-item>
                        <el-form-item label="法人姓名">
                            <span>{{ props.row.gfaname}}</span>
                        </el-form-item>
                        <el-form-item label="法人身份证">
                            <span>{{ props.row.gfarcard}}</span>
                        </el-form-item>
                        <el-form-item label="公司注册日期">
                            <span>{{ props.row.gzhucetime}}</span>
                        </el-form-item>
                        <el-form-item label="营业执照">
                            <span><img :src="'http://localhost:8090/tian/'+props.row.gyingyeimg"></span>
                        </el-form-item>
                        <el-form-item label="审核状态">
                            <span>{{ props.row.gzhuangtai}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="供应商Id"
                    prop="gid">
            </el-table-column>
            <el-table-column
                    label="公司名称"
                    prop="gname">
            </el-table-column>
            <el-table-column
                    label="法人姓名"
                    prop="gfaname">
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
                    <el-button @click="bj(scope.row.gid)" type="primary">编辑</el-button>
                    <el-button @click="sc(scope.row.gid)" type="primary">删除</el-button>
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
        name: "GongyingshangCx",
        data(){
            return{
                pageSize:5,
                pageNO:1,
                Total2:0,
                search:'',
                CxGys:[],
                xggys:[],
            }
        },
        methods:{
            //查询已经审核的供应商
            Cxgys(){
                var param=new URLSearchParams();
                param.append("pageNo",this.pageNO)
                param.append("pageSize",this.pageSize)
                var _this= this;
                this.$axios.post("Gongyingshang/SelectCxzt.action",param).then(value => {
                    _this.CxGys=value.data.list
                    _this.Total2=value.data.total
                }).catch()
            },
            sc(gid){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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
                this.Cxgys();
            },

        },
        created() {
            this.Cxgys();
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