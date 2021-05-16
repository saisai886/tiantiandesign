<template>
    <div>
      <el-button @click="tj" style="margin-left: 850px" type="primary">添加</el-button>
      <el-table
        :data="tableData.filter(data => !search || data.zname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand" :rules="rules">
              <el-form-item label="职位编号:">
                <span>{{ props.row.zid }}</span>
              </el-form-item>
              <el-form-item label="职位名称:">
                <span>{{ props.row.zname }}</span>
              </el-form-item>
              <el-form-item label="员工:">
                <span v-for="y in yg">{{y.ygid==props.row.ygid?y.ygname:''}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="职位编号"
          prop="zid">
        </el-table-column>
        <el-table-column
          label="职位名称"
          prop="zname">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250px"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入职位名称搜索"/>
          </template>
          <template slot-scope="props">
            <el-button @click="zwbjAll(props.row.zid)" type="primary">编辑</el-button>
            <el-button @click="zwsc(props.row.zid)"   type="primary">删除</el-button>
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

      <!--添加-->
      <el-dialog :visible.sync="zwtjshow" title="添加职位"  width="370px">
        <div class="div1">
          <el-form  label-width="80px" :model="formzwAdd">
            <el-form-item label="职位名称:" prop="name">
              <el-input placeholder="请输入职位名称" v-model="formzwAdd.zname"></el-input>
            </el-form-item>
            <el-form-item label="员工:">
              <el-select  v-model="formzwAdd.ygid" clearable placeholder="请选择">
                <el-option
                  v-for="item in yg"
                  :label="item.ygname"
                  :value="item.ygid"
                >
                </el-option><br>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="margin-left: 50px">
            <el-button @click="zwtj">确认</el-button>
            <el-button @click="zwtjshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog :visible.sync="zwupdateshow" title="修改职位"  width="370px">
          <el-form ref="formzwupdate" :model="formzwupdate" >
            <el-form-item label="职位编号:">
              <el-input disabled type="text" v-model="formzwupdate.zid"></el-input>
            </el-form-item>
            <el-form-item label="职位名称:">
              <el-input type="text" v-model="formzwupdate.zname"></el-input>
            </el-form-item>
            <el-form-item label="职位名称:">
              <el-select  v-model="formzwupdate.ygid" clearable placeholder="请选择">
                <el-option
                  v-for="item in yg"
                  :label="item.ygname"
                  :value="item.ygid"
                >
                </el-option><br>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="margin-left: 50px">
            <el-button @click="zwupdateqr">确认</el-button>
            <el-button @click="zwupdateshow=false">取消</el-button>
          </div>
      </el-dialog>
    </div>
</template>

<script>

    export default {
      data(){
          return{
            yg:[],
            formzwAdd:[],
            formzwupdate:[],
            zwupdateshow:false,
            zwtjshow:false,
            tableData:[],
            search:"",
            pageNo:1,
            pageSize:5,
            total:0,
          }
      },
      methods:{
        tj(){
          this.zwtjshow = true
          this.formzwAdd = []
          this.yglist()
        },
        yglist(){
          this.$axios.post("ygdl/yglist.action").then(value => {
            this.yg = value.data
          })
        },
        zwupdateqr(){
          var zhi = JSON.stringify(this.formzwupdate)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$axios.post("zw/zwupdate.action",zhi,zfj).then(value => {
            if(value.data>=1) {
              this.$notify({
                title: "提示",
                message: "修改成功",
                type: 'success',
                duration: 1000
              });
              this.zwupdateshow = false
              this.zwAll()
            }
          })
        },
        zwbjAll(zid){
          this.zwupdateshow = true
          this.$axios.post("zw/zwupdateAll.action?zid="+zid).then(value => {
            this.formzwupdate = value.data
            this.yglist()
          })
        },
        zwsc(zid){
          this.$confirm('删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("zw/zwdelete.action?zid="+zid).then(value => {
              if(value.data>=1) {
                this.$notify({
                  title: "提示",
                  message: "删除成功",
                  type: 'success',
                  duration: 1000
                });
                this.zwAll()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
        },
        zwtj(){
          if(this.formzwAdd.zname==undefined){
            this.$message({
              showClose: true,
              message: '职位不能为空',
              type: 'error'
            });
            return false
          }
          if(this.formzwAdd.ygid==undefined){
            this.$message({
              showClose: true,
              message: '请选择员工',
              type: 'error'
            });
            return false
          }
          var param =  new URLSearchParams()
          param.append("ygid",this.formzwAdd.ygid)
          param.append("zname",this.formzwAdd.zname)
          this.$axios.post("zw/zwAdd.action",param).then(value => {
            this.zwtjshow = false
            if(value.data==true) {
              this.$notify({
                title: "提示",
                message: "添加成功",
                type: 'success',
                duration: 1000
              });
              this.formzwAdd = []
              this.zwtjshow = false
             this.zwAll()
            }
          })

        },
        currentPage(val){
          this.pageNo = val
          this.zwAll()
        },
        zwAll(){
          var param = new URLSearchParams()
          param.append("pageNo",this.pageNo)
          param.append("pageSize",this.pageSize)
          this.$axios.post("zw/zwAll.action",param).then(value => {
            this.tableData = value.data.list
            this.total = value.data.total
            this.yglist()
          })
        }
      },
      created() {
        this.zwAll()
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
</style>
