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
          <el-radio   :value="scope.row.cdzhuangtai" @change="dd1(scope.row.gsid)" label="cd003">不通过</el-radio>
          <el-radio   :value="scope.row.cdzhuangtai" @change="dd(scope.row.gsid)"  label="cd001">通过</el-radio>
        </template>
      </el-table-column>
    </el-table>
    说明：
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">确 定</el-button>
    <el-button @click="dialogTableVisible = false">取 消</el-button>
  </span>
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
      radio:"cd003",//单选框
      itemzhuantai:"",//当前选择订单的id
      textarea: ''
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
      this.itemzhuantai=item
      this.dialogTableVisible=true
     var para= new URLSearchParams();
      para.append("cgid",item)

      this.$axios.post("/supcaigo/selectListAllId.action",para).then(function (value) {
         _this.gridData=value.data

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
    dd(e){ //修改状态商品的审核状态
     var _this =this
     var params=new URLSearchParams()
      params.append("gsid",e)

     this.$axios.post("/supcaigo/supupdataid.action",params).then(function (value) {
        _this.open1(_this.itemzhuantai) //

     }).catch(function (ecrroe) {
          alert("错误异常")
     })

    },
    dd1(e){
      var _this =this
      var params=new URLSearchParams()
      params.append("gsid",e)

      this.$axios.post("/supcaigo/supupdataidNO.action",params).then(function (value) {
        _this.open1(_this.itemzhuantai) //

      }).catch(function (){
        alert("错误异常")
      })

    },
    ok(){
      var _this =this
      this.dialogTableVisible=false
      var params=new URLSearchParams()
      params.append("id",this.itemzhuantai)
      params.append("textarea",this.textarea)
      this.$axios.post("/supcaigo/Supsum.action",params).then(function (value) {
       _this.caigochaxu()

      }).catch(function (){
        alert("错误异常")
      })

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
