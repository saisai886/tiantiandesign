<template>
  <div id="app">

    <el-container>
      <!--头部-->
      <el-header>

         <el-menu default-active="xszweilcom"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
                  router="router"
         >

           <el-menu-item index="xszweilcom">
             <template slot="title">
               <i class="el-icon-s-home"></i>
               <span>
                  首页
               </span>
             </template>
           </el-menu-item>

           <el-menu-item index="home">
             <template slot="title">
               <i class="el-icon-menu"></i>
               <span>
                 商品分类
               </span>
             </template>
           </el-menu-item>

           <el-menu-item index="about">
             <template slot="title">
               <i class="el-icon-shopping-cart-full"></i>
               <span>我的购物车</span>
             </template>
           </el-menu-item>

           <el-menu-item index="">
             <template slot="title">
               <i class="el-icon-s-custom"></i>
               <span>个人中心</span>
             </template>
           </el-menu-item>

      <router-link to="/indexsup">供货商</router-link>
         </el-menu>




      </el-header>

      <!--主页面-->
      <el-main>
        <router-view></router-view>
      </el-main>


      <!--脚部用来做网站的信息-->
      <el-footer>这是脚部</el-footer>

    </el-container>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
  .router-link-active{
    text-decoration: none;
  }

</style>
