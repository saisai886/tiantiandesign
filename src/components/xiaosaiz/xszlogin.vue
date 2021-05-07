<template>
  <div>



    <el-main style="width: 100%;height: 500px;background-color: limegreen">

        <div style="height: 100%;width: 10%;float:left;">

        </div>
      <div style="height: 100%;width: 30%;float: left;">

        <el-image src="src/imagedesign/login_banner.png" style="margin-top: 80px"></el-image>
      </div>

      <div style="height: 100%;width: 10%;float: left;color:white;font-size: 25px;margin-top: 80px">
           <div>日</div>
           <div>夜</div>
           <div>兼</div>
           <div>程</div>
           <div>.</div>
           <div>急</div>
           <div>速</div>
           <div>送</div>
           <div>达</div>
      </div>

      <div style="height: 100%;width: 50%;float: left;">

        <div style="width: 80%;height: 90%;margin: auto;background-color: white">

          <div style="margin-top: 20px">
           <div style="float:left;margin-left: 120px;margin-top: 20px;margin-bottom: 10px">
             <a href="#" style="font-size: 25px;color: #B3C0D1" @click="loginvue='xszdenglu'">用户登录</a>
           </div>

            <div style="float: left;font-size: 25px;margin-left: 20px;margin-top: 20px;margin-bottom: 10px">|</div>

            <div style="float:left;margin-left: 20px;margin-top: 20px;margin-bottom: 10px">
              <span class="el-icon-caret-right"></span>
              <a href="#" style="font-size: 25px;color: limegreen;" @click="loginvue='xszzhuce'">去注册</a>
            </div>
          </div>


          <div style="clear: both;">
             <hr style="width: 70%">
          </div>


          <div style="width: 70%;margin: auto;">
           <component :is="loginvue"></component>
          </div>










        </div>



      </div>






    </el-main>







  </div>




</template>

<script>

  import xszdenglu from "./xszdenglu";
  import xszzhuce from "./xszzhuce";

    export default {
        name: "xszlogin",
      data(){
          return{
            loginvue:xszdenglu
          }
      },


      components:{
        xszdenglu,
        xszzhuce
      }

    }
</script>

<style scoped>

  a{
    text-decoration: none;
  }

</style>
