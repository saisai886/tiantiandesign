<template>
    <div>
      <el-collapse v-model="activeName" accordion>
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
                  <el-button @click="show=true" type="primary">编辑</el-button>
                  <el-button type="primary">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
             @current-change="currentPage">
          </el-pagination>
        </el-collapse-item>


        <el-collapse-item  title="菜单二级查询" name="2">
            <el-table
              :data="tableData1"
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
                  <span>按回车键查询(Enter)</span>
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入菜单名称搜索"/>
                </template>
                <template slot-scope="props">
                  <el-button type="primary">编辑</el-button>
                  <el-button type="primary">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total1"
            @current-change="currentPage1">
          </el-pagination>
        </el-collapse-item>
        <el-collapse-item title="菜单三级查询" name="3">
            <el-table
              :data="tableData2"
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
                  <span>按回车键查询(Enter)</span>
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入菜单名称搜索"/>
                </template>
                <template slot-scope="props">
                  <el-button type="primary">编辑</el-button>
                  <el-button type="primary">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total2"
            @current-change="currentPage2">
          </el-pagination>
        </el-collapse-item>
      </el-collapse>
      <el-dialog :visible="show" title="Hello world">
          <p>Try Element</p>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          show:false,
          total:0,
          total1:0,
          total2:0,
          search:"",
          activeName:"1",
          tableData: [],
          tableData1:[],
          tableData2:[],
          pageNO:1,
          pageSize:5
        }
      },
      methods:{
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
  #div1{
    width: 270px;
  }
  .el-input el-input--mini{
    width: 100px;
  }
</style>
