<template>
    <div>
<!--      添加模态框-->
      <el-dialog title="仓库添加" :visible.sync="dialogFormVisible">
        <el-form :model="formData" :rules="rules" ref="formData">
          <el-form-item label="仓库名称"  prop="scname"  :label-width="formLabelWidth">
            <el-input v-model="formData.scname"  placeholder="请输入仓库名称"  style="width: 250px;float: left"  autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="仓库地址" prop="scaddr"   :label-width="formLabelWidth">
              <el-input  type="textarea"
                         :rows="2"
                         placeholder="请输入仓库地址"
                         v-model="formData.scaddr" style="width: 250px;float: left"  autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="na">确 定</el-button>

      </el-dialog>

      <!--      编辑模态框-->
      <el-dialog title="仓库修改" :visible.sync="dialogFormVisible2">
        <el-form :model="updateformData" :rules="rules" ref="updateformData">
          <el-form-item label="仓库名称"  prop="scname"  :label-width="formLabelWidth">
            <el-input v-model="updateformData.scname"  placeholder="请输入仓库名称"  style="width: 250px;float: left"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址" prop="scaddr"   :label-width="formLabelWidth">
            <el-input  type="textarea"
                       :rows="2"
                       placeholder="请输入仓库地址"
                       v-model="updateformData.scaddr" style="width: 250px;float: left"  autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>

      </el-dialog>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="scname"
          label="仓库名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="scaddr"
          label="仓库地址"
          width="180">
        </el-table-column>

        <el-table-column
          label="状态">
          <template scope="scope">
            <div :style="scope.row.sczhuangtai">
              {{scope.row.sczhuangtai=='0'?'可用':'不可用'}}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="scname"
              size="mini"
              style="width: 200px"
              placeholder="输入仓库名称搜索"
              @input="ss"
            />
            <el-button  @click="dialogFormVisible = true" type="success" >添加</el-button>
          </template>
          <template slot-scope="scope">
            <div v-if="scope.row.sczhuangtai==0">
            <el-button @click="handleEdit(scope.row.scid)" type="primary">编辑</el-button>
                <el-button @click="handleDelete(scope.row.scid)" type="danger">删除</el-button>
<!--            <el-button type="primary" icon="el-icon-search" @click="cx(scope.row.scid)">查询{{scope.row.scname}}商品</el-button>-->
            </div>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination layout="prev,pager,next"
                     background
                     :total="total"
                     :page-size="pageSize"
                     @current-change="fenye"
      >
      </el-pagination>



    </div>
</template>

<script>
    export default {
        name: "CangkuQuery",
      data() {
        return {
          scname:"",
          tableData: [],
          pageNo:1,
          pageSize:5,
          total:0,
          formData:{},
          updateformData:{
          },
          dialogFormVisible:false,
          dialogFormVisible2:false,
          formLabelWidth: '120px',
          scid:0,
          rules: {
            scname: [
              {required: true, message: '请输入仓库名称', trigger: 'blur'}
            ],
            scaddr: [
              {required: true, message: '请输入仓库地址', trigger: 'blur'}
            ]
          }

        }

      },
      methods:{
        getmenus(){
          var _this =this;
          var params = new URLSearchParams();
          params.append("scname",this.scname);  //查询条件
          params.append("pageNo",this.pageNo); //分页
          params.append("pageSize",5);
          this.$axios.post("cangku/cangkuShowPage.action",params).then(function (response) {
            _this.total=response.data.total
            _this.tableData = response.data.records;
          }).catch();
        },
        ss(){
          this.getmenus();
        },
        fenye(val){
          this.pageNo =val;
          this.getmenus();
        },
        na(){
          this.dialogFormVisible=false
          var _this = this;
          let Obj = JSON.stringify(this.formData);
          let config = {
            headers: {
              "Content-Type": "application/json;charsetset=UTF-8"
            },
          };
          this.$axios.post("cangku/cangkuInsert.action",Obj,config).then(function (response) {
            _this.formData=[]
            _this.getmenus();
            _this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }).catch();
        },
        handleEdit(scid){
         this.dialogFormVisible2=true
          this.scid=scid
          var _this =this;
          var params = new URLSearchParams();
          params.append("scid",this.scid);  //查询条件
          this.$axios.post("cangku/cangkuQueryId.action",params).then(function (response) {
              _this.updateformData=response.data
          }).catch();

        },
        update(){
            this.dialogFormVisible2=false
            var _this = this;
            let Obj = JSON.stringify(this.updateformData);
            let config = {
              headers: {
                "Content-Type": "application/json;charsetset=UTF-8"
              },
            };
            this.$axios.post("cangku/cangkuUpdate.action",Obj,config).then(function (response) {
              _this.updateformData=[]
              _this.getmenus();
              _this.$message({
                type: 'success',
                message: '修改成功!'
              });

            }).catch();
        },
        handleDelete(scid){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.scid=scid
            var _this =this;
            var params = new URLSearchParams();
            params.append("scid",scid);  //查询条件
            this.$axios.post("cangku/cangkuDeleteId.action",params).then(function (response) {
              _this.getmenus();
            }).catch();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        }
      },
      created() {
        this.getmenus();
      }
    }
</script>

<style scoped>

</style>
