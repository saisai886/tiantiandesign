<template>

  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-image src="src/imagedesign/logo.png"></el-image>
          </el-col>
        </el-row>
      </el-header>

      <el-main>

        <el-row>
          <el-col :span="10">
            <el-image :src="shop.simg" style="width: 350px;height: 450px;float: right"></el-image>
          </el-col>
          <el-col :span="14">
           <div style="float: left;margin-left: 50px;width: 300px">

             <el-row>
               <h3>{{shop.sbeizhu}}</h3>
             </el-row>

             <el-row>
               <el-col :span="6"> 价格:</el-col>
              <el-col :span="10">
                <div style="margin-top: -3px">
                <label style="color: red;font-size: 24px">￥{{shop.sprice}}</label>
                  <label style="color: red">/{{shop.sdanwei}}</label>
                </div>
              </el-col>
             </el-row>

             <el-row><hr></el-row>

             <el-row>
               <el-col :span="6"> 库存:</el-col>
               <el-col :span="10">
                 <label style="color: red">{{shop.skucun}}</label>
               </el-col>
             </el-row>

             <el-row>
               <hr>
             </el-row>

             <el-row>
               <el-col :span="6"> 销量:</el-col>
               <el-col :span="10">
                 <label style="color: red">{{shop.sshopcount}}</label>
               </el-col>
             </el-row>

             <el-row>
               <hr>
             </el-row>

             <el-row>
               <el-col :span="6"> 到期时间:</el-col>
               <el-col :span="14">
                 <label style="color: red">{{shop.sbaozhitime}}</label>
               </el-col>
             </el-row>


             <el-row>
               <hr>
             </el-row>

             <el-row>
               <el-col :span="6"> 产地:</el-col>
               <el-col :span="10">
                 <label style="color: red;font-size: 18px">{{shop.schandi}}</label>
               </el-col>
             </el-row>

             <el-row>
               <hr>
             </el-row>

             <el-row>
               <el-col :span="6"> 数量:</el-col>
               <el-col :span="15">
                 <el-button circle type="success" @click="jian">-</el-button>
                 &nbsp;
                 {{count}}
                 &nbsp;
                 <el-button circle type="primary" @click="jia">+</el-button>
               </el-col>
             </el-row>


             <el-row>
               <hr>
             </el-row>

             <el-row>
               <el-col :span="6">
               <label style="font-size: 20px">小计:</label>
               </el-col>
               <el-col :span="18">
                 <label style="color: red;font-size: 30px">{{xiaoji}}</label>
               </el-col>
             </el-row>

             <br>
             <el-button type="success" @click="GoWuChe(shop.sid,shop.skucun)" >加入购物车</el-button>
             <el-button type="warning">立即购买</el-button>

           </div>
          </el-col>
        </el-row>



        <el-row>
          <el-col :span="12">
            <h2 style="color: red">评论区</h2>
          </el-col>
        </el-row>

        <el-row v-if="pinglun.length==0">
          <li class="el-icon-loading"></li>
          <h3 style="color: limegreen">目前还没有人评论我☹☹......</h3>
        </el-row>

        <el-row v-if="pinglun.length>0">
          <div style="width: 50%;height: 200px;border: 1px solid limegreen;margin: auto" v-for="pl in pinglun">
            <div  style="float: left;margin-left:20px;margin-top:20px;color: red">
              <el-image :src="pl.udimg" style="width: 30px;height: 30px"></el-image>{{pl.uname}}
            </div>
            <div style="clear: both">
            </div>

            <hr>

            <div style="float: left;color: darkgray">评论:</div>
            <div style="color: orangered;">
              {{pl.pinglun}}
            </div>
            <div style="clear: both"></div>

            <div style="float: left;margin-top: 80px">
              <el-rate
                v-model="pl.xingji-0"
                show-text>
              </el-rate>
            </div>

            <div style="float: right;margin-top: 80px">
                 {{pl.pingluntime}}
            </div>

          </div>

        </el-row>











      </el-main>



    </el-container>





  </div>

</template>

<script>


    export default {
        name: "xszshopxq",
        data(){
          return {
             shop:"",
              count:1,
            xiaoji:"",
            pinglun:[]
          }
        },

      props:["toxqsid"],

      methods:{
         showshop(){
           var _this=this
           var params=new URLSearchParams();
           params.append("sid",this.toxqsid)
           this.$axios.post("xszshop/selectbysid.action",params).then(function (value) {
             value.data.simg="http://127.0.0.1:8090/tian/"+value.data.simg
             _this.shop=value.data
             _this.xiaoji=value.data.sprice
           }).catch()
         },

        showpingluns(){
           var _this=this
          var params=new URLSearchParams();
           params.append("sid",this.toxqsid)
           this.$axios.post("shoppinglun/showpinglun.action",params).then(function (value) {
                _this.pinglun=value.data.list.map(function (item) {
                 item.udimg="http://127.0.0.1:8090/tian/"+item.udimg
                  return item
                })
           }).catch()
        },






        jia(){
           this.count++
          this.xiaoji=this.count*this.shop.sprice
        },

        jian(){
           if (this.count==1){
             this.count=1
           }else {
             this.count--
           }

          this.xiaoji=this.count*this.shop.sprice
        },

        GoWuChe(sid,kuchu){
           if(kuchu!=0){
             var _this=this;
             if(JSON.parse(sessionStorage.getItem("xszuser"))!=null){
               var pars=new URLSearchParams()
               pars.append("sida",sid) //商品id
               pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid) //用户id
               pars.append("scount",this.count) //数量
               this.$axios.post("/Gowuche/addGowuche.action",pars).then(function (value) {

                 console.log(value.data)
                 if(value.data==true){
                   _this.$message({
                     message: '添加购物车成功',
                     type: 'success'
                   });
                 }


               }).catch(function (val){
                 alert("错误异常")
               })

             }else {

               this.$emit("Gowuche","1")

             }
           }else{
             this.$alert('库存不足！！！', '提示', {
               confirmButtonText: '确定',
               callback: action => {
                 this.$message({
                   type: 'info',
                   message: `购物车添加失败`
                 });
               }
             });


           }



        }




      },

      created() {
          this.showshop();
          this.showpingluns();
      }

    }
</script>

<style scoped>

</style>
