<template>

  <div>


  <el-row>
    <el-col  :span="6">
    <el-image src="src/imagedesign/logo.png"></el-image>
    </el-col>
    <el-col :span="4"></el-col>
    <el-col :span="14" >
      <el-input  placeholder="搜索商品" style="width: 600px;margin-top: 10px">
        <el-button slot="append" icon="el-icon-search" style="background-color: limegreen"></el-button>
      </el-input>
    </el-col>
  </el-row>

 <div style="height: 2px;background-color: limegreen"></div>

    <el-row>

      <el-col :span="4" style="color: orange"><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每日推荐</h1></el-col>
      <el-col :span="16">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image src="src/imagedesign/slide03.jpg"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>

    <div style="height: 2px;background-color: limegreen;margin-bottom: 5px"></div>



    <el-row :gutter="20">
      <el-col  style="margin-bottom: 20px;" :span="6" v-for="sef in 16"><div style="border: 1px solid orangered">
        <el-row>
          <el-col> <el-image src="src/imagedesign/goods.jpg"></el-image></el-col>
        </el-row>

        <el-row>
          <el-col :span="12">库存:300</el-col>
          <el-col :span="12">销量:100</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">价格:￥30</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button type="warning">查看详情</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger">加入购物车</el-button>
          </el-col>
        </el-row>
      </div>

      </el-col>

    </el-row>











  </div>












</template>

<script>
    export default {
        name: "xszweilcom"
    }
</script>

<style scoped>


  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }


</style>
