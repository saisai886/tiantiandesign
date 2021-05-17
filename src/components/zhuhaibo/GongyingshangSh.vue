<template>
    <div>
        <h2>供应商审核</h2>
        <!--展示数据表格-->
        <el-table :data="GysSz.filter(data => !search || data.gname.toLowerCase().includes(search.toLowerCase()))"
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
                            <span><img style="width: 100px;height: 100px;" :src="'http://localhost:8090/tian/'+props.row.gyingyeimg"></span>
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
                    label="审核状态"
                    prop="">
                <template slot-scope="scope">
                    <span>{{ scope.row.gzhuangtai=='G001'?'未审核' :scope.row.gzhuangtai=='G002'?'待审核':scope.row.gzhuangtai=='G003'?'已审核':scope.row.gzhuangtai=='G004'?'已删除':''}}</span>
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
                    <el-button @click="btgsh(scope.row.gid)" type="primary">不通过</el-button>
                    <el-button @click="tgsh(scope.row.gid)" type="primary">通过审核</el-button>
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
        name: "GongyingshangSh",
        data(){
            return{
                search:'',
                pageSize:5,
                pageNO:1,
                Total2:0,
                //查询供应商
                GysSz:[]
            }
        },
        methods:{
        //查询没通过的供应商
            Cxgys: function(){
                var param = new URLSearchParams();
                param.append("pageNo",this.pageNO);
                param.append("pageSize",this.pageSize);
                var _this = this;
                this.$axios.post("Gongyingshang/SelectZt.action",param).then(value => {
                    _this.GysSz=value.data.list
                    _this.Total2=value.data.total
                }).catch()
            },

            //修改供应商的状态
            //通过审核
            tgsh(gid){
                this.$confirm('此操作将供应商通过审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    var param=new URLSearchParams();
                    param.append("gid",gid);
                    this.$axios.post("Gongyingshang/xggyszt.action",param).then(value => {
                        this.Cxgys();
                    })

                    this.$message({
                        type: 'success',
                        message: '成功审核!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },



            //不通过审核
            btgsh(gid){
                this.$confirm('此操作将供应商通过审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    var param=new URLSearchParams();
                    param.append("gid",gid);
                    this.$axios.post("Gongyingshang/xggys.action",param).then(value => {
                        this.Cxgys();
                    })
                    this.$message({
                        type: 'success',
                        message: '成功取消审核!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },
            fy(val){
                this.pageNO=val
                this.Cxgys();
            }
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