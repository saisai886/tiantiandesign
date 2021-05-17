<template>
  <div>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
<!--        <el-table-column type="expand">-->
<!--          <template slot-scope="props">-->
<!--            <el-form label-position="left" inline class="demo-table-expand">-->
<!--              <el-form-item label="商品名称">-->
<!--                <span>{{ props.row.name }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="所属店铺">-->
<!--                <span>{{ props.row.shop }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商品 ID">-->
<!--                <span>{{ props.row.id }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="店铺 ID">-->
<!--                <span>{{ props.row.shopId }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商品分类">-->
<!--                <span>{{ props.row.category }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="店铺地址">-->
<!--                <span>{{ props.row.address }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="商品描述">-->
<!--                <span>{{ props.row.desc }}</span>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
    </template>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="5"
      :total="total"
      @current-change="currentchange"
    >
    </el-pagination>

<!--    模态框-->
      <el-dialog title="审核" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="gsid" label="ID" width="150"></el-table-column>
          <el-table-column property="gsname" label="商品" width="200"></el-table-column>
          <el-table-column property="gsprice" label="单价"></el-table-column>
          <el-table-column property="cdcoun" label="数量"></el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ok">通 过</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
      </el-dialog>


  </div>



</template>

<script>
export default {
  name: "supshangpingchuku",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: [],
      gridData:[],
      total:0, //总页数
      pageno:1,
      ChukuId:"",//查询采购的id
      search:""
    }
  },
  methods:{
    open1(item) {
      var _this=this;
      this.dialogTableVisible=true
      this.ChukuId=item
      var para= new URLSearchParams();
      para.append("cgid",item)

      this.$axios.post("/supcaigo/selectListAllIdchuku.action",para).then(function (value) {
        _this.gridData=value.data

          this.$message({
          showClose: true,
          message: '审核通过',
          type: 'success'
          });
      }).catch()


    },
    Supchukucx(){
      var _this=this

      var params=new URLSearchParams()
      params.append("name",this.search)
      params.append("pageNo",this.pageno)
      params.append("pageSize",5)
      this.$axios.post('/SupChuKu/SupChukuselect.action',params).then(function (value){
        console.log(value)
        _this.tableData=value.data.list
        _this.total=value.data.total


      }).catch(function (){
        alert("错误异常")
      })

    },currentchange(val){
      this.pageno=val
      this.Supchukucx();
    },shuru(){
      this.Supchukucx();
    },
    ok(){
      var _this=this
     var params=new  URLSearchParams()
       params.append("id",this.ChukuId)
      this.$axios.post('/SupChuKu/Supupdate.action',params).then(function (value){
        _this.dialogTableVisible = false
         _this.Supchukucx()

      }).catch(function (){
        alert("错误异常")
      })

    }
  },
  created() {
    this.Supchukucx();
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
