<template>
    <div>
      <el-table
        :data="cgdanshengheAll"
        stripe
        style="width: 100%">
        <el-table-column
          prop="cgdan"
          label="采购单"
          width="220">
        </el-table-column>
        <el-table-column
          prop="yloginname"
          label="采购人"
          width="220">
        </el-table-column>
        <el-table-column
          prop="cgallmoney"
          label="总金额"
          width="220">
        </el-table-column>
        <el-table-column
          prop="cgtime"
          label="申请时间"
          width="220">
        </el-table-column>
        <el-table-column
          label="操作"
          width="220px">
          <template slot-scope="scope">
            <el-button type="primary" @click="shenghe(scope.row.cgid)">审核</el-button>
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


      <el-dialog :visible.sync="cgdanshengheshow" title="采购申请单审核" style="font-family: 新宋体">
        <div>
          <el-table
            :data="cgdanxxshengheAll"
            stripe
            style="width: 100%"
            height="250">
            <el-table-column
              prop="cgid"
              label="采购编号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="gname"
              label="供应商名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="gsname"
              label="商品名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="cdcoun"
              label="采购数量"
              width="120">
            </el-table-column>
            <el-table-column
              prop="cdxiaoji"
              label="小计"
              width="120">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.cdxxzhuangtai">
                <el-radio  label="cdxx001">通过</el-radio>
                <el-radio  label="cdxx002">不通过</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px;margin-left: 600px">
          <el-button type="primary" @click="qrshenghe">
            确认
          </el-button>
          <el-button type="primary" @click="cgdanshengheshow=false">
            关闭
          </el-button>
          </div>
          <span style="float: left">
           采购商品共:{{spzs}}条
          </span>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "zb_caigoushenghe",
      data(){
          return{
            templateRadio:false,
            cgdanshengheshow:false,
            cgdanxxshengheAll:[],
            cgdanshengheAll:[],
            pageNo:1,
            pageSize:5,
            total:0,
            spzs:0
          }
      },
      methods:{
        qrshenghe(){
          var arr = JSON.stringify(this.cgdanxxshengheAll)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$confirm('是否通过采购申请审核, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("cgxx/cgshengheupdate.action",arr,zfj).then(value => {
              if(value.data>=1){
                this.$notify({
                  title: "提示",
                  message: "操作成功",
                  type: 'success',
                  duration: 2000
                });
                this.cgshengheAll()
                this.cgdanshengheshow = false;
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消审核'
            });
          });


        },
        shenghe(cgid){
          this.cgdanshengheshow = true
          this.$axios.post("cgxx/cggAll.action?cgid="+cgid).then(value => {
            value.data.forEach(value=>{
              if(value.cdxxzhuangtai=="cdxx003"){
                value.cdxxzhuangtai = "cdxx001"
              }
            })
            this.cgdanxxshengheAll  = value.data
            this.spzs = value.data.length

          })
        },
        currentPage(value){
          this.pageNo = value
          this.cgshengheAll()
        },
        cgshengheAll(){
          var param =  new URLSearchParams();
          param.append("pageNo",this.pageNo)
          param.append("pageSize",this.pageSize)
          this.$axios.post("cg/cgAll.action",param).then(value => {
            this.cgdanshengheAll = value.data.list
            this.total  =  value.data.total
          })
        }
      },
      created() {
          this.cgshengheAll()
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
