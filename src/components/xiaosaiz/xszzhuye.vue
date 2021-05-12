<template xmlns:el-col="http://www.w3.org/1999/html">

  <div>

    <el-row>
      <el-col  :span="6">
        <el-image src="src/imagedesign/logo.png"></el-image>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="10" >
        <el-input  placeholder="搜索商品" style="width: 600px;margin-top: 10px" v-model="seachname">
          <el-button slot="append" icon="el-icon-search" style="background-color: limegreen" @click="showshops"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="height: 2px;background-color: limegreen"></div>

    <el-row>

      <el-col :span="4" style="color: orange">
        <el-row>
          <el-col><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每日推荐</h1></el-col>
        </el-row>
        <el-row>
          <el-col style="color: limegreen"><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生鲜瓜果</h1></el-col>
        </el-row>
        <el-row>
          <el-col style="color: aqua"><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随机推送</h1></el-col>
        </el-row>

<!--        <el-row>-->
<!--          <el-image src="src/imagedesign/banner01.jpg"></el-image>-->
<!--        </el-row>-->

      </el-col>
      <el-col :span="16">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in tuijian">
            <el-image style="width: 760px;height: 270px" :src="item.simg"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4">
        <el-image src="src/imagedesign/banner05.jpg"></el-image>
      </el-col>
    </el-row>


    <div style="height: 2px;background-color: limegreen;margin-bottom: 5px"></div>



    <el-row :gutter="20">
      <el-col  style="margin-bottom: 20px;" :span="6" v-for="sef in shops"><div style="border: 1px solid orangered">
        <el-row>
          <el-col> <el-image :src="sef.simg" style="width: 120px;height: 120px"></el-image></el-col>
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
            <el-button type="warning" @click="xiangqing(sef.sid)">查看详情</el-button>
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



</template>

<script>
    export default {
        name: "xszzhuye",
      data(){
        return {
          tuijian:[],
          shops:[],
          pageNo:1,
          pageSize:8,
          total:0,
          seachname:""
        }

      },

      /**
       * 方法
       */
      methods:{
        //显示推荐的商品随机
        showtuijian(){
          var _this=this
          this.$axios.post("xszshop/showtuijian.action").then(function (value) {
            _this.tuijian=value.data.map(function (item) {
              item.simg="http://127.0.0.1:8090/tian/"+item.simg;
              return item;
            })
          }).catch()
        },
        showshops(){
          var _this=this
          var parens=new URLSearchParams();
          parens.append("pageNo",this.pageNo)
          parens.append("pageSize",this.pageSize)
          parens.append("sname",this.seachname)
          this.$axios.post("xszshop/showshops.action",parens).then(function (value) {
            _this.total=value.data.total
            _this.shops=value.data.records.map(function (item) {
              item.simg="http://127.0.0.1:8090/tian/"+item.simg;
              return item;
            })
          })
        },

        //分页改变
        fenye(val){
          this.pageNo=val
          this.showshops();
        },




        //点击详情展示详情页面
        xiangqing(sid){
           this.$emit("sid",sid);
        },


        GoWuChe(sid){ //购物车
          var _this=this;
          if(JSON.parse(sessionStorage.getItem("xszuser"))!=null){
            var pars=new URLSearchParams()
            pars.append("sida",sid) //商品id
            pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid) //用户id
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






        }





      },


      /**
       * 钩子函数
       */
      created() {
        this.showtuijian();
        this.showshops();
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

</style>
