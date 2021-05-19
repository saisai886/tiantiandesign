<template>
    <div>
          <el-table
            :data="userddAll.filter(data => !search || data.udddingdan.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            height="340"
            @select-all = "userddqx"
            @select="userddx"
            >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="right" inline class="demo-table-expand">
                  <el-form-item label="商品数量:">
                    <span>{{ props.row.ucount }}</span>
                  </el-form-item>
                  <el-form-item label="总金额:">
                    <span>{{ props.row.udspricesum }}</span>
                  </el-form-item>
                  <el-form-item label="配送地址:">
                    <span>{{props.row.shaddr}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="订单号"
              prop="udddingdan"
            >
            </el-table-column>
            <el-table-column
              label="下单用户"
              prop="uname"
              >
            </el-table-column>
            <el-table-column
              label="下单时间"
              prop="udtime"
              >
            </el-table-column>

            <el-table-column
              label="操作"

            >
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入订单号搜索"/>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button type="primary"  @click="cxddsp(scope.row.uddid)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="qr" type="primary" style="float: left;margin-top: 20px" >
            确认
          </el-button>

          <el-pagination
            style="margin:25px 0px 0px -150px"
            background
            :page-size="pageSize"
            :current-page="pageNo"
            :total="total"
            @current-change="currentPage">
          </el-pagination>


      <el-dialog  :visible.sync="userddshow" title="订单商品">
        <el-table
          :data="userspAll"
          style="width: 100%"
        height="200">
          <el-table-column
            prop="ucid"
            label="编号"
          >
          </el-table-column>
          <el-table-column
            prop="sname"
            label="商品名称"
         >
          </el-table-column>
          <el-table-column
            prop="sprice"
            label="商品价格"
          >
          </el-table-column>
          <el-table-column
            prop="scount"
            label="商品购买数量">
          </el-table-column>
        </el-table>
        <div>
          <el-button style="margin-top: 20px;margin-left: 600px" type="primary" @click="userddshow=false">
            取消
          </el-button>
        </div>
      </el-dialog>



      <el-dialog  :visible.sync="userddshow1" title="用户订单">
        <el-table
          :data="userddzhi"
          style="width: 100%"
          height="200">
          <el-table-column
            label="订单号"
            prop="udddingdan"
          >
          </el-table-column>
          <el-table-column
            label="下单用户"
            prop="uname"
          >
          </el-table-column>
        </el-table>

        <div style="margin-left: 600px;margin-top: 20px;">
          <el-button @click="qc" style="float: left;" type="primary">取消</el-button>
<!--          <el-button :style="y" @click="qr1" type="primary">-->
<!--            确认-->
<!--          </el-button>-->
          <el-button @click="scpeisongdan" type="primary">
            生成配送订单
          </el-button>
        </div>
      </el-dialog>


      <el-dialog :visible.sync="userddshow2" title="配送人员">
<!--        <el-select v-model="ygid" placeholder="请选择配送员工">-->
<!--          <el-option-->
<!--            v-for="item in yg"-->
<!--            :key="item.ygid"-->
<!--            :label="item.ygname"-->
<!--            :value="item.ygid">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--        <el-select v-model="clid" placeholder="请选择车辆">-->
<!--          <el-option-->
<!--            v-for="item in cl"-->
<!--            :key="item.clcid"-->
<!--            :label="item.clmz"-->
<!--            :value="item.clcid">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--        <div style="margin-top: 20px;margin-left: 500px">-->
<!--          <el-button @click="ygclqr" type="primary">-->
<!--            确认-->
<!--          </el-button>-->
<!--          <el-button  type="primary" @click="qc2">-->
<!--            取消-->
<!--          </el-button>-->
<!--        </div>-->
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "zb_peisong",
      data(){
          return{
            // y:'display:block;',
            // x:'display:none',
            userddshow2:false,
            userddshow1:false,
            userddshow:false,
            userddAll:[],
            userspAll:[],
            total:0,
            pageNo:1,
            pageSize:20,
            search:"",
            userddzhi:[],
            //获取选中的订单的值
            na:[],
            cl:[],
            yg:[],
            ygid:"请选择配送员工",
            clid:"请选择车辆",
            ygmz:"",
            clmz:"",
          }
      },
      methods:{
          //配送详细
        peisongxx(pcid){
          var zhi = []
          this.userddzhi.forEach(value=>{
            zhi.push({
              "pcid":pcid,
              "uddid":value.uddid
            })
          })
          var arr = JSON.stringify(zhi)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$axios.post("psxx/peisongxxinsert.action",arr,zfj).then(value => {
              if(value.data>=1){
                this.$notify({
                  title:"提示",
                  message: "成功",
                  type: 'success',
                  duration:1000
                })
               // this.ygid="请选择配送员工"
                // this.clid="请选择车辆"
                // this.y = 'display:block'
                // this.x = 'display:none'
                this.userddzhi = []
                this.userddshow1 = false
                this.uddAll()
              }
          })
        },
          // qc2(){
          //   //this.ygid="请选择配送员工"
          //   // this.clid="请选择车辆"
          //   this.userddshow2=false
          // },
          qc(){
            // this.ygmz = ""
            // this.clmz = ""
            // this.y = 'display:block'
            // this.x = 'display:none'
            this.userddshow1 = false
          },
        scpeisongdan(){
          this.$axios.post("ps/peisonginsert.action").then(value => {
             this.peisongxx(value.data)
          })
        },
          //选员工车辆确认
        // ygclqr(){
        // // && this.clid=="请选择车辆"
        //   if(this.ygid=="请选择配送员工" ){
        //     this.$message({
        //       showClose: true,
        //       message: '请选择员工',
        //       type: 'error'
        //     });
        //     return false;
        //   }
        //   this.yg.forEach(value => {
        //     if(value.ygid==parseInt(this.ygid)){
        //       this.ygmz = value.ygname
        //     }
        //   })
        //   this.cl.forEach(value => {
        //     if(value.clcid==parseInt(this.clid)){
        //       this.clmz = value.clmz
        //     }
        //   })
        //   this.y = 'display:none'
        //   this.x = 'display:block',
        //   this.userddshow2 = false;
        //
        // },
        // clAll(){
        //   this.$axios.post("cl/clpeisong.action").then(value=>{
        //     this.cl = value.data
        //   })
        // },
        ygAll(){
          this.$axios.post("ygdl/ygpeisong.action").then(value=>{
            this.yg = value.data
          })
        },
        // qr1(){
        //   this.userddshow2 = true
        //   // this.clAll()
        //   this.ygAll()
        // },
        qr(){
          if(this.na.length==0){
            this.$message({
              showClose: true,
              message: '请选择要配送订单',
              type: 'error'
            });
            return false;
          }

          this.userddzhi = this.na
          this.userddshow1 = true
        },
        cxddsp(uddid){
          this.userddshow = true
          this.$axios.post("uddsh/uspAll.action?uddid="+uddid).then(value => {
            this.userspAll = value.data
          })
        },
        userddqx(val){
          this.na = val
        },
        userddx(val){
          this.na = val
        },
        currentPage(value){
          this.pageNo = value
          this.uddAll()
        },
          uddAll(){
            var param = new URLSearchParams()
            param.append("pageNo",this.pageNo)
            param.append("pageSize",this.pageSize)
            this.$axios.post("uddsh/userddAll.action",param).then(value => {
              this.userddAll = value.data.list
              this.total = value.data.total
            })
          }
      },
      created() {
          this.uddAll()
      },
      filters:{
          yggr(value){
            return "配送员工："+value
          },
        clgr(value){
            return "车辆："+value
        }
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
