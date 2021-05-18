<template>
    <div>
      <el-table
        :data="sppeisong.filter(data => !search || data.peisongid.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        height="340"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="配送订单号:">
                <span>{{ props.row.peisongid }}</span>
              </el-form-item>
              <el-form-item label="配送人:">
                <span>{{ props.row.ygname }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="100">
        </el-table-column>
        <el-table-column
          label="配送订单号"
          prop="peisongid"
          width="300"
        >
        </el-table-column>
        <el-table-column
          label="配送人"
          prop="ygname"
          width="300"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="200"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入配送订单号搜索"/>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button @click="ckuser(scope.row.pcid)" type="primary">查看用户订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="queren" type="primary" style="float: left;margin-top: 20px" >
        确认发货
      </el-button>

      <el-pagination
        style="margin:25px 0px 0px -150px"
        background
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total"
        @current-change="currentPage">
      </el-pagination>


      <el-dialog  :visible.sync="userddshow" title="用户订单">
        <el-table
          :data="userdd"
          style="width: 100%"
          height="280">
          <el-table-column
            label="订单号"
            prop="udddingdan"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="下单用户"
            prop="uname"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="商品总数量"
            prop="ucount"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button @click="ckddsp(scope.row.spsid)" type="primary">
                查看订单商品
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-left: 600px;margin-top: 20px;">
          <el-button @click="userddshow=false" type="primary">
            取消
          </el-button>
        </div>
      </el-dialog>


      <el-dialog  :visible.sync="usershopshow" title="用户购买商品">
        <el-table
          :data="usershop"
          style="width: 100%"
          height="200">
          <el-table-column
            label="商品名"
            prop="sname"
          >
          </el-table-column>
          <el-table-column
            label="价格"
            prop="sprice"
          >
          </el-table-column>
          <el-table-column
            label="图片"
          >
            <template slot-scope="scope">
            <img width="50" height="50" :src="'http://localhost:8090/tian/'+scope.row.simg">
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-left: 600px;margin-top: 20px;">
          <el-button @click="usershopshow=false" type="primary">
            取消
          </el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "zb_shoppeisong",
      data(){
          return{
            total:0,
            pageNo:1,
            pageSize:20,
            search:"",
            userddshow:false,
            usershopshow:false,
            sppeisong:[],
            userdd:[],
            usershop:[],
            na:[]
          }
      },
      methods:{
        queren(){
          if(this.na.length==0){
            this.$message({
              showClose: true,
              message: '请选择配送订单',
              type: 'error'
            });
            return false;
          }
           var arr = JSON.stringify(this.na)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$confirm('是否发货, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("ps/faihuo.action",arr,zfj).then(value => {
              if(value.data>=1){
                this.$notify({
                  title:"提示",
                  message: "成功",
                  type: 'success',
                  duration:1000
                })
                this.sppeisongAll()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });

        },
        handleSelectionChange(value){
          this.na = value
        },
        ckddsp(sid){
          this.usershopshow = true
          this.$axios.post("uddsh/sidAll.action?sid="+sid).then(value => {
            this.usershop = value.data
          })
        },

        ckuser(pcid){
          this.userddshow = true
          this.$axios.post("uddsh/pciduserAll.action?pcid="+pcid).then(value=>{
            this.userdd  = value.data
          })
        },
        currentPage(value){
          this.pageNo = value
          this.sppeisongAll()
        },
          sppeisongAll(){
            var param =  new URLSearchParams()
            param.append("pageNo",this.pageNo)
            param.append("pageSize",this.pageSize)
            this.$axios.post("spps/shoppeisongAll.action",param).then(value => {
              console.log(value.data.list)
              this.sppeisong = value.data.list
              this.total = value.data.total
            })
          }
      },
      created() {
          this.sppeisongAll()
      }
    }
</script>

<style>
  #but{

  }
  .el-table-filter {
    max-height: 300px;
    overflow: auto;
  }
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
  .div1{
    width: 270px;
  }
  .el-input el-input--mini{
    width: 100px;
  }
  .el-scrollbar__bar.is-vertical {
    opacity: 1;
    width: 5px;
  }

  .el-select-dropdown{
    max-width: 243px;
  }
  .el-select-dropdown__item{
    display: inline-block;
  }
  .el-select-dropdown__item span {
    min-width: 105px;
    display: inline-block;
  }
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    /* -webkit-box-shadow: 0 1px 3px rgb(0 0 0 30%); */
    box-sizing: border-box;
    width: 60%;
  }
</style>
