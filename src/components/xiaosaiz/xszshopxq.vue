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
             <el-button type="warning" @click="GoLjigok(shop.sid,count,skucun)">立即购买</el-button>

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
    <!--模态框添加用户基础信息-->
    <el-dialog :visible.sync="userlogin">

      <el-form :model="form" >
        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.udname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.udphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="男">男</el-radio>
          <el-radio v-model="radio" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="地址"  :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in shanhu"
              :key="item.value"
              :label="item.shaddr"
              :value="item.shaddr">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付密码" prop="udpwd">
          <el-input type="password" v-model="form.udpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="udpwdl">
          <el-input type="password" v-model="form.udpwdl" autocomplete="off"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userlogin = false">取 消</el-button>
        <el-button type="primary" @click="jieshua(form.udpwd,form.udpwdl)">确 定</el-button>
      </div>

    </el-dialog>

    <!--支付密码-->
    <el-dialog title="支付密码" :visible.sync="passwod">

      <el-form :model="zf">
        <el-form-item label="支付密码" :label-width="formLabelWidth">
          <el-input v-model="zf.name"  type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="zfqx">取 消</el-button>
        <el-button type="primary" @click="zfd">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>


    export default {
        name: "xszshopxq",
        data(){
          return {
             shop:"",
              count:1,
            xiaoji:0,
            pinglun:[],


            formLabelWidth:"120px",
            udspricesum:"",//单价小计
            scount:"", //数量
            sid:"",//商品id
            zf:[],
            form:[],
            radio:"男",
            passwod:false,
            userlogin:false,
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



        },
        GoLjigok(sid,scount,skucun){ //立即购买
          this.GoWuChe(sid,skucun); //加购物车

          //加入购物车 结算
            this.sid=sid;
            this.scount=scount;
            var _this=this;
            var parse=new URLSearchParams()
            parse.append("sid",sid) //商品id
            parse.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            parse.append("ucount",scount) //下单数量

            this.$axios.post("/Gowuche/settle.action",parse).then(function (vale) {

              if(vale.data!=true){
                _this.userlogin=true;
                _this.$axios("/Gowuche/tianjiashohuo.action").then(function (value){
                  _this.shanhu=value.data
                }).catch(function (value){
                  alert("错误异常")
                })

              }else{

                _this.passwod=true;


              }




            }).catch(function (val){
              alert("错误异常")
            })







        },
        zfd(){

          var _this=this;
          var p=new URLSearchParams();
          p.append("mm",this.zf.name)
          p.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
          this.$axios.post("/Gowuche/zf.action",p).then(function (value) {
            var par=new URLSearchParams();
            par.append("sid",_this.sid)
            par.append("scount",_this.scount)
            par.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            par.append("udspricesum",_this.xiaoji)
            if(value.data==1){
              _this.$axios.post("/Gowuche/userdingdang.action",par).then(function (value) {
                if(value.data==1){

                  _this.$alert('下单成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$message({
                        type: 'info',
                        message: `成功`
                      });
                    }
                  });


                }

              }).catch()






            }else{
              alert("购买失败")
            }




          }).catch(function (vl) {
            alert("错误异常")
          })

          this.zf=""
          this.passwod=false; //关闭模态框

        },

        zfqx(){ //取消支付 把状态改为cg002 已点击购买

          var _this=this;
          var par=new URLSearchParams();
          par.append("sid",this.sid)
          par.append("scount",this.scount)
          par.append("udspricesum",this.xiaoji)
          par.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
          this.$axios.post("/Gowuche/quxiao.action",par).then(function (value) {

            _this.$alert('取消', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `取消`
                });
              }
            });



          }).catch(function (val) {
            alert("错误异常")
          })
          this.passwod=false; //关闭模态框
        },

        jieshua(e,el){

          if(e!=el){
            this.$alert('支付密码不正确', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `密码错误`
                });
              }
            });
          }else{
            var pars=new URLSearchParams()
            pars.append("udname",this.form.udname)
            pars.append("udphone",this.form.udphone)
            pars.append("udpwd",this.form.udpwdl)
            pars.append("udsex",this.radio)
            pars.append("udaddr",this.value)
            pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
            this.$axios.post("/Gowuche/gwcjieshu.action",pars).then(function (value){


            }).catch(function (value){
              alert("错误异常")
            })




          }


          this.userlogin=false;
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
