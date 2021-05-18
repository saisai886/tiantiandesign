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
        width="300"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        width="300"
      >
        <template slot-scope="scope">
          {{scope.row.pzhuangtai=='z001'?'配送中':scope.row.pzhuangtai=='z002'?'待配送':scope.row.pzhuangtai=='z003'?'完成配送':''}}
        </template>
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
          <el-button @click="queryuser(scope.row.pcid)" type="primary">查看用户订单</el-button>
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
      </el-table>
      <div style="margin-left: 600px;margin-top: 20px;">
        <el-button @click="userddshow=false" type="primary">
          取消
        </el-button>
      </div>
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
            peisongAll:[],
            userddAll:[]
          }
      },
      methods:{
        queryuser(pcid){
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
              console.log(value.data.list)
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

</style>
