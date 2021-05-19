<template>
    <div>
        <h2>商品分类查询</h2>
        <el-table :data="yiji.filter(data => !search || data.stname.toLowerCase().includes(search.toLowerCase()))"
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
                    <el-button @click="xg(scope.row.stid)" type="primary">编辑</el-button>
                    <el-button @click="tj()" type="success">添加</el-button>
                    <el-button @click="sc(scope.row.stid)"  type="danger">删除</el-button>
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


        <el-dialog :visible="bj" title="修改商品">
            <el-form ref="form" :model="xgsz" label-width="80px">
                <el-form-item label="类型ID">
                    <el-input v-model="xgsz.stid" disabled></el-input>
                </el-form-item>
                <el-form-item label="类型名称">
                    <el-input v-model="xgsz.stname" placeholder="请输入类型名称"></el-input>
                </el-form-item>
                <el-form-item label="父级id">
                    <el-col :span="11">
                        <div class="block">
                            <el-cascader
                                    v-model="value"
                                    :options="options"
                                    :props="{ checkStrictly: true }"
                                    @change="handleChange1">
                            </el-cascader>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="spupdate">立即修改</el-button>
                    <el-button @click="bj=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>



        <el-dialog :visible="tjmtk" title="添加类型">
            <el-form ref="form" :model="tjsz" label-width="80px">
                <el-form-item label="类型名称">
                    <el-input v-model="tjsz.stname" placeholder="请输入类型名称"></el-input>
                </el-form-item>

                <el-form-item >
                    <el-select v-model="tjsz.stpanentid" placeholder="父级名称">
                        <el-option v-for="item in tjxlk"
                                   :label="item.stname"
                                   :value="item.stid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="splxtj">立即添加</el-button>
                    <el-button @click="tjmtk=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
                bj:false,
                xgsz:[],
                options: [],
                value:[],
                tjmtk:false,
                tjsz:[],
                tjxlk:[],
            }
        },
        methods: {

            //查询
            Cx: function () {
                var param = new URLSearchParams();
                param.append("pageNo", this.pageNO);
                param.append("pageSize", this.pageSize);
                var _this = this;
                this.$axios.post("Shoplx/selectAll.action", param).then(value => {
                    _this.yiji = value.data.list
                    _this.Total2 = value.data.total
                }).catch()
            },
            //分页
            fy(val) {
                this.pageNO = val
                this.Cx();
            },
            //根据id查询
            xg(stid) {
                this.bj = true;
                var _this = this;
                var param = new URLSearchParams();
                param.append("stid", stid);
                this.$axios.post("Shoplx/cxid.action", param).then(value => {
                    console.log(value.data)
                    _this.xgsz = value.data
                    if (value.data.stpanentid == 0) {
                        this.value = []
                        this.value.push(value.data.stid)
                    } else {
                        this.value = []
                        this.value.push(value.data.stpanentid)
                        this.value.push(value.data.stid)
                    }
                    this.handleChange()
                })
            },
            //修改
            spupdate() {

            },
            handleChange1(value) {
                alert(value)
            },
            //查询下拉框
            handleChange() {
                this.$axios.post("Shoplx/Shoplx.action").then(value => {
                    this.options = value.data
                })
            },

            //查询父级
            fj() {
                this.$axios.post("Shoplx/Cxerji.action").then(value => {
                    this.tjxlk = value.data
                })
            },
            //添加
            splxtj() {
            var param= new URLSearchParams();
               param.append("stname",this.tjsz.stname)
                param.append("stpanentid",this.tjsz.stpanentid)
                this.$axios.post("Shoplx/tjsplx.action",param).then(value => {
                      this.tjmtk=false;
                    this.Cx();
                    this.tjsz = [];
                })
            },

        tj(){
        this.tjmtk=true;
        this.fj();
        },

            //删除
            sc(stid){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                  }).then(() => {
                    var _this=this;
                    var params = new URLSearchParams();
                    params.append("stid",stid)
                    this.$axios.post("Shoplx/sclx.action",params).then(value => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    _this.Cx();
                     }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        //初始化
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