<template>
  <div>
  <el-table
    :data="tableData.filter(data => !search || data.gsname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.gsname }}</span>
          </el-form-item>
          <el-form-item label="价格">
            <span>{{ props.row.gsprice}}元</span>
          </el-form-item>
          <el-form-item label="存库数量">
            <span>{{ props.row.gscount}}</span>
          </el-form-item>
          <el-form-item label="成本">
            <span>{{ props.row.gschengben}}元</span>
          </el-form-item>
          <el-form-item label="生产时间">
            <span>{{ props.row.gstime}}</span>
          </el-form-item>
          <el-form-item label="保质期">
            <span>{{ props.row.gsbozhi}}</span>
          </el-form-item>
          <el-form-item label="生产地址">
            <span>{{ props.row.gschandi }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.gsmiaoshu }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="gsid">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="gsname">
    </el-table-column>
    <el-table-column
      label="价格"
      prop="gsprice">
    </el-table-column>




    <el-table-column
      label="操作">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          style="width: 200px"
          placeholder="输入关键字搜索"/>
      </template>

      <template slot-scope="scope">
        <el-button type="primary" @click="supshnaghw(scope.row.gsid)" >编辑</el-button>
        <el-button type="primary" @click="supshtianjia()">添加</el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--模态框-->

    <el-dialog title="商品维护" :visible.sync="dialogFormVisible" :modal="true">
      <el-form :model="form">
        <el-form-item label="商品名称" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gsprice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存库数量" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gscount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gsmiaoshu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" style="width: 500px" :label-width="formLabelWidth">
          <!-- 文件上传-->
         <input type="file"></input>

        </el-form-item>
        <el-form-item label="地址" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gschandi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产时间" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gstime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gsbozhi" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>



      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="open1" >确定</el-button>
      </div>
    </el-dialog>



  </div>




</template>

<script>
export default {
  name: "supshangpingwh",
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    open1() {
      this.$message({
        message: '编辑成功，这是一条成功消息',
        type: 'success'
      });
      this.dialogFormVisible = false
    },
    chanxu(){
      var _this=this;
      this.$axios.get("/supplier/safeguard.action").then(function (value){
        console.log(value)
        _this.tableData=value.data
      }).catch()

    },
    supshnaghw(item){
      var _this=this;
      var parms=new URLSearchParams()
      parms.append("id",item)
      this.$axios.post("/supplier/safeguardbianji.action",parms).then(function (value){
        _this.form=value.data
        _this.dialogFormVisible = true
      }).catch()


    },
    supshtianjia(){
      this.form=""
      this.dialogFormVisible = true

    }


  },
  data() {
    return {
      tableData:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {

      },
      formLabelWidth: '70px',
      search:""
    }
  },
  created() {
    this.chanxu()
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
