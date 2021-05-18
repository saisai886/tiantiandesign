<template>
    <div>
      <el-button @click="cltjshow=true" style="margin-left: 850px" type="primary">添加</el-button>
      <el-table
        :data="cheliangAll.filter(data => !search || data.clmz.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="编号:">
                <span>{{ props.row.clcid }}</span>
              </el-form-item>
              <el-form-item label="车辆车牌号:">
                <span>{{ props.row.clname }}</span>
              </el-form-item>
              <el-form-item label="车辆名称:">
                <span>{{props.row.clmz}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="编号"
          prop="clcid">
        </el-table-column>
        <el-table-column
          label="车辆车牌号"
          prop="clname">
        </el-table-column>
        <el-table-column
          label="车辆名称"
          prop="clmz">
        </el-table-column>
        <el-table-column
          label="车辆状态"
          prop="clzhuangtai">
          <template slot-scope="scope">
            {{scope.row.clzhuangtai=='x001'?'工作中':scope.row.clzhuangtai=='x002'?'空闲中':''}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="250px"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入车辆名称搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="clcj(scope.row.clcid)" type="primary">编辑</el-button>
            <el-button @click="clsc(scope.row.clcid)" type="primary">删除</el-button>
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
      <el-dialog :visible.sync="cltjshow" title="添加车辆"  width="370px">
        <div class="div1">
          <el-form ref="clAdd" :model="clAdd">
            <el-form-item label="车辆名称:">
              <el-input   placeholder="请输入车辆名称" type="text" v-model="clAdd.clmz"></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-left: 50px">
            <el-button @click="qrclAdd">确认</el-button>
            <el-button @click="cltjshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog :visible.sync="clxgshow" title="修改车辆"  width="370px">
        <div class="div1">
          <el-form ref="clupdate" :model="clupdate">
            <el-form-item label="车辆车牌号:">
              <el-input type="text" v-model="clupdate.clname"></el-input>
            </el-form-item>
            <el-form-item label="车辆名称:">
              <el-input type="text" v-model="clupdate.clmz"></el-input>
            </el-form-item>
            <el-form-item label="车辆状态:">
              <el-select v-model="clupdate.clzhuangtai">
                <el-option  label="工作中" value="x001">工作中</el-option>
                <el-option  label="空闲中" value="x002">空闲中</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="margin-left: 50px">
            <el-button @click="xgqr">确认</el-button>
            <el-button @click="clxgshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "zb_zheliangAll",
      data(){
          return{
            search:"",
            total:0,
            pageNo:1,
            pageSize:5,
            cheliangAll:[],
            clupdate:[],
            //添加
            cltjshow:false,
            clxgshow:false,
            clAdd:[]
          }
      },
      methods:{
          clsc(clcid){
            this.$confirm('删除该车辆, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post("cl/cldelete.action?clcid="+clcid).then(value => {
                if(value.data>=1) {
                  this.$notify({
                    title: "提示",
                    message: "删除成功",
                    type: 'success',
                    duration: 1000
                  });
                  this.clAll()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
        xgqr(){
          var param =  new URLSearchParams()
          param.append("clcid",this.clupdate.clcid)
          param.append("clname",this.clupdate.clname)
          param.append("clmz",this.clupdate.clmz)
          param.append("clzhuangtai",this.clupdate.clzhuangtai)
          this.$axios.post("cl/clupdate.action",param).then(value => {
            if(value.data>=1){
              this.$notify({
                title: "提示",
                message: "修改成功",
                type: 'success',
                duration: 1000
              });
              this.clAll()
              this.clxgshow = false
            }
          })
        },
        clcj(clcid){
          this.clxgshow = true
          this.$axios.post("cl/clupdateAll.action?clcid="+clcid).then(value => {
             this.clupdate = value.data
          })
        },
        qrclAdd(){
            if(this.clAdd.clmz=='' || this.clAdd.clmz==null || this.clAdd.clmz==undefined){
              this.$message({
                showClose: true,
                message: '车辆名称不能为空',
                type: 'error'
              });
              return false;
            }
          var param =  new URLSearchParams()
          param.append("clmz",this.clAdd.clmz)
          this.$axios.post("cl/clinsert.action",param).then(value => {
                if(value.data>=1){
                  this.$notify({
                    title: "提示",
                    message: "添加成功",
                    type: 'success',
                    duration: 1000
                  });
                  this.clAll()
                  this.clAdd = []
                  this.cltjshow = false
                }
          })
        },
        currentPage(value){
          this.pageNo = value
          this.clAll()
        },
          clAll(){
           var param =   new URLSearchParams()
            param.append("pageNo",this.pageNo)
            param.append("pageSize",this.pageSize)
            this.$axios.post("cl/clAll.action",param).then(value => {
                this.cheliangAll  =  value.data.list
                this.total =  value.data.total
            })
          }
      },created() {
          this.clAll()
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
