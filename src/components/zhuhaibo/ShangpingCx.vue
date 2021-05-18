<template>
    <div>
      <h2>商品查询</h2>
      <!--展示数据表格-->
            <el-table :data="tableData.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                      <span>{{ props.row.sname }}</span>
                    </el-form-item>
                    <el-form-item label="商品单价">
                      <span>{{ props.row.sprice }}</span>
                    </el-form-item>
                    <el-form-item label="进货价格">
                      <span>{{ props.row.soldprice }}</span>
                    </el-form-item>
                    <el-form-item label="商品单位">
                      <span>{{ props.row.sdanwei }}</span>
                    </el-form-item>
                    <el-form-item label="销量">
                      <span>{{ props.row.sshopcount }}</span>
                    </el-form-item>
                    <el-form-item label="产地">
                      <span>{{ props.row.schandi }}</span>
                    </el-form-item>
                    <el-form-item label="商品类型">
                      <span>{{ props.row.stid }}</span>
                    </el-form-item>
                    <el-form-item label="商品库存">
                      <span>{{ props.row.skucun }}</span>
                    </el-form-item>
                    <el-form-item label="商品保质期">
                      <span>{{ props.row.sbaozhitime }}</span>
                    </el-form-item>
                    <el-form-item label="商品图片">
                      <span><img style="width: 100px;height: 100px" :src="'http://localhost:8090/tian/'+props.row.simg"></span>
                    </el-form-item>
                    <el-form-item label="商品备注">
                      <span>{{ props.row.sbeizhu }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                      label="商品 ID"
                      prop="sid">
              </el-table-column>
              <el-table-column
                      label="商品名称"
                      prop="sname">
              </el-table-column>
              <el-table-column
                      label="商品状态"
                      prop="">
                <template slot-scope="scope">
                  {{scope.row.sbshang=='1'?'上架':'下架'}}
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
                  <el-button @click="handleEdit(scope.row.sid)" type="danger">编辑</el-button>
                  <el-button @click="na" type="success">添加</el-button>
                  <el-button  @click="handleDelete(scope.row.sid)" type="primary" >删除</el-button>

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

<!--添加模态框-->
      <el-dialog :visible="show" title="添加商品">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.sname" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品单价">
            <el-input v-model="form.sprice" placeholder="请输入商品单价"></el-input>
          </el-form-item>
          <el-form-item label="进货价格">
            <el-input  v-model="form.soldprice" placeholder="请输入进货价格"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model="form.sdanwei" placeholder="请输入商品单位"></el-input>
          </el-form-item>
          <el-form-item label="商品销量">
            <el-input  v-model="form.sshopcount" placeholder="请输入商品销量"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input  v-model="form.schandi" placeholder="请输入商品单位"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-col :span="11">

              <div class="block">
                <el-cascader
                        v-model="value"
                        :options="options"
                        @change="handleChange"></el-cascader>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input   v-model="form.skucun" placeholder="请输入商品库存数量"></el-input>
          </el-form-item>
          <el-form-item label="保质期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="请选择保质期" v-model="form.sbaozhitime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
            <el-form-item label="商品图片">
              <input type="file"  @change="getFile($event)">
            </el-form-item>
          <el-form-item label="库存数量">
            <el-input  v-model="form.sbeizhu" placeholder="请输入商品备注"></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-col :span="11">
              <el-select v-model="form.sbshang" placeholder="请选择商品状态">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>



<!-- 修改模态框-->
      <el-dialog :visible="bj" title="修改商品">
        <el-form ref="form" :model="xg" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="xg.sname" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品单价">
            <el-input v-model="xg.sprice" placeholder="请输入商品单价"></el-input>
          </el-form-item>
          <el-form-item label="进货价格">
            <el-input  v-model="xg.soldprice" placeholder="请输入进货价格"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model="xg.sdanwei" placeholder="请输入商品单位"></el-input>
          </el-form-item>
          <el-form-item label="商品销量">
            <el-input  v-model="xg.sshopcount" placeholder="请输入商品销量"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input  v-model="xg.schandi" placeholder="请输入商品单位"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-col :span="11">
              <div class="block">
                <el-cascader
                        v-model="value"
                        :options="options"
                        @change="handleChange">
                </el-cascader>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input   v-model="xg.skucun" placeholder="请输入商品库存数量"></el-input>
          </el-form-item>
          <el-form-item label="保质期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="请选择保质期" v-model="xg.sbaozhitime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="商品图片">
            <input type="file"  @change="getFile1($event)">
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input  v-model="xg.sbeizhu" placeholder="请输入商品备注"></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-col :span="11">
              <el-select v-model="xg.sbshang" placeholder="请选择商品状态">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
              </el-select>
            </el-col>
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
        name: "Shangfenleicx",
      data() {
        return {
          value:[],
          show: false,
          bj: false,
          Total2: 0,
          pageSize: 10,
          pageNO: 1,
          spid:0,
          //查询数组
          tableData: [],
          search: '',
          //添加数组
          form: [],
          //修改数组
          xg: [],
      //下拉框数据
          options: [],
        }
      },
      methods: {
          //修改方法
        getFile1(e){
          this.xg.simg= e.target.files[0].name;
        },

        spupdate(){
          this.$confirm('是否修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {

            this.xg.stid = this.value[1]
            this.xg.simg="img/"+this.xg.simg
            var xg = JSON.stringify(this.xg)
            var typexg = {
              headers:{
                "Content-Type": "application/json;charsetset=UTF-8"
              }
            }
            this.$axios.post("Shop/Xgsp.action",xg,typexg).then(value => {
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

        handleChange(value) {
         this.spid = value[1]
        },
      //商品查询
        query: function () {
          var param = new URLSearchParams();
          param.append("pageNo",this.pageNO);
          param.append("pageSize",this.pageSize);
          var _this = this;
          this.$axios.post("Shop/ShopAll.action",param).then(function (val) {
            _this.tableData = val.data.list
            _this.Total2 = val.data.total

          })
        },

        //下拉框查询
        xlkcx:function(){
          var _this=this;
          this.$axios.post("Shoplx/Shoplx.action").then(function (val) {
             _this.options = val.data
          })
        },

        na(){
          this.show = true
          this.xlkcx()
        },
    //商品添加
        getFile(e){
          this.form.simg= e.target.files[0].name;//获取选中的文件二进制流
        },
        onSubmit(){
        var _this =this;
        var params=  new URLSearchParams();
          params.append("sname",this.form.sname)
          params.append("sprice",this.form.sprice)
          params.append("soldprice",this.form.soldprice)
          params.append("sdanwei",this.form.sdanwei)
          params.append("sshopcount",this.form.sshopcount)
          params.append("schandi",this.form.schandi)
          params.append("stid",this.spid)
          params.append("skucun",this.form.skucun)
          params.append("sbaozhitime",this.form.sbaozhitime)
          params.append("simg","img/"+this.form.simg)
          params.append("sbeizhu",this.form.sbeizhu)
          params.append("sbshang",this.form.sbshang)
          this.$axios.post("Shop/ShopAdd.action",params).then(function (response) {
            _this.form = []
            _this.query()
          })
        },

        //商品编辑查询
        handleEdit(sid) {
         this.bj = true
          var _this=this;
         var params=new URLSearchParams();
         params.append("sid",sid);
         this.$axios.post("Shop/Xgspcx.action",params).then(function (val){
           _this.xg=val.data;
           _this.splx()
         })
        },
        splx(){
          this.$axios.post("Shoplx/splx.action?stid="+this.xg.stid).then(value => {
            this.value = []
            this.value.push(value.data.stpanentid)
            this.value.push(this.xg.stid)
            this.xlkcx();
          })
        },

        //商品删除
        handleDelete(sid) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            var _this=this;
            var params = new URLSearchParams();
            params.append("sid",sid)
            this.$axios.post("Shop/Scsp.action",params).then(value => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.query()
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
          this.query()
        },

      },

    //弹框
      handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
                  done();
                })
      },

    //初始化
      created() {
      this.query();
    },
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
