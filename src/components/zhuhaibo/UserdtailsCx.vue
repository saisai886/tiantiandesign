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
                            <span><img :src="'http://localhost:8090/tian/'+props.row.udimg"></span>
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
                    <el-button @click="" type="danger">编辑</el-button>
                    <el-button @click="" type="primary">删除</el-button>
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
        name: "UserdtailsCx",
        data(){
            return {
                search:"",
                pageSize:5,
                pageNO:1,
                Total2:0,
                //查询用户数组
                YhSz:[{
                    udid:'',
                    uid:'',
                    udname:'',
                    udphone:'',
                    udaddr:'',
                    udimg:'',
                    udsex:'',
                    udmoney:'',
                    udpwd:'',
                }]
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
                }).catch()
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