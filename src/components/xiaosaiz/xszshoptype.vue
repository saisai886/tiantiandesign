<template>

  <div>
    <el-container  style="height:100%">
      <el-aside width="200px" >
        <!-- 菜单-->
        <el-menu style="height: 800px"
                 :default-active="xuanzhong"
                 class="el-menu-vertical-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">

          <el-submenu :index="pmenu.stid+''" v-for="pmenu in shopetypes">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>{{pmenu.stname}}</span>
            </template>
            <el-menu-item  :index="cmenu.stid+''" v-for="cmenu in pmenu.childrenshoptype" @click="fenlei(stid=cmenu.stid)">
              {{cmenu.stname}}
            </el-menu-item>


          </el-submenu>

        </el-menu>

      </el-aside>
      <el-container>
        <el-header>

          <el-row>
            <el-col :span="4">
              <el-image src="src/imagedesign/logo.png"></el-image>
            </el-col>
          </el-row>


        </el-header>
        <el-main>


          <div v-if="shoplist.length>0">

          <el-row :gutter="20">
            <el-col  style="margin-bottom: 20px;" :span="8" v-for="sef in shoplist"><div style="border: 1px solid limegreen">
              <el-row>
                <el-col> <el-image :src="sef.simg" style="width: 120px;height: 200px"></el-image></el-col>
              </el-row>

              <el-row>
                <el-col :span="20">{{sef.sbeizhu}}</el-col>
              </el-row>

              <el-row>
                <el-col :span="12">库存:<label style="color: orangered">{{sef.skucun}}</label></el-col>
                <el-col :span="12">销量:<label style="color: orangered">{{sef.sshopcount}}</label> </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><label style="font-size:20px;color:red">￥{{sef.sprice}}</label><label style="color: red">/{{sef.sdanwei}}</label></el-col>
                <el-col :span="12">
                  产地:<label style="color: red">{{sef.schandi}}</label>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button type="warning" @click="ceshi(sef.sid)">查看详情</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" @click="GoWuChe(sef.sid)">加入购物车</el-button>
                </el-col>
              </el-row>
            </div>
            </el-col>
          </el-row>

          <el-pagination layout="prev,pager,next"
                         background
                         :total="total"
                         :page-size="pageSize"
                         @current-change="fenye"
          >

          </el-pagination>
          </div>


     <el-row v-if="shoplist.length==0">
       <el-col :span="24">
         <li class="el-icon-loading"></li>
           <h3 style="color: limegreen">我还没有上架☹☹......</h3>
       </el-col>
     </el-row>

        </el-main>
      </el-container>
    </el-container>


  </div>




</template>

<script>
    export default {
        name: "xszshoptype",
         data(){
          return {
            shopetypes:[],
            shoplist:[],
            pageNo:1,
            pageSize:6,
            total:0,
            stid:7,
            xuanzhong:""
          }
         },

      methods:{
          showshoptypes(){
            var _this=this
            this.$axios.post("xszshoptype/showshoptypes.action").then(function (value) {
                _this.shopetypes=value.data
              _this.xuanzhong=value.data[0].childrenshoptype[0].stid
              _this.stid=value.data[0].childrenshoptype[0].stid
            }).then()
          },

        fenlei(){
            var _this=this
          var params=new URLSearchParams()
          params.append("stid",this.stid);
          params.append("pageNo",this.pageNo);
          params.append("pageSize",this.pageSize);
          this.$axios.post("xszshoptype/selectbydstid.action",params).then(function (value) {
            _this.total=value.data.total
            _this.shoplist=value.data.records.map(function (item) {
              item.simg="http://127.0.0.1:8090/tian/"+item.simg;
              return item;
            })
          }).catch()
        },

        fenye(val){
          this.pageNo=val
          this.fenlei();
        },
        ceshi(sid){
           this.$emit("sid",sid)

        },
        GoWuChe(sid){ //加入购物车
          var _this=this;
          if(JSON.parse(sessionStorage.getItem("xszuser"))!=null){
            var pars=new URLSearchParams()
            pars.append("sida",sid) //商品id
            pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid) //用户id
            pars.append("scount",1) //数量
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

        },


      },
      created() {
          this.showshoptypes();
          this.fenlei();
      }


    }
</script>

<style scoped>


</style>
