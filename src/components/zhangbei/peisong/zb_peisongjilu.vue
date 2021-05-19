<template>
  <div>
    <el-table
      :data="peisongAll.filter(data => !search || data.peisongid.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="340"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand">
            <el-form-item label="配送订单号:">
              <span>{{ props.row.peisongid }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="配送订单号"
        prop="peisongid"
      >
      </el-table-column>
      <el-table-column
       label="配送人"
        prop="ygname">
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          {{scope.row.pzhuangtai=='z001'?'配送中':scope.row.pzhuangtai=='z002'?'待配送':scope.row.pzhuangtai=='z003'?'完成配送':''}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
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
          <el-button @click="queryuser(scope.row.pcid,scope.row.ygid)" type="primary">查看用户订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <label type="primary" style="float: left;margin-top: 20px;margin-left: 10px" >

    </label>
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
        :data="userddAll"
        style="width: 100%"
        height="220">
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
          label="商品总数量"
          prop="ucount"
        >
        </el-table-column>
        <el-table-column
          label="商户名称"
          prop="shname"
        >
        </el-table-column>
        <el-table-column
          label="存放地址"
          prop="shaddr"
        >
        </el-table-column>
        <el-table-column
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.wczhuangtai!='wc002'" @click="wcps(scope.row.uddid)" type="primary">
              完成配送
            </el-button>
            <span style="color: greenyellow" v-if="scope.row.wczhuangtai=='wc002'">
               配送已完成
            </span>
          </template>
        </el-table-column>
        <el-table-column
        >
          <template slot-scope="scope">
            <el-button @click="ckddsp(scope.row.uddid)" type="primary">
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
      <label style="float: left">用户订单数量：{{userddAll.length}}条</label>
    </el-dialog>


    <el-dialog  :visible.sync="usershopshow" title="用户购买商品">
      <el-table
        :data="usershop"
        style="width: 100%"
        height="280">
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
          label="购买数量"
          prop="scount"
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
      <label style="float: left">
        用户商品数量：{{usershop.length}}条
      </label>
    </el-dialog>


  </div>
</template>

<script>
    export default {
        name: "zb_peisongjilu",
      data(){
          return{
            total:0,
            pageNo:1,
            pageSize:5,
            search:"",
            userddshow:false,
            usershopshow:false,
            peisongAll:[],
            userddAll:[],
            usershop:[],
            sl:[],
            pcid:0,
            ygid:0.
          }
      },
      methods:{
          wc(){
            this.$axios.post("ps/wancheng.action?ygid="+this.ygid).then(value => {
                this.All()
            })
          },
          //完成配送
        wcps(uddid){
          var arr = [{pcid:this.pcid,uddid:uddid}]
          var zhi =  JSON.stringify(arr)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$axios.post("ps/wanchengpeisong.action",zhi,zfj).then(value => {
             this.queryuser(this.pcid,this.ygid)
              this.$notify({
                title:"提示",
                message: "配送成功",
                type: 'success',
                duration:1000
              })
             this.wc()
          })
        },
        ckddsp(uddid){
          this.usershopshow = true
          this.$axios.post("uddsh/sidAll.action?uddid="+uddid).then(value => {
            this.usershop = value.data
          })
        },
        queryuser(pcid,ygid){
          this.ygid = ygid
          this.pcid = pcid
          this.userddshow = true
          this.$axios.post("uddsh/pciduserAll.action?pcid="+pcid).then(value=>{
            this.userddAll  = value.data
          })
        },
        currentPage(value){
          this.pageNo = value
          this.All()
        },
          All(){
            var param =  new URLSearchParams()
            param.append("pageNo",this.pageNo)
            param.append("pageSize",this.pageSize)
            this.$axios.post("ps/All.action",param).then(value => {
              this.peisongAll = value.data.list
              this.total = value.data.total
            })
          }
      },
      created() {
          this.All()
      }
    }
</script>

<style>
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
    /*-webkit-box-shadow: 0 1px 3px rgb(0 0 0  30%);*/
    /*box-shadow: 0 1px 3px rgb(0 0 0 30%);*/
    box-sizing: border-box;
    width: 60%;
  }
</style>
