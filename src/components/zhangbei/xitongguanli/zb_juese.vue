<template>
    <div>
      <el-button @click="jsshow=true" style="margin-left: 850px" type="primary">添加</el-button>
      <el-table
        :data="tableData.filter(data => !search || data.rname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand" :rules="rules">
              <el-form-item label="角色编号:">
                <span>{{ props.row.rid }}</span>
              </el-form-item>
              <el-form-item label="角色名称:">
                <span>{{ props.row.rname }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.rdesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="角色编号"
          prop="rid">
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="rname">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="rdesc">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250px"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入角色名称搜索"/>
          </template>
          <template slot-scope="props">
            <el-button @click="bj(props.row.rid)"  type="primary">编辑</el-button>
            <el-button @click="sc(props.row.rid)"  type="primary">删除</el-button>
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
      <el-dialog :visible.sync="jsshow" title="添加员工"  width="370px">
        <div class="div1">
          <el-form ref="formjsAdd" :model="formjsAdd">
              <el-form-item label="角色名称:">
                <el-input placeholder="请输入角色名称" type="text" v-model="formjsAdd.rname"></el-input>
              </el-form-item>
            <el-form-item label="备注:">
              <el-input placeholder="请输入备注" type="textarea" v-model="formjsAdd.rdesc"></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-left: 50px">
            <el-button @click="jsqr">确认</el-button>
            <el-button @click="jsshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog :visible.sync="jsupdateshow" title="修改员工"  width="370px">
        <div class="div1">
          <el-form ref="formjsupdate" :model="formjsupdate">
            <el-form-item label="角色编号:">
              <el-input disabled type="text" v-model="formjsupdate.rid"></el-input>
            </el-form-item>
            <el-form-item label="角色名称:">
              <el-input placeholder="请输入角色名称" type="text" v-model="formjsupdate.rname"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input placeholder="请输入备注" type="textarea" v-model="formjsupdate.rdesc"></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-left: 50px">
            <el-button @click="jsqrupdate">确认</el-button>
            <el-button @click="jsupdateshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "zb_juese",
      data(){
          return{
            formjsupdate:[],
            formjsAdd:[],
            jsupdateshow:false,
            jsshow:false,
            search:"",
            tableData:[],
            pageNo:1,
            pageSize:5,
            total:0,
          }
      },
      methods:{
          sc(rid){
            this.$confirm('删除该角色, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post("js/jsdelete.action?rid="+rid).then(value=>{
                if(value.data>=1) {
                  this.$notify({
                    title: "提示",
                    message: "删除成功",
                    type: 'success',
                    duration: 1000
                  });
                  this.jsAll()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });


          },
        jsqrupdate(){
          var param =  new URLSearchParams()
          param.append("rid",this.formjsupdate.rid);
          param.append("rname",this.formjsupdate.rname);
          param.append("rdesc",this.formjsupdate.rdesc);
          this.$axios.post("js/jsupdate.action",param).then(value => {
            this.jsupdateshow = false
            if(value.data>=1) {
              this.$notify({
                title: "提示",
                message: "修改成功",
                type: 'success',
                duration: 1000
              });
              this.jsAll()
            }
          })
        },
          bj(rid){
            this.jsupdateshow = true
            this.$axios.post("js/jsupdateAll.action?rid="+rid).then(value => {
              this.formjsupdate = value.data
            })
          },
          jsqr(){
            var param = new URLSearchParams();
            param.append("rname",this.formjsAdd.rname);
            param.append("rdesc",this.formjsAdd.rdesc);
            this.$axios.post("js/jsAdd.action",param).then(value => {
              this.jsshow = false
              if(value.data>=1){
                this.$notify({
                  title: "提示",
                  message: "添加成功",
                  type: 'success',
                  duration:1000
                });
                this.formjsAdd = []
                this.jsAll()
              }
            }).catch(function () {
              alert("添加异常")
            })
          },
          jsAll(){
            var paras =  new URLSearchParams();
            paras.append("pageNo",this.pageNo)
            paras.append("pageSize",this.pageSize)
            this.$axios.post("js/jsAll.action",paras).then(value=>{
              this.tableData = value.data.list
              this.total = value.data.total
            })

          },
        currentPage(value){
            this.pageNo = value
            this.jsAll()
        }
      },
      created() {
          this.jsAll()
      }
    }
</script>

<style scoped>

</style>
