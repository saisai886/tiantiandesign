<template>
    <div>
        <h1>用户查询</h1>
        <!--展示数据表格-->
        <el-table :data="YhSz.filter(data => !search || data.udname.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户Id">
                            <span>{{ props.row.udid}}</span>
                        </el-form-item>
                        <el-form-item label="收货人姓名">
                            <span>{{ props.row.udname }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ props.row.udphone }}</span>
                        </el-form-item>
                        <el-form-item label="地址">
                            <span>{{ props.row.udaddr }}</span>
                        </el-form-item>
                        <el-form-item label="头像">
                            <span><img  style="height: 100px;width: 100px" :src="'http://localhost:8090/tian/'+props.row.udimg"></span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ props.row.udsex }}</span>
                        </el-form-item>
                        <el-form-item label="余额">
                            <span>{{ props.row.udmoney }}</span>
                        </el-form-item>
                        <el-form-item label="支付密码">
                            <span>{{ props.row.udpwd }}</span>
                        </el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户ID"
                    prop="udid">
            </el-table-column>
            <el-table-column
                    label="收货人姓名"
                    prop="udname">
            </el-table-column>
            <el-table-column
                    label="用户状态"
                    prop="">
                <template slot-scope="scope">
                    {{scope.row.userzhuangtai=='0'?'禁用':'可用'}}
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
                    <div v-if="YhSz.userZhuangtai=1">
                    <el-button @click="bjcx(scope.row.uid)" type="danger">编辑</el-button>
                    <el-button @click="sc(scope.row.uid)" type="primary">删除</el-button>
                    </div>
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
        <el-dialog :visible="bj" title="修改用户">
            <el-form ref="form" :model="xg" label-width="80px">
                <el-form-item label="收货姓名">
                    <el-input v-model="xg.udname" placeholder="请输入收货姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="xg.udphone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input  v-model="xg.udaddr" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <input type="file"  @change="getFile($event)">
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="xg.udsex" label="男">男</el-radio>
                    <el-radio v-model="xg.udsex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="余额">
                    <el-input  v-model="xg.udmoney" placeholder="请输入余额"></el-input>
                </el-form-item>
                <el-form-item label="支付密码">
                <el-input  v-model="xg.udpwd" placeholder="请输入支付密码"></el-input>
                 </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="spupdate">立即修改</el-button>
                    <el-button @click="bj=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "UserdtailsCx",
        data(){
            return {
                search:"",
                pageSize:5,
                pageNO:1,
                Total2:0,
                bj: false,
                //查询用户数组
                YhSz:[],
                xg:[],
            }
        },
        methods:{
            //用户查询
            query: function (){
                var param = new URLSearchParams();
                param.append("pageNo",this.pageNO);
                param.append("pageSize",this.pageSize);
                var _this=this;
                this.$axios.post("userdtails/SelectAll.action",param).then(value => {
                    _this.YhSz=value.data.list
                    _this.Total2 = value.data.total
                    console.log(_this.YhSz)
                }).catch()
            },
            getFile(e){
                this.xg.udimg=e.target.files[0].name;
            },
            //编辑查询
            bjcx(uid){
                this.bj = true;
                var _this=this;
                var param=new URLSearchParams();
                param.append("uid",uid);
                this.$axios.post("userdtails/SelectID.action",param).then(value => {
                   _this.xg=value.data;

                })
            },
            spupdate(){
                this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.xg.udimg="touxiang/"+this.xg.udimg;
                    var xg = JSON.stringify(this.xg);
                    var typexg = {
                        headers:{
                            "Content-Type": "application/json;charsetset=UTF-8"
                        }
                    }
                    this.$axios.post("userdtails/Xgyh.action",xg,typexg).then(value => {
                        this.query();
                        this.xg=[]
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

            },

            //删除
            sc(uid){

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    var _this=this;
                    var param=new URLSearchParams();
                    param.append("uid",uid)
                    this.$axios.post("userdtails/scyh.action",param).then(value => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        _this.query();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            //分页方法
            fy(val){
                this.pageNO = val
                this.query();
            },
        },

        //初始化
    created(){
            this.query();
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