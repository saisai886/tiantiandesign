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
          <span style="margin-left: 600px">
              <el-link :underline="false">我的购物车</el-link>
                        <i class="el-icon-shopping-cart-2">
                          <el-badge :value="1" v-model="badeg" class="item"> </el-badge>
                        </i>
              |
              <el-link :underline="false" @click="wodigowuche">我的收货地址</el-link>
           </span>
        </el-col>
      </el-row>
      </el-header>
    </el-container>
    <div style="width: 1500px;height: 20px;">

    </div>



<!--购物车表-->
    <div style="width: 1500px;height: 470px">
    <el-table
      ref="multipleTable"
      :data="tableData"
      @select-all="selection"
      @select="selectid"
      max-height="500"
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <!--        多选框-->
      <el-table-column align="center"   type="selection" width="55" :selectable="canSelect"> </el-table-column>


      <!--        商品图片-->
      <el-table-column label="商品" prop="simg" width="110px" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px;" :src="scope.row.simg"/>
        </template>
      </el-table-column>
      <!--        商品名字-->
      <el-table-column label="商品名" prop="sname" align="center"></el-table-column>
      <!--        商品单价-->
      <el-table-column label="单价" prop="sprice" width="110px" align="center">
        <template slot-scope="scope">
          <span>&yen;{{scope.row.sprice}}元</span>
        </template>
      </el-table-column>
      <!--        商品数量-->
      <el-table-column label="数量"  prop="scount" width="140px" align="center">
        <template slot-scope="scope">
          <el-input-number size="mini" v-model="scope.row.scount"  :min="1"  @change="changejiangjian(scope.row.sid,scope.row.scount,scope.row)" :disabled="scope.row.status==1?true:false"></el-input-number>
        </template>
      </el-table-column>
      <!--        商品小计-->
      <el-table-column label="小计"  prop="allPrize" width="110px" align="center">
        <template slot-scope="scope">
          <span>&yen;</span>{{parseFloat(scope.row.sprice*scope.row.scount).toFixed(2)}}
        </template>
      </el-table-column>
      <!--        操作-->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" @input="shuinput" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" :disabled="scope.row.status==1?true:false" @click="jieshuang(scope.row.sid,scope.row.scount,parseFloat(scope.row.sprice*scope.row.scount).toFixed(2))" type="success" >结算</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <hr>
<!--尾部-->
    <!--分页-->
<!--    <el-pagination-->
<!--      background-->
<!--      layout="prev, pager, next"-->
<!--      :page-size="10"-->
<!--      :total="total"-->
<!--      @current-change="currentchange"-->
<!--    >-->
<!--    </el-pagination>-->
    <!--====-->


        <div class="balance" style="width: 1500px;height: 100px;background-color: rgb(245,248,250);margin-bottom: auto">
          <span style="margin-left: -1080px">
            &nbsp;&nbsp;&nbsp;

          </span>


          <ul class="balance_ul1" style="float: right;margin-right: 50px">
            <span class="balance_ul2" >
                  <span style="font-size: 12px;font-family: 微软雅黑">共选<span class="spanText">{{jianggei}}</span>件商品</span>
                  <span>总价<span class="spanText">&yen;{{jiangping}}</span></span>
                  <span>
                      <el-button type="danger" @click="quangxuangjieshuan(jianggei,jiangping)">全部结算</el-button>
                  </span>
              </span>
          </ul>
        </div>



  </div>


  <!--模态框-->
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

    <el-row>

      <div v-if="shohuodizhi!=''">
      <el-col :span="12"  v-for="sop in shohuodizhi">
        <el-card class="box-card" shadow="hover" >
          <div slot="header" class="clearfix">
            <span>地址</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="tjshohu" >||&nbsp 添加</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="shangpsc(sop.shid)" >||&nbsp 删除</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="shohuosz(sop.usshiyong,sop.shid)" >{{sop.usshiyong==1?"默认":"设置默认"}}</el-button>
          </div>
          <div class="text item">
            {{'商户姓名：'+sop.shname}} <br>
            {{'商户地址：'+sop.shaddr}} <br>
            {{'商户联系方式：'+sop.shphone}} <br>
          </div>

        </el-card>

      </el-col>
    </div>

    <div v-if="shohuodizhi==''">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in shanhu"
          :key="item.value"
          :label="item.shaddr"
          :value="item.shaddr">
        </el-option>
      </el-select>
      <el-button type="primary" @click="ok(value)">确定</el-button>
    </div>


    </el-row>



  </el-dialog>


  <!--模态框添加地址-->
  <el-dialog :visible.sync="dialog">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in shanhu"
          :key="item.value"
          :label="item.shaddr"
          :value="item.shaddr">
        </el-option>
      </el-select>
      <el-button type="primary" @click="ok(value)">确定</el-button>
  </el-dialog>



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

  <!--全选支付密码-->
  <el-dialog title="支付密码" :visible.sync="qxpassword">

    <el-form :model="qxzf">
      <el-form-item label="支付密码：" :label-width="formLabelWidth">
        <el-input v-model="qxzf.name"  type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="qxzfqx">取 消</el-button>
      <el-button type="primary" @click="qxzfok">确 定</el-button>
    </div>
  </el-dialog>



