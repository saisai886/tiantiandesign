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
        style="width: 100%" >
<!--        <el-table-column type="expand">-->
<!--          <template slot-scope="props">-->
<!--            <el-form label-position="left" inline class="demo-table-expand">-->
<!--              <el-form-item label="图片">-->
<!--                <img :src="'http://127.0.0.1:8090/tian/'+props.row.simg"   width="60px" height="60px">-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商品名称">-->
<!--                <span>{{ props.row.sname }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商品单价">-->
<!--                <span>{{ props.row.sprice }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="收货人">-->
<!--                <span>{{ props.row.udname }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="联系电话">-->
<!--                <span>{{ props.row.udphone }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="自提店">-->
<!--                <span>{{ props.row.shname }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="自提店地址">-->
<!--                <span>{{ props.row.shaddr }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="购买数量">-->
<!--                <span>{{ props.row.ucount }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="订单合计">-->
<!--                <span>{{ props.row.udspricesum }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="下单时间">-->
<!--                <span>{{ props.row.udtime }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商城发货时间">-->
<!--                <span>{{ props.row.udfahuotime }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商户收到货时间">-->
<!--                <span>{{ props.row.uddaititime }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="提货时间">-->
<!--                <span>{{ props.row.udendtime }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商品描述">-->
<!--                <span>{{ props.row.sbeizhu }}</span>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </template>-->
<!--        </el-table-column>-->

        <el-table-column
          label="订单编号"
          prop="udddingdan">
        </el-table-column>
        <el-table-column
          label="收货人"
          prop="udname">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="商品名称"-->
        <!--          prop="sname">-->
        <!--        </el-table-column>-->
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
              '已付款':scope.row.uzhuangtai=='f003'?'待发货':scope.row.uzhuangtai=='f004'?'已发货':scope.row.uzhuangtai=='f004-1'?'待提货':'已收货'}}
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
        name: "Yitihuo",
      data() {
        return {
          tableData: [],
          search:"",
          udname:"",
          total:0,
          pageNo:1,
          pageSize:5,
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
          this.$axios.post("hsjshanghu/yitihuo.action",params).then(function (response) {
            _this.total=response.data.total
            _this.tableData = response.data.list;
          }).catch();
        },
        open1() {
          this.$message({
            showClose: true,
            message: '审核通过',
            type: 'success'
          });
        },
        open2() {
          this.$message({
            showClose: true,
            message: '审核不通过',
            type: 'warning'
          });
        },
        fenye(val){
          this.pageNo =val;
          this.getmenus();
        },
        ss(){
          this.getmenus();
        },
      chakan(uddid){
        this.dialogTableVisible=true
        var _this =this;
        var params = new URLSearchParams();
        params.append("uddid",uddid);  //查询条件
        this.$axios.post("hsjshanghu/yitihuoqueryId.action",params).then(function (response) {
          _this.gridData=response.data.list
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
