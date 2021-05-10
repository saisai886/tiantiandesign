<template>
    <div>
      <el-collapse v-model="activeName" accordion>
        <el-button style="margin-left: 850px" @click="tjshow=true" type="primary">添加</el-button>
        <el-collapse-item title="菜单一级查询" name="1">
            <el-table
              :data="tableData.filter(data => !search || data.permissionName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form  label-position="left" inline class="demo-table-expand">
                    <el-form-item label="菜单编号:" >
                      <span>{{props.row.pid}}</span>
                    </el-form-item>
                    <el-form-item label="名称:">
                      <span>{{ props.row.permissionName }}</span>
                    </el-form-item>
                    <el-form-item label="图标:">
                      <span :class="props.row.iconUrl"></span>
                    </el-form-item>
                    <el-form-item label="有无子级:">
                <span v-for="tab in props.row.permissions">
                  {{"["+tab.permissionName+"]"}}
                </span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column
                label="菜单ID"
                prop="pid">
              </el-table-column>
              <el-table-column
                label="菜单名称"
                prop="permissionName">
              </el-table-column>
              <el-table-column
                label="操作"
                width="250px"
              >
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入菜单名称搜索"/>
                </template>
                <template slot-scope="props">
                  <el-button @click="bjupdate(props.row.pid,props.row.pisnavi)"  type="primary">编辑</el-button>
                  <el-button @click="scfzhi(props.row.pid)" type="primary">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
            style="margin:25px 0px 0px -150px"
            background
            :page-size="pageSize"
            :current-page="pageNO"
            :total="total"
             @current-change="currentPage">
          </el-pagination>

        </el-collapse-item>


        <el-collapse-item  title="菜单二级查询" name="2">
            <el-table
              :data="tableData1.filter(data => !search || data.permissionName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form  label-position="left" inline class="demo-table-expand">
                    <el-form-item label="菜单编号:" >
                      <span>{{props.row.pid}}</span>
                    </el-form-item>
                    <el-form-item label="名称:">
                      <span>{{ props.row.permissionName }}</span>
                    </el-form-item>
                    <el-form-item label="图标:">
                      <span :class="props.row.iconUrl"></span>
                    </el-form-item>
                    <el-form-item label="有无子级:">
                <span v-for="tab in props.row.permissions">
                  {{"["+tab.permissionName+"]"}}
                </span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column
                label="菜单ID"
                prop="pid">
              </el-table-column>
              <el-table-column
                label="菜单名称"
                prop="permissionName">
              </el-table-column>
              <el-table-column
                label="操作"
                width="250px"
              >
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入菜单名称搜索"/>
                </template>
                <template slot-scope="props">
                  <el-button @click="bjupdate(props.row.pid,props.row.pisnavi)" type="primary">编辑</el-button>
                  <el-button @click="scfzhi(props.row.pid)" type="primary">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
            style="margin:25px 0px 0px -150px"
            background
            :page-size="pageSize"
            :current-page="pageNO"
            :total="total1"
            @current-change="currentPage1">
          </el-pagination>
        </el-collapse-item>
        <el-collapse-item title="菜单三级查询" name="3">
            <el-table
              :data="tableData2.filter(data => !search || data.permissionName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form  label-position="left" inline class="demo-table-expand">
                    <el-form-item label="菜单编号:" >
                      <span>{{props.row.pid}}</span>
                    </el-form-item>
                    <el-form-item label="名称:">
                      <span>{{ props.row.permissionName }}</span>
                    </el-form-item>
                    <el-form-item label="图标:">
                      <span>无</span>
                    </el-form-item>
                    <el-form-item label="有无子级:">
                <span>
                 无
                </span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column
                label="菜单ID"
                prop="pid">
              </el-table-column>
              <el-table-column
                label="菜单名称"
                prop="permissionName">
              </el-table-column>
              <el-table-column
                label="操作"
                width="250px"
              >
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入菜单名称搜索"/>
                </template>
                <template slot-scope="props">
                  <el-button @click="bjupdate(props.row.pid,props.row.pisnavi)" type="primary">编辑</el-button>
                  <el-button @click="scfzhi(props.row.pid)" type="primary">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
            style="margin:25px 0px 0px -150px"
            background
            :page-size="pageSize"
            :current-page="pageNO"
            :total="total2"
            @current-change="currentPage2">
          </el-pagination>
        </el-collapse-item>
      </el-collapse>



       <!--删除-->
      <el-dialog :visible="show" title="是否确定删除?">
        <el-button @click="qr">确认</el-button>
        <el-button @click="show=false">取消</el-button>
      </el-dialog>

      <!--添加-->
      <el-dialog :visible="tjshow" title="添加权限" width="370px" >
        <div class="div1">
          <div class="div">
            <el-form :label-position="labelPosition"  label-width="80px" :model="formAdd">
              <el-form-item label="权限名称:" prop="name">
                <el-input v-model="formAdd.name"></el-input>
              </el-form-item>
              <el-form-item label="菜单级别:">
                <el-select  @change="cdjb" v-model="formAdd.value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="父级:">
                <el-select  v-model="formAdd.valuefj" clearable placeholder="请选择">
                  <el-option
                    v-for="item in fjoptions"
                      :key="item.pid"
                    :label="item.permissionName"
                    :value="item.pid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button @click="qrAdd()">确认</el-button>
            <el-button @click="tjshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>


      <!--修改-->
      <el-dialog :visible="updateshow" title="修改权限" width="370px" >
        <div class="div1">
          <div class="div">
            <el-form :label-position="labelPosition"  label-width="80px" :model="formupdate">
              <el-form-item label="权限编号:">
                <el-input disabled v-model="formupdate.pid"></el-input>
              </el-form-item>
              <el-form-item label="权限名称:">
                <el-input v-model="formupdate.permissionName"></el-input>
              </el-form-item>
              <el-form-item label="父级:">
                <el-select style="height: 100px"  v-model="formupdate.parentid" clearable placeholder="请选择">
                  <el-option
                    v-for="item in updatepotin"
                    :key="item.pid"
                    :label="item.permissionName"
                    :value="item.pid==formupdate.parentid?item.pid:item.pid">
                  </el-option>
                  <br>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button @click="xgqr()">确认</el-button>
            <el-button @click="updateshow=false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          //修改
          formupdate:{},
          updatepotin:[],
          //添加
          labelPosition: 'right',
          formAdd: {
            name: '',
            value: '',
            valuefj: ''
          },
          options: [{
            value: "-1",
            label: "父级菜单"
          }, {
            value: "0",
            label: "二级菜单"
          },
            {
              value: "1",
              label: "三级菜单"
            }],
          fjoptions: [],
          //模态框
          updateshow:false,
          tjshow: false,
          show: false,
          //查询
          total: 0,
          total1: 0,
          total2: 0,
          search: "",
          activeName: "1",
          tableData: [],
          tableData1: [],
          tableData2: [],
          pageNO: 1,
          pageSize: 5,
          scpid1: 0,
         }
        },
      methods:{
        //修改
        xgqr(){
          var param = new URLSearchParams();
          param.append("pid",this.formupdate.pid)
          param.append("parentid",this.formupdate.parentid)
          param.append("permissionName",this.formupdate.permissionName)
          this.$axios.post("qx/qxupdate.action",param).then(value => {
            this.updateshow = false
            if(value.data==true){
              this.$notify({
                title: "提示",
                message: "修改成功",
                type: 'success',
                duration:1000
              });
              this.cdAll()
            }
          })
        },
        bjupdate(pid,pisnavi){
          this.updateshow = true
          this.$axios.post("qx/updatecheck.action?pid="+pid).then(val=>{
            this.formupdate = val.data
            this.$axios.post("qx/updateList.action?pisnavi="+pisnavi).then(value => {
              this.updatepotin = value.data
            })
          })

        },
        //添加
        qrAdd(){
          if(this.formAdd.name==''){
            this.$message({
              showClose: true,
              message: '不能为空·',
              type: 'error'
            });
            return
          }
          var param = new URLSearchParams();
          param.append("permissionName",this.formAdd.name)
          param.append("pisnavi",this.formAdd.value)
          param.append("parentid",this.formAdd.valuefj=="请选择"?"0":this.formAdd.valuefj)
          this.$axios.post("qx/cdtj.action",param).then(value =>  {
            if(value.data>=1){
              this.tjshow = false
              this.formAdd.name = ''
              this.formAdd.value = ''
              this.formAdd.valuefj = ''
              this.$notify({
                title: "提示",
                message: "添加成功",
                type: 'success',
                duration:1000
              });
              this.cdAll()
            }
          }).catch();
        },
        cdjb(){
          if(this.formAdd.value=="-1"){
           this.fjoptions.length = []
            this.formAdd.valuefj  = "请选择"
            return
          }
          this.$axios.post("qx/cdjb.action?pisnavi="+this.formAdd.value).then(value=>{
            this.fjoptions = value.data
            this.formAdd.valuefj  = "请选择"
          })
        },
        //删除传pid赋给scpid1
        scfzhi(val){
         this.scpid1 = val
         this.show = true
        },
        qr(){
          var param =  new URLSearchParams();
          param.append("pid",this.scpid1);
          this.$axios.post("qx/cdsc.action",param).then(val=>{
            this.show=false
            this.cdAll()
            if(val.data==true){
              this.$notify({
                title: "提示",
                message: "删除成功",
                type: 'success',
                duration:1000
              });
            }
          })
        },
        currentPage(val){
          this.pageNO = val
          this.cdAll()
        },
        currentPage1(val){
          this.pageNO = val
          this.cdAll1()
        },
        currentPage2(val){
          this.pageNO = val
          this.cdAll2()
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        //一级
        cdAll(){

          var param =  new URLSearchParams();
          param.append("pageNo",this.pageNO);
          param.append("pageSize",this.pageSize);
          param.append("Pisnavi","0")
          this.$axios.post("qx/cdAll.action",param).then(val => {
            //赋值tableData
            this.tableData = val.data.list
            this.total =val.data.total
            this.cdAll1()
          })
        },
        //二级
        cdAll1(){
          var param =  new URLSearchParams();
          param.append("pageNo",this.pageNO);
          param.append("pageSize",this.pageSize);
          param.append("Pisnavi","1")
          this.$axios.post("qx/cdAll.action",param).then(val => {
            //赋值tableData1
            this.tableData1 = val.data.list
            this.total1 =val.data.total
            this.cdAll2()
          })
        },
        //三级
        cdAll2(){
          var param =  new URLSearchParams();
          param.append("pageNo",this.pageNO);
          param.append("pageSize",this.pageSize);
          param.append("Pisnavi","2")
          this.$axios.post("qx/cdAll.action",param).then(val => {
            //赋值tableData2
            this.tableData2 = val.data.list
            this.total2 =val.data.total
          })
        }
      },
      created() {
        this.cdAll()
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