</div>
</template>

<script>






export default {
  name: "xszgowuche",
  data(){

    return {
      Gonwuche:"",
      tableData: [],
      search : '',
      //选中列表
      multipleSelection : [],
      chooseList : [],
      badeg:"", //标记数量
      total:0, //总页数
      pageno:1,
      jiangping:"",//件数
      jianggei:0 ,//价格
      shohuodizhi:"", //收货地址
      shanhu:"",//所有商户地址
      value:"",
      radio:"男", //男女
      dialogFormVisible: false,
      dialog: false,
      userlogin:false,
      form:{
      },
      formLabelWidth: '120px',
      passwod:false, //输入密码验证
      zf:{},
      qxzf:{},
      qxpassword:false,
      qxscount:"",//全选所有商品数量
      udspricesum:"",// 单个订单小计
      qxzojiang:"",//全选商品总价


      sid:"",//单选的商品id
      scount:""//单选的商品数量

    }



  },
  methods:{
    canSelect(row) {
      if(row.status==1)
        return false;
      else return true;
    },

    changeNumPri(which)
    {
      const length = this.tableData.length;
      //总价
      //全部数量


      let allPricess = 0.0;
      let allNumss = 0;
      for (let i = 0; i < length; i++) {
        if(this.tableData[i].status!=1)
        {
          allPricess += this.tableData[i].scount*this.tableData[i].sprice;
          allNumss += this.tableData[i].scount;


        }
      }
      this.jiangping=allPricess
      this.jianggei=allNumss;

     // this.badeg=allNumss; //当前数量
      if(which=='2'){
        return parseFloat(allPricess).toFixed(2);
      }else{
        return allNumss;
      }
    },
    // 多选操作
    handleSelectionChange(val) {


      if(val!=""){ //获取的数组不为空就加值
       // this.changeNumPri();
      }else{
        this.jiangping=""
        this.jianggei=""
      }

      this.multipleSelection = val;
    },



    changejiangjian(e,scount,row){ //加减 计算
      console.log(row)
         var params=new URLSearchParams()
          params.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
          params.append("sida",e)
          params.append("scount",scount)
        this.$axios.post("/Gowuche/jianjiang.action",params).then(function (value){

        }).catch(function (value){
          alert("错误异常")
        })






      if(this.multipleSelection!=""){
          this.selectid(this.multipleSelection)
      }
    },



    selection(){//全选
    this.selectid(this.multipleSelection)

    },



    selectid(selection, row){ //单选
        var zojiang=0; //总价变量
        var zojiangnum=0; //数量


    for(var i=0;i<selection.length;i++){
      zojiang+=selection[i].scount*selection[i].sprice; //总价
      zojiangnum+=selection[i].scount
    }
      this.jiangping=zojiang //给值
      this.jianggei=zojiangnum;//所有购物车总数



    },



    tjshohu(){
      this.dialog=true;
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
        par.append("udspricesum",_this.udspricesum)
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

                _this.trolleychaxu(); //查询购物车数据
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
      par.append("udspricesum",this.udspricesum)
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
         _this.trolleychaxu(); //查询购物车数据


    }).catch(function (val) {
      alert("错误异常")
    })
      this.passwod=false; //关闭模态框
    },



    jieshuang(sid,scount,jiaoji){ //加入购物车 结算
      this.sid=sid;
      this.scount=scount;
      var _this=this;
      this.udspricesum=jiaoji;
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
    },





    quangxuangjieshuan(scount,jiangping){ //全选结算
      var _this=this;
      this.qxscount=scount; //全选所有商品数量
      this.qxzojiang=jiangping; //全选商品总价
    if(this.multipleSelection==""){
      this.$alert('请选择商品', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `选择商品`
          });
        }
      });

    }else{
      this.qxpassword=true
    }


    },


    qxzfok(){ //全选密码确定

      var _this=this;
      var p=new URLSearchParams();
      p.append("mm",this.qxzf.name)
      p.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
      this.$axios.post("/Gowuche/zf.action",p).then(function (value) {
        if(value.data==1){
          var pars=new URLSearchParams()
          pars.append("scount",_this.qxscount)
          pars.append("qxzojiang",_this.qxzojiang)
          pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
          _this.$axios.post("/Gowuche/quangxuangdingdan.action",pars).then(function (value) {
            if(value.data==1){

              var arr=JSON.stringify(_this.multipleSelection)
              var zfj = {
                headers: {
                  'Content-Type':'application/json;charset=UTF-8'
                }
              }
              _this.$axios.post("/Gowuche/quanxuan.action?uid="+JSON.parse(sessionStorage.getItem("xszuser")).uid,arr,zfj).then(function (value) {


                _this.$alert('成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$message({
                      type: 'info',
                      message: `成功`
                    });
                  }
                });


                _this.trolleychaxu();

              }).catch(function (val) {
                alert("异常错误")
              })


            }

          }).catch(function (val) {
            alert("错误异常")
          })






        }
        _this.qxpassword=false

      }).catch(function (val) {
        alert("错误异常")
      })






    },qxzfqx(){ //全选取消
      var _this=this;
      var pars=new URLSearchParams()
      pars.append("scount",this.qxscount)
      pars.append("qxzojiang",this.qxzojiang)
      pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
      this.$axios.post("/Gowuche/quangxuangdingdanqxiao.action",pars).then(function (value) {
        if(value.data==1){

          var arr=JSON.stringify(_this.multipleSelection)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          _this.$axios.post("/Gowuche/quanxuanqx.action?uid="+JSON.parse(sessionStorage.getItem("xszuser")).uid,arr,zfj).then(function (value) {


            _this.trolleychaxu();

          }).catch(function (val) {
            alert("异常错误")
          })


        }
        _this.qxpassword=false
      }).catch(function (val) {
        alert("错误异常")
      })


    },

























    wodigowuche(){ //我的收货地址
      this.dialogFormVisible=true
      var _this=this;
     var pars=new  URLSearchParams()
      pars.append("id",JSON.parse(sessionStorage.getItem("xszuser")).uid)
      this.$axios.post("/Gowuche/wodigowuche.action",pars).then(function (value) {

        _this.shohuodizhi=value.data



      }).catch(function (val) {
        alert("错误异常")
      })

      this.$axios("/Gowuche/tianjiashohuo.action").then(function (value){
          _this.shanhu=value.data
      }).catch(function (value){
        alert("错误异常")
      })



    },

    shangpsc(sc){ //收货地址删除

      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this=this;
        var pars=new  URLSearchParams()
        pars.append("uid",sc)
        this.$axios.post("/Gowuche/delete.action",pars).then(function (value){
          if(value.data==1){
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          _this.wodigowuche();

        }).catch(function (value){
          alert("错误异常")
        })



      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });





    },








    shohuosz(shop,shid){ //设置默认收货地址
      var _this=this;

      if(shop!=1){
      var pars=new  URLSearchParams()
        pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
        pars.append("shid",shid)
        this.$axios.post("/Gowuche/updefualt.action",pars).then(function (value) {

        _this.wodigowuche();

        }).catch(function (val) {
          alert("错误异常")
        })

     }


    },


    ok(e){//添加地址  拿到地址查询出来加入到关联表里
      var _this=this;
     var pars=new URLSearchParams()
      pars.append("shaddr",e)
      pars.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)
      this.$axios.post("/Gowuche/Gowuchaddr.action",pars).then(function (value) {

        if(value.data==0){
          _this.$message('已有该地址');
        }else{
          _this.$message({
            type: 'success',
            message: '添加成功!'
          });
          _this.wodigowuche();
          _this.dialog=false;
        }



      }).catch(function (val) {

      })



    },

























    handleDelete(e,ei){//删除
    var _this=this;
     var params=new URLSearchParams()
      params.append("sid",ei.sid)
      params.append("uid",JSON.parse(sessionStorage.getItem("xszuser")).uid)





      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

        this.$axios.post("/Gowuche/deleteid.action",params).then(function (val){
          _this.trolleychaxu()

        }).catch(function (){
          alert("错误异常")
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });



    },


    trolleychaxu(){ //查询购物车数据
      var _this=this;
      var par=new URLSearchParams()
      par.append("id",JSON.parse(sessionStorage.getItem("xszuser")).uid)
      par.append("name",this.search)
      par.append("pageNo",this.pageno)
      par.append("pageSize",100)
      this.$axios.post("/Gowuche/selectAll.action",par).then(function (value) {

        _this.tableData=value.data.list.map((item)=>{
          item.simg="http://127.0.0.1:8090/tian/"+item.simg;
          return item;
        })
        _this.total=value.data.total; //分页
        _this.badeg=value.data.total; //购物车个数值


      }).catch(function (val) {
        alert("错误异常")
      })

    },
    shuinput(){
      this.trolleychaxu();
    },
    currentchange(val){//分页
      this.pageno=val
      this.trolleychaxu();
    }


  }


  ,created() {
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
  line-height: 300px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 400px;
}
</style>
