<template>
    <div>
        <h2>商品分类查询</h2>
        <el-table :data="yiji.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="一级分类ID">
                            <span>{{ props.row.stid }}</span>
                        </el-form-item>
                        <el-form-item label="分类名称">
                            <span>{{ props.row.stname }}</span>
                        </el-form-item>
                        <el-form-item label="父级ID">
                            <span>{{ props.row.stpanentid}}</span>
                        </el-form-item>
                    </el-form>

                </template>
            </el-table-column>
            <el-table-column
                    label="一级分类ID"
                    prop="stid">
            </el-table-column>
            <el-table-column
                    label="分类名称"
                    prop="stname">
            </el-table-column>
            <el-table-column
                    label="父级ID"
                    prop="stpanentid">
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
                    <el-button   type="danger">删除</el-button>
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
        name: "Shangpingfenglei",
        data(){
            return{
                yiji:[],
                search:'',
                pageSize:5,
                pageNO:1,
                Total2:0,
            }
        },
        methods:{
            Cx:function(){
                var param = new URLSearchParams();
                param.append("pageNo",this.pageNO);
                param.append("pageSize",this.pageSize);

                var _this=this;
                this.$axios.post("Shoplx/selectAll.action",param).then(value => {
                    _this.yiji=value.data.list
                    _this.Total2 = value.data.total
                }).catch()
            },
            fy(val){
                this.pageNO=val
                this.Cx();
            },
        },

        created() {
            this.Cx();
        }
    }
</script>

<style >
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