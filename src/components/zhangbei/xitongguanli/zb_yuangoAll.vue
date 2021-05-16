<template>
    <div>
      <el-button @click="tjshow=true" style="margin-left: 850px" type="primary">添加</el-button>
      <el-table
        :data="yg.filter(data => !search || data.ygname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand" :rules="rules">
              <el-form-item label="员工性别:">
                <span>{{ props.row.ygsex }}</span>
              </el-form-item>
              <el-form-item label="联系电话:">
                <span>{{ props.row.ygphone }}</span>
              </el-form-item>
              <el-form-item label="年龄:">
                <span>{{ props.row.ygage }}</span>
              </el-form-item>
              <el-form-item label="时间:">
                <span>{{ props.row.ygtime }}</span>
              </el-form-item>
              <el-form-item label="员工状态:">
                <span>{{props.row.ygzhuangtai=="a001"?"请假":(props.row.ygzhuangtai=="a002"?"在线":(props.row.ygzhuangtai=="a003"?"空闲":""))}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="员工ID"
          prop="ygid">
        </el-table-column>
        <el-table-column
          label="员工名称"
          prop="ygname">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250px"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入员工名称搜索"/>
          </template>
          <template slot-scope="props">
            <el-button @click="bj(props.row.ygid)" type="primary">编辑</el-button>
            <el-button @click="sc(props.row.ygid)" type="primary">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin:25px 0px 0px -150px"
        background
        :page-size="pageSize"
        :current-page="pages"
        :total="total"
        @current-change="currentPage">
      </el-pagination>


<!--      添加-->
      <el-dialog :visible.sync="tjshow" title="添加员工"  width="370px">
        <div class="div1">
          <el-form ref="formygAdd" :model="formygAdd">
            <div :style=dis1>
              <el-form-item label="员工姓名:">
                <el-input placeholder="请输入员工姓名" type="text" v-model="formygAdd.ygname"></el-input>
              </el-form-item>
              <el-form-item label="员工性别:">
                <el-radio-group v-model="formygAdd.ygsex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="登录名:" >
                <el-input placeholder="请输入员工登录名"  v-model="formygAdd.yloginname"></el-input>
              </el-form-item>
              <el-form-item label="登录密码:">
                <el-input placeholder="请输入员工登录密码" type="password" v-model="formygAdd.ygpwd"></el-input>
              </el-form-item>
            </div>
            <div :style="dis2">
              <el-form-item label="联系电话:" >
                <el-input placeholder="请输入联系电话" v-model="formygAdd.ygphone"></el-input>
              </el-form-item>
              <el-form-item label="员工年龄:">
                <el-input placeholder="请输入年龄" v-model="formygAdd.ygage"></el-input>
              </el-form-item>
            </div>
          </el-form>

          <div style="margin-left: 50px">
        <el-button @click="tjqr">确认</el-button>
        <el-button @click="qx">取消</el-button>
          </div>
          </div>
        <span  @click="syy" style="float: left;" class="el-icon-back"></span>
        <span  @click="xyy" style="float: right;" class="el-icon-right"></span>
      </el-dialog>

      <!--      编辑-->
      <el-dialog :visible.sync="bjshow" title="修改员工信息"  width="370px">
        <div class="div1">
          <el-form :model="formygupdate">
              <el-form-item label="员工姓名:">
                <el-input type="text" v-model="formygupdate.ygname"></el-input>
              </el-form-item>
              <el-form-item label="员工性别:">
                <el-radio-group v-model="formygupdate.ygsex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系电话:" >
                <el-input  v-model="formygupdate.ygphone"></el-input>
              </el-form-item>
              <el-form-item label="员工年龄:">
                <el-input v-model="formygupdate.ygage"></el-input>
              </el-form-item>
            <el-form-item label="员工状态:">
              <el-select style="height: 100px"  v-model="formygupdate.ygzhuangtai" placeholder="请选择">
                <el-option label="请假" value="a001"></el-option><br>
                <el-option label="在线" value="a002"></el-option><br>
                <el-option label="空闲" value="a003"></el-option><br>
              </el-select>
            </el-form-item>

          </el-form>

          <div style="margin-left: 50px">
            <el-button @click="bjqr">确认</el-button>
            <el-button @click="bjshow=false">取消</el-button>
          </div>
        </div>
        <span  @click="syy" style="float: left;" class="el-icon-back"></span>
        <span  @click="xyy" style="float: right;" class="el-icon-right"></span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
       data(){
         return{
           formygupdate:[],
           bjshow:false,
           sex:'男',
           dis1:'display:block',
           dis2:'display:none',
           labelPosition: 'left',
           formygAdd:[],
           tjshow:false,
           search:"",
           yg:[],
           total:0,
           pages:1,
           pageSize:5,
         }
       },
      methods:{
        //编辑
        bjqr(){
          var params = new URLSearchParams()
          params.append("ygid",this.formygupdate.ygid)
          params.append("ygname",this.formygupdate.ygname)
          params.append("ygsex",this.formygupdate.ygsex)
          params.append("ygphone",this.formygupdate.ygphone)
          params.append("ygage",this.formygupdate.ygage)
          params.append("ygzhuangtai",this.formygupdate.ygzhuangtai)
          this.$axios.post("ygdl/ygupdate.action",params).then(value => {
            if(value.data>=1){
              this.$notify({
                title:"提示",
                message: "修改成功",
                type: 'success',
                duration:1000
              })
            }
            this.bjshow = false
            this.ygAll()
          })
        },
         bj(ygid){
           this.bjshow = true
           this.$axios.post("ygdl/ygupdateAll.action?ygid="+ygid).then(value => {
               this.formygupdate = value.data
           })
         },
         qx(){
           this.formygAdd = []
           this.tjshow = false
           this.dis1='display:block',
             this.dis2='display:none'
         },
        //添加
        tjqr(){
          if(this.formygAdd.yloginname==undefined){
            this.$message({
              showClose: true,
              message: '账号不能为空',
              type: 'error'
            });
            return false;
          }
          if(this.formygAdd.ygpwd==undefined){
            this.$message({
              showClose: true,
              message: '密码不能为空',
              type: 'error'
            });
            return false;
          }
          this.tjyz()
          var params = new URLSearchParams()
          params.append("ygname",this.formygAdd.ygname)
          params.append("ygsex",this.formygAdd.ygsex)
          params.append("ygphone",this.formygAdd.ygphone)
          params.append("ygage",this.formygAdd.ygage)
          params.append("yloginname",this.formygAdd.yloginname)
          params.append("ygpwd",this.formygAdd.ygpwd)

          this.$axios.post("ygdl/ygAdd.action",params).then(value => {
            if(value.data>=1){
              this.$notify({
                title:"提示",
                message: "添加成功",
                type: 'success',
                duration:1000
              })
              this.formygAdd =  []
            }
            this.tjshow = false
            this.ygAll()
          })
        },
        xyy(){
          this.dis1 = 'display:none'
          this.dis2 = 'display:block'
        },
        syy(){
          this.dis1 = 'display:block'
          this.dis2 = 'display:none'
        },
        //删除
         sc(ygid){
             this.$confirm('删除该员工, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$axios.post("ygdl/ygsc.action?ygid="+ygid).then(value => {
                 if(value.data==true) {
                   this.$message({
                     type: 'success',
                     message: '删除成功!'
                   });
                   this.ygAll();
                 }
               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消删除'
               });
             });


         },
         ygAll(){
           var param =  new URLSearchParams();
           param.append("pageNo",this.pages);
           param.append("pageSize",this.pageSize);
           this.$axios.post("ygdl/ygAll.action",param).then(value => {
              this.yg = value.data.list
              this.total =  value.data.total
           })
         },
        currentPage(val){
           this.pages = val
           this.ygAll()
        },
        tjyz(){
          if(this.formygAdd.ygname==undefined){
            this.$message({
              showClose: true,
              message: '员工名称不能为空',
              type: 'error'
            });
            return false;
          }
          if(this.formygAdd.ygsex==undefined){
            this.$message({
              showClose: true,
              message: '员工性别不能为空',
              type: 'error'
            });
            return false;
          }
          if(this.formygAdd.ygphone==undefined){
            this.$message({
              showClose: true,
              message: '员工联系电话不能为空',
              type: 'error'
            });
            return false;
          }
          if(this.formygAdd.ygage==undefined){
            this.$message({
              showClose: true,
              message: '员工年龄不能为空',
              type: 'error'
            });
            return false;
          }
        }
      },
      created() {
        this.ygAll()
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
  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 13px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

</style>
