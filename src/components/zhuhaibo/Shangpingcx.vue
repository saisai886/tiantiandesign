<template>
    <div>
      <h1>商品查询</h1>
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
                      <span><img :src="'http://localhost:8090/tian/'+props.row.simg"></span>
                    </el-form-item>
                    <el-form-item label="商品备注">
                      <span>{{ props.row.sbeizhu }}</span>
                    </el-form-item>
                    <el-form-item label="商品状态">
                      <span>{{ props.row.sbshang }}</span>
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
                      label="商品备注"
                      prop="sbeizhu">
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
                  <el-button @click="handleDelete(scope.row.sid)" type="primary">删除</el-button>
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
              <el-select v-model="form.stid" placeholder="请选择商品类型">
                <el-option label="水果" value="shanghai"></el-option>
                <el-option label="奶制品" value="beijing"></el-option>
              </el-select>
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
              <input type="file" >
            </el-form-item>
          <el-form-item label="库存数量">
            <el-input  v-model="form.sbeizhu" placeholder="请输入商品备注"></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-col :span="11">
              <el-select v-model="form.sbshang" placeholder="请选择商品状态">
                <el-option label="上架" value="shanghai"></el-option>
                <el-option label="下架" value="beijing"></el-option>
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
              <el-select v-model="xg.stid" placeholder="请选择商品类型">
                <el-option label="水果" value="shanghai"></el-option>
                <el-option label="奶制品" value="beijing"></el-option>
              </el-select>
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
            <input type="file"  @change="getFile($event)">
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input  v-model="xg.sbeizhu" placeholder="请输入商品备注"></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-col :span="11">
              <el-select v-model="xg.sbshang" placeholder="请选择商品状态">
                <el-option label="上架" value="shanghai"></el-option>
                <el-option label="下架" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">立即创建</el-button>
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
          show:false,
          bj:false,
          Total2:0,
          pageSize:10,
          pageNO:1,
          //查询数组
          tableData: [
            {sid:'',
              sname:'',
              sprice:'',
              soldprice:'',
              sdanwei:'',
              sshopcount:'',
              schandi:'',
              stid:'',
              skucun:'',
              sbaozhitime:'',
              simg:'',
              sbeizhu:'',
              sbshang:''}],
            search: '',
        //添加数组
          form: [
            {sid:'',
              sname:'',
              sprice:'',
              soldprice:'',
              sdanwei:'',
              sshopcount:'',
              schandi:'',
              stid:'',
              skucun:'',
              sbaozhitime:'',
              simg:'',
              sbeizhu:'',
              sbshang:''}],
          //修改数组
          xg:[
            {sid:'1',
              sname:'1',
              sprice:'',
              soldprice:'',
              sdanwei:'',
              sshopcount:'',
              schandi:'',
              stid:'',
              skucun:'',
              sbaozhitime:'',
              simg:'img/1.png',
              sbeizhu:'',
              sbshang:''}],
        }
      },
      methods: {
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
        na(){
          this.show = true
        },
    //商品添加
        onSubmit(){
         alert("待开发")
        },

        //商品编辑
        handleEdit(sid) {
         this.bj = true
          this.tableData.forEach(val=>{
            if(val.sid=sid){
              this.xg.sname = val.sname
              this.xg.sprice = val.sprice
              this.xg.soldprice = val.soldprice
              this.xg.sdanwei = val.sdanwei
              this.xg.sshopcount = val.sshopcount
              this.xg.schandi = val.schandi
              this.xg.stid = val.stid
              this.xg.skucun = val.skucun
              this.xg.sbaozhitime = val.sbaozhitime
              this.xg.simg = val.simg
              this.xg.sbeizhu = val.sbeizhu
              this.xg.sbshang = val.sbshang
            }
          })
        },

        //商品删除
        handleDelete(sid) {
          alert(sid+"是否删除")
        },

        //分页方法
        fy(val){
          this.pageNO = val
          this.query()
        },

      },

    //弹框
      handleClose(done) {
        this.$confirm('确认关闭？')
                .then(_ => {
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
