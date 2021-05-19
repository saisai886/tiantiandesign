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
            <el-table-column label="营业执照"
                             prop="gyingyeimg"
                             align="center">
                <template slot-scope="scope">
               <img :src="'http://localhost:8090/tian/'+scope.row.gyingyeimg">
                </template>
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
                    <el-button @click="xg(scope.row.gid)" type="primary">编辑</el-button>
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



        <!-- 修改模态框-->
        <el-dialog :visible="bj" title="修改供应商">
            <el-form ref="form" :model="xggys" label-width="110px">
                <el-form-item label="公司名称">
                    <el-input v-model="xggys.gname" placeholder="请输入供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="xggys.gaddre" placeholder="请输入供应商地址"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input  v-model="xggys.gphone" placeholder="请输入供应商电话"></el-input>
                </el-form-item>
                <el-form-item label="供应商类型">
                    <el-input v-model="xggys.gzhutitype" placeholder="请输入供应商类型"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名">
                    <el-input  v-model="xggys.gfaname" placeholder="请输入供应商法人姓名"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证">
                    <el-input  v-model="xggys.gfarcard" placeholder="请输入供应商法人身份证"></el-input>
                </el-form-item>
                <el-form-item label="供应商注册日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="请选择供应商注册日期" v-model="xggys.gzhucetime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="供应商营业执照">
                    <input type="file"  @change="getFile($event)">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="spupdate">立即修改</el-button>
                    <el-button @click="bj=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
                bj:false,
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
                var param=new URLSearchParams();
                        param.append("gid",gid);
                    this.$axios.post("Gongyingshang/deletegys.action",param).then(value => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.Cxgys();
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
                this.Cxgys();
            },
// 图片类型
            getFile(e){
                this.xggys.gyingyeimg=e.target.files[0].name;
            },
//根据id查询
            xg(gid){
                this.bj = true
              var param= new URLSearchParams();
                param.append("gid",gid);
              this.$axios.post("Gongyingshang/SelectId.action",param).then(value => {
                  this.xggys=value.data
              }).catch()
            },
//修改
            spupdate(){
                this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.xggys.gyingyeimg="yyzz/"+this.xggys.gyingyeimg;
                    var xg = JSON.stringify(this.xggys);
                    var typexg = {
                        headers:{
                            "Content-Type": "application/json;charsetset=UTF-8"
                        }
                    }
                    this.$axios.post("Gongyingshang/xgGys.action",xg,typexg).then(value => {
                        this.Cxgys();
                        this.bj = false
                        this.xggys=[]
                    })
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
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