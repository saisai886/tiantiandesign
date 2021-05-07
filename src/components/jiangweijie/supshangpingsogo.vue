<template>
<div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="商品 ID"
        prop="cgdan">
      </el-table-column>
      <el-table-column
        label="平台"
        prop="cgcorporate">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="cgaddress">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="cgshentime">
      </el-table-column>

      <el-table-column
        label="操作"
       >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            @input="shuru"
            style="width: 200px"
            placeholder="输入关键字搜索"/>
        </template>

        <template slot-scope="scope">
            <el-button  @click="open1(scope.row.cgid)" size="small" type="success" round>审核</el-button>
        </template>

      </el-table-column>
    </el-table>



  <!--分页-->
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="5"
    :total="total"
    @current-change="currentchange"
  >
  </el-pagination>

  <!--模态框-->
  <el-dialog title="审核" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column property="gsid" label="ID" width="150"></el-table-column>
      <el-table-column property="gsname" label="商品" width="200"></el-table-column>
      <el-table-column property="gsprice" label="单价"></el-table-column>
      <el-table-column property="cdcoun" label="数量"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">

        </template>
      </el-table-column>
    </el-table>

  </el-dialog>


</div>

</template>

<script>
export default {
  name: "supshangpingsogo",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth:'70px',
      gridData:[],//模态框数据表格
      form:{},
      tableData:[],
      search:"",
      total:0, //总页数
      pageno:1,
      radio:"1"//单选框
    }
  },
  methods:{
    caigochaxu(){
      var _this=this

      var params=new URLSearchParams()
      params.append("name",this.search)
      params.append("pageNo",this.pageno)
      params.append("pageSize",5)
     this.$axios.post('/supcaigo/selectListAll.action',params).then(function (value){
       _this.tableData=value.data.list
       _this.total=value.data.total

     }).catch()

    },

    open1(item) {
      var _this=this;
      this.dialogTableVisible=true
     var para= new URLSearchParams();
      para.append("cgid",item)

      this.$axios.post("/supcaigo/selectListAllId.action",para).then(function (value) {
         _this.gridData=value.data

        console.log(value)

      }).catch()


    },
    open2() {
      this.$message({
        showClose: true,
        message: '审核不通过',
        type: 'warning'
      });
    },
    shuru(){
     this.caigochaxu()

    },
    currentchange(val){
      this.pageno=val;//分页
      this.caigochaxu()
    },
    togo(){
      alert("dd")
    }


  },
  created() {
    this.caigochaxu();
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
</style>
