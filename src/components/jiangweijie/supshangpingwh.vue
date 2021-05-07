<template>
  <div>
  <el-table
    :data="tableData"
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
      label="图片"
    >
      <template slot-scope="scope">
        <img style="width: 52px;height: 80px" :src="scope.row.gsimg">
      </template>
    </el-table-column>




    <el-table-column
      label="操作">
      <template slot="header"  slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          @input="shuru"
          style="width: 200px"
          placeholder="输入关键字搜索"/>
      </template>


      <template slot-scope="scope">
        <el-button type="primary" @click="supshnaghw(scope.row.gsid)" >编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="supshangchu(scope.row.gsid)"></el-button>
      </template>
    </el-table-column>
    <el-table-column
    >
      <template slot="header" slot-scope="scope">
        <el-button  type="primary" @click="supshtianjia()">添加</el-button>
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
    <!--====-->
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
<!--         <input type="file" id="fileid"  @change="filess($event)"></input>-->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
            :on-change="filess"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </el-form-item>
        <el-form-item label="地址" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gschandi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产时间" style="width: 500px" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.gstime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保质期" style="width: 500px" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.gsbozhi"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="成本" style="width: 500px" :label-width="formLabelWidth">
          <el-input v-model="form.gschengben" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>



      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="open1()" >确定</el-button>
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
  message(){
      this.$message({
        message: '编辑成功',
        type: 'success'
      });
    },
    message1(){
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    open1() {

      this.dialogFormVisible = false
      var _this = this;

      var params=new URLSearchParams()

      params.append("gsid", this.form.gsid)
      params.append("gsname",this.form.gsname)
      params.append("gsprice",this.form.gsprice)
      params.append("gscount",this.form.gscount)
      params.append("gsmiaoshu",this.form.gsmiaoshu)
      params.append("gsimg",this.form.files)
      params.append("gstime",this.form.gstime)
      params.append("gschandi",this.form.gschandi)
      params.append("gsbozhi",this.form.gsbozhi)
      params.append("gschengben",this.form.gschengben)

      if(this.form.gsid!=undefined){
        console.log(this.form.gsid)
        this.$axios.post("/supplier/biangjixugai.action",params).then(function (value){
          _this.message()
          _this.chanxu();
        }).catch(function (succes){
          alert("编辑失败")
        })

      }else{
        var pa=new URLSearchParams()


        pa.append("gsname",this.form.gsname)
        pa.append("gsprice",this.form.gsprice)
        pa.append("gscount",this.form.gscount)
        pa.append("gsmiaoshu",this.form.gsmiaoshu)
        pa.append("gsimg",this.form.files)

        pa.append("gstime",this.form.gstime)
        pa.append("gschandi",this.form.gschandi)
        pa.append("gsbozhi",this.form.gsbozhi)
        pa.append("gschengben",this.form.gschengben)


        this.$axios.post("/supplier/tianjian.action",pa).then(function (value) {
          _this.message();
          _this.chanxu();

        }).catch(function (value) {
          alert("添加失败")
        })

      }


    },
    chanxu(){
      var _this=this;
      //获取后台图片和数据
      var params = new URLSearchParams();
      params.append("name",this.search);  //查询条件
      params.append("pageNo",this.pageno); //分页
      params.append("pageSize",5);

      this.$axios.post("/supplier/safeguard.action",params).then(function (value){
          _this.tableData = value.data.list.map(item => {
          item.gsimg = "http://localhost:8090/tian/img/"+item.gsimg;
          return item})

        _this.total=value.data.total

      }).catch()

    },
    filess(item,filet){ //文件添加赋值
       this.form.files=item.name

    },
    supshnaghw(item){
      var _this=this;
      var parms=new URLSearchParams()
      parms.append("id",item)
      this.$axios.post("/supplier/safeguardbianji.action",parms).then(function (value){
        _this.fileList=[]
        var d={name:value.data.gsimg,uid:0}  //自定义文件赋值
        _this.fileList.push(d)

        _this.form=value.data
        _this.dialogFormVisible = true
       console.log(_this.fileList)
      }).catch()


    },
    supshtianjia(){
      this.form={}
      this.fileList=[]
      this.dialogFormVisible = true
    },
    supshangchu(gs){
      var gsid=new URLSearchParams()
      gsid.append("gsid",gs)
      var _this=this;
      var con=confirm("确定删除吗？")
      if(con){
        this.$axios.post('/supplier/shangchu.action',gsid).then(function (value) {
          _this.message1()
          _this.chanxu();
        }).catch()
      }

    },
    shuru(){ //模糊查询，
      this.pageno=1
    this.chanxu()
    },
    currentchange(val){ //分页
      this.pageno=val;
      this.chanxu()
    }



  },
  data() {
    return {
      tableData:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '70px',
      search:"",
      show:false,
      fileList:[], //文件上传赋值
      total:0, //总页数
      pageno:1,

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
