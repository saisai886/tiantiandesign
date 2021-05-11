<template>
<div>
  <div class="biangkuan" style="width: 1500px;height: 700px;margin:auto">

    <el-container>
      <el-header>
      <el-row :gutter="10">
        <el-col :span="4">
          <label style="font-size: 30px;font-weight:bold;font-style:italic;color: red">购物车</label>
        </el-col>
        <el-col :span="20">
          <el-link type="info" :underline="false" style="margin-left: 700px">我的收货地址</el-link>
        </el-col>
      </el-row>
      </el-header>
    </el-container>
    <div style="width: 1500px;height: 300px">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>

      </template>
    </div>


  </div>



</div>
</template>

<script>
export default {
  name: "xszgowuche",
  data(){
    return {
      Gonwuche:"",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      multipleSelection: []
    }
  },
  methods:{
    trolleychaxu(){



    },
  handleSelectionChange(val) {
      console.log(val)
    this.multipleSelection = val;
  }

  },created() {
    this.trolleychaxu()
  }

}



</script>

<style scoped>
.biangkuan{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

}

.el-header, .el-footer {
  background-color: rgb(245,248,250);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>
