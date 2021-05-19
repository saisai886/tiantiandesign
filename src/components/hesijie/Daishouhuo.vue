<template>
  <div>
    <el-dialog title="订单信息" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" >
        <el-table-column property="sname" label="商品名称"></el-table-column>
        <el-table-column property="udname" label="收货人" ></el-table-column>
        <el-table-column property="sprice" label="商品单价" ></el-table-column>
        <el-table-column property="ucount" label="购买数量"></el-table-column>
        <el-table-column property="sbeizhu" label="商品描述"></el-table-column>
        <el-table-column  label="商品图片">
          <template scope="scope">
            <div :style="scope.row.simg">
              <img :src="'http://127.0.0.1:8090/tian/'+scope.row.simg"   width="60px" height="60px">
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
    </el-dialog>
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="100">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="udddingdan">
        </el-table-column>
        <el-table-column
          label="订单合计"
          prop="udspricesum">
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template scope="scope">
            <div :style="scope.row.uzhuangtai">
              {{scope.row.uzhuangtai=='f001'?'待付款':scope.row.uzhuangtai=='f002'?
              '已付款':scope.row.uzhuangtai=='f003'?'待发货':scope.row.uzhuangtai=='f004'?'已发货':'已收货'}}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="udname"
              size="mini"
              style="width: 200px"
              placeholder="输入收货人名称搜索"
              @input="ss"
            />
          </template>
          <template slot-scope="scope">
            <el-button type="primary" @click="chakan(scope.row.uddid)">查看</el-button>
          </template>
         </el-table-column>
      </el-table>
      <el-button @click="shouhuo" type="primary" style="float: left;margin-top: 20px" >
        确认收货
      </el-button>
      <el-pagination layout="prev,pager,next"
                     background
                     :total="total"
                     :page-size="pageSize"
                     @current-change="fenye"
      >
      </el-pagination>
    </template>
  </div>

</template>

<script>
    export default {
        name: "Daishouhuo",
      data() {
        return {
          tableData: [],
          search:"",
          udname:"",
          total:0,
          pageNo:1,
          pageSize:5,
          na:[],
          gridData: [],
          dialogTableVisible:false,
          formLabelWidth: '250px'
        }
      },
      methods:{
        getmenus(){
          var user=JSON.parse(sessionStorage.getItem("xszuser")) //拿到保存的用户
          var _this =this;
          var params = new URLSearchParams();
          params.append("udname",this.udname);  //查询条件
          params.append("pageNo",this.pageNo); //分页
          params.append("pageSize",5);
          params.append("uid",user.uid);//查询商户所需ID
          this.$axios.post("hsjshanghu/daishouhuo.action",params).then(function (response) {
            _this.total=response.data.total
            _this.tableData = response.data.records;
          }).catch();
        },
        fenye(val){
          this.pageNo =val;
          this.getmenus();
        },
        ss(){
          this.getmenus();
        },
        shouhuo(){
          if(this.na.length==0){
            this.$message({
              showClose: true,
              message: '请选择收货订单',
              type: 'error'
            });
            return false;
          }


          var _this =this;

          var arr = JSON.stringify(this.na)
          var config = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$confirm('此操作将收取货物, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("hsjshanghu/quedingshouhuo.action",arr,config).then(function (response) {
              _this.getmenus()
              _this.$message({
                type: 'success',
                message: '收货成功!'
              });
            }).catch();

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消收货'
            });
          });

        },
        handleSelectionChange(value){
          this.na = value
        },
        chakan(uddid) {
          this.dialogTableVisible = true
          var _this = this;
          var params = new URLSearchParams();
          params.append("uddid", uddid);  //查询条件
          this.$axios.post("hsjshanghu/daishouhuoqueryId.action", params).then(function (response) {
            _this.gridData = response.data.list
          }).catch();
        }
      },
      created() {
        this.getmenus()
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
  .el-table {
    color: #333;
    text-align: center;
    line-height: 20px;
  }
</style>
