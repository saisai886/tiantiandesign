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

          <el-menu-item index="3" @click="SupGowuche">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>我的购物车</span>
            </template>
          </el-menu-item>

          <el-menu-item index="4" @click="SupGrzx">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>个人中心</span>
            </template>
          </el-menu-item>
        </el-menu>




      </el-header>

      <!--主页面-->
      <el-main>


      <component :is="myvuecom" v-on:sid="changevue"  @usergerenzhongxi="gerenzhongx" :toxqsid="xqsid"></component>


      </el-main>


      <!--脚部用来做网站的信息-->
      <el-footer>

        <div class="footer no-mp">
          <div class="foot_link">
            <a href="#">关于我们</a>
            <span>|</span>
            <a href="#">联系我们</a>
            <span>|</span>
            <a href="#">招聘人才</a>
            <span>|</span>
            <a href="#">友情链接</a>
          </div>
          <p>CopyRight © 2016 北京天天生鲜信息技术有限公司 All Rights Reserved</p>
          <p>电话：010-****888    京ICP备*******8号</p>
        </div>

      </el-footer>

    </el-container>




























  </div>












</template>

<script>

  import xszzhuye from "./xszzhuye";
  import xszgerenzhongx from "./xszgerenzhongx";
  import xszshoptype from "./xszshoptype";
  import xszshopxq from "./xszshopxq";
  import xszlogin from "./xszlogin";
  import xszgowuche from "./xszgowuche";

    export default {
        name: "xszweilcom",
        data(){
          return{
            myvuecom:"xszzhuye",
            xqsid:"",
            xszgwc:"" //购物车点击判断值

          }
        },
      components:{
        xszzhuye,
        xszgerenzhongx,
        xszshoptype,
        xszshopxq,
        xszlogin,
        xszgowuche

      },

      methods:{
        changevue(data){
          this.xqsid=data
          this.myvuecom=xszshopxq
        },
        gerenzhongx(data){ //该方法是登入页面组件传过来的，账号密码
          console.log(data)
          if(data!=null){
            if(this.xszgwc=="1"){ //当前进行判断，是否在购物车点击进去，或个人中心点击进去
              this.xszgwc="" //改变购物车判断的值
              this.myvuecom=xszgowuche
            }else{
              this.myvuecom=xszgerenzhongx
            }
            sessionStorage.setItem("xszuser",data) //保存用户名
          }

        },

        SupGowuche(){
          if(sessionStorage.getItem("xszuser")!=null){ //判断用户登入没有
            this.myvuecom=xszgowuche
          }else{
            this.myvuecom=xszlogin
            this.xszgwc="1" //改变购物车判断值 为1
          }

        },
        SupGrzx(){ //个人中心
          this.xszgwc="" //改变购物车判断值，可能会多次点击购物车和个人中心，不进行登入
          this.myvuecom='xszlogin'
        }

      },watch:{
        myvuecom(newText,oldText){ //监听session有没有用户名
          console.log(newText+"第一个")
          console.log(oldText+"第二个")
          console.log(sessionStorage.getItem("xszuser"))
          if(newText=="xszlogin"){
              if(sessionStorage.getItem("xszuser")!=null){
                this.myvuecom=xszgerenzhongx
              }
          }

          if(newText=="xszgowuche"){
            if(sessionStorage.getItem("xszuser")!=null){
              this.myvuecom=xszgowuche
            }
          }


        }

      }


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


  /* 页面底部样式 */
  .footer{
    border-top:2px solid #42ad46;
    margin:60px 0;
  }

  .foot_link{text-align:center;margin-top:30px;}
  .foot_link a,.foot_link span{color:#4e4e4e;}
  .foot_link a:hover{color:#ff8800}
  .foot_link span{padding:0 10px}
  .footer p{text-align:center; margin-top:10px;}



</style>
