<template>
  <div>
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%" >
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
            <el-button type="primary" round @click="shouhuo(scope.row.uddid)">确定收货</el-button>
          </template>
         </el-table-column>
      </el-table>

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
          pageSize:5
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
        shouhuo(id){
          var _this =this;
          var params = new URLSearchParams();
          params.append("uddid",id);
          this.$confirm('此操作将收取货物, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("hsjshanghu/quedingshouhuo.action",params).then(function (response) {
              _this.getmenus()
            }).catch();
            this.$message({
              type: 'success',
              message: '收货成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消收货'
            });
          });

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
