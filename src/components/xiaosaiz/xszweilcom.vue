<template>

  <div>


    <el-container>
      <!--头部-->
      <el-header>

        <el-menu default-active="1"
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
        >

          <el-menu-item index="1" @click="myvuecom='xszzhuye'">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>
                  首页
               </span>
            </template>
          </el-menu-item>

          <el-menu-item index="2" @click="myvuecom='xszshoptype'">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>
                 商品分类
               </span>
            </template>
          </el-menu-item>

          <el-menu-item index="3">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>我的购物车</span>
            </template>
          </el-menu-item>

          <el-menu-item index="4" @click="myvuecom='xszgerenzhongx'">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>个人中心</span>
            </template>
          </el-menu-item>
        </el-menu>




      </el-header>

      <!--主页面-->
      <el-main>

      <component :is="myvuecom"></component>


      </el-main>


      <!--脚部用来做网站的信息-->
      <el-footer>这是脚部</el-footer>

    </el-container>




























  </div>












</template>

<script>

  import xszzhuye from "./xszzhuye";
  import xszgerenzhongx from "./xszgerenzhongx";
  import xszshoptype from "./xszshoptype";


    export default {
        name: "xszweilcom",
        data(){
          return{
            myvuecom:"xszzhuye",
          }
        },
      components:{
        xszzhuye,
        xszgerenzhongx,
        xszshoptype
      },



    }
</script>

<style scoped>


  .el-row {
    margin-bottom: 20px;
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
  .el-main {
    color: #333;
    text-align: center;
  }

  .el-header,.el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  a{
    text-decoration: none;
  }



</style>
