<template>
    <div>
      <el-table
        :data="cgdanAll"
        stripe
        style="width: 100%">
        <el-table-column
          prop="cgdan"
          label="采购单"
          width="180">
        </el-table-column>
        <el-table-column
          prop="yloginname"
          label="采购人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cgallmoney"
          label="总金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cgtime"
          label="申请时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cgzhuangtai"
          label="状态"
          width="150">
          <template slot-scope="scope">
            <span style="color: #78dc15" v-if="scope.row.cgzhuangtai=='c001'">
              通过采购申请
            </span>
            <span style="color: red" v-if="scope.row.cgzhuangtai=='c002'">
              未通过采购申请
            </span>
            <span style="color: orange" v-if="scope.row.cgzhuangtai=='c003'">
              待审核采购申请
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250px">
          <template slot-scope="scope">
            <el-button type="primary" @click="ck(scope.row.cgid)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin:25px 0px 0px -150px"
        background
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total"
        @current-change="currentPage">
      </el-pagination>

      <el-dialog style="font-family: 新宋体" :visible.sync="cgdanspshow" title="采购申请单记录">
        <div>
        <el-table
            :data="cgdanxxAll"
            stripe
            style="width: 100%"
            height="250">
            <el-table-column
              prop="cgid"
              label="采购编号"
              width="160">
            </el-table-column>
            <el-table-column
              prop="gname"
              label="供应商名称"
              width="160">
            </el-table-column>
            <el-table-column
              prop="gsname"
              label="商品名称"
              width="160">
            </el-table-column>
            <el-table-column
              prop="cdcoun"
              label="采购数量"
              width="160">
            </el-table-column>
            <el-table-column
              prop="cdxiaoji"
              label="小计"
              width="160">
            </el-table-column>
          <el-table-column
            prop="cdxxzhuangtai"
            label="状态"
            width="100">
            <template slot-scope="scope">
            <span style="color: #78dc15" v-if="scope.row.cdxxzhuangtai=='cdxx001'">
              通过
            </span>
              <span style="color: red" v-if="scope.row.cdxxzhuangtai=='cdxx002'">
              未通过
            </span>
              <span style="color: orange" v-if="scope.row.cdxxzhuangtai=='cdxx003'">
              待审核
            </span>
            </template>
          </el-table-column>
          </el-table>
          <el-button STYLE="margin-left: 700px;margin-top: 20px" type="primary" @click="cgdanspshow=false">
            关闭
          </el-button>
          <span style="float: left;margin-top: 30px">
           采购商品共:{{spzs}}条
          </span>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "zb_caigoushengqingjilu",
       data(){
          return{
            cgdanspshow:false,
            cgdanAll:[],
            cgdanxxAll:[],
            pageNo:1,
            pageSize:5,
            total:0,
            spzs:0,
          }
       },
      methods:{
          ck(cgid){
            this.cgdanspshow = true
            this.$axios.post("cgxx/cggAll.action?cgid="+cgid).then(value => {
              this.cgdanxxAll  = value.data
              this.spzs = value.data.length
            })
          },
        currentPage(value){
          this.pageNo = value
          this.cgAll()
        },
          cgAll(){
            var param =  new URLSearchParams();
            param.append("pageNo",this.pageNo)
            param.append("pageSize",this.pageSize)
            this.$axios.post("cg/cgjlAll.action",param).then(value => {
              this.cgdanAll = value.data.list
              this.total  =  value.data.total
            })
           }
      },
      created() {
          this.cgAll()
      }
    }
</script>

<style>
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    /*-webkit-box-shadow: 0 1px 3px rgb(0 0 0  30%);*/
    /*box-shadow: 0 1px 3px rgb(0 0 0 30%);*/
    box-sizing: border-box;
    width: 70%;
  }
</style>
