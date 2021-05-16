<template>
    <div>
        <h2>商品分类查询</h2>
        <el-table :data="cx.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="类型Id">
                            <span>{{ props.row.stid }}</span>
                        </el-form-item>
                        <el-form-item label="类型名称">
                            <span>{{ props.row.skucun }}</span>
                        </el-form-item>
                        <el-form-item label="类型子级">
                            <span>{{ props.row.sbaozhitime }}</span>
                        </el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="类型Id"
                    prop="stid">
            </el-table-column>
            <el-table-column
                    label="类型名称"
                    prop="stname">
            </el-table-column>
            <el-table-column
                    label="类型子级"
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
                    <el-button type="danger">编辑</el-button>
                    <el-button  type="success">添加</el-button>
                    <el-button  type="primary">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Shangpingfenglei",

        data(){
            return{
                cx:[{
                    stid:'1',
                    stname:'1',
                    stpanentid:'1',
                }]



            }
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