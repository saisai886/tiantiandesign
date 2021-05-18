<template>
  <div id="app" class="homeWrap">
    <div id="div1">
      <span id="span" style="float: left;margin: 0px 0px 0px 0px">商城后台</span>
      <div style="margin-right: 850px;padding-top: 10px">
        <img src="../../imagedesign/logo.png" />
      </div>
      <span id="span1" style="float: right">
        <span id="span2" :class="ios" @click="qh()">切换首页</span>
      </span>
    </div>
    <el-container style="height: 500px; border: 1px solid whitesmoke;border-radius: 5px;">
      <el-aside width="200px" style="background-color: rgb(234,237,239)">
        <el-menu>
          <el-submenu  :index="pmenu.pid+''" v-for="pmenu in permission">
            <template slot="title">
              <i :class="pmenu.iconUrl"></i>
              <span>{{pmenu.permissionName}}</span>
            </template>
            <el-submenu :index="cmenu.pid+''" v-for="cmenu in pmenu.permissions">

              <template   slot="title" v-if="cmenu.permissionss.length==0"  >
                <div style="width: 100px;height: 50px" @click="addTab1(cmenu.permissionName,cmenu.purl)">
                  <i :class="cmenu.iconUrl"></i>
                  {{cmenu.permissionName}}
                </div>
              </template>

              <template slot="title" v-if="cmenu.permissionss.length!=0">
                <i :class="cmenu.iconUrl"></i>
                {{cmenu.permissionName}}
              </template>

              <el-menu-item @click="addTab(cmenus.permissionName,cmenus.purl)" index="2-4-1" v-for="cmenus in cmenu.permissionss">
                {{cmenus.permissionName}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <!-- tabs页面显示-->
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :ref="editableTabsValue" :is="item.content"></component>

            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <div id="div2">
      <span id="span3">
        欢迎:{{this.$store.getters.getsessios}}
        <span @click="tc()" id="tc" title="退出">[退出]</span>
        <span @click="sx()" class="el-icon-refresh-left" title="刷新"></span>
      </span>
    </div>

  </div>
</template>
<script>
  //张蓓:
  import zb_caidanAll from "./xitongguanli/zb_caidanAll";
  import zb_yuangoAll from "./xitongguanli/zb_yuangoAll";
  import zb_juese from "./xitongguanli/zb_juese";
  import zb_zhiweiAll from "./xitongguanli/zb_zhiweiAll";
  import zb_qxAll from "./xitongguanli/zb_qxAll";
  import zb_caigoushengqing from "./caigoguanli/zb_caigoushengqing";
  import zb_caigoushengqingjilu from "./caigoguanli/zb_caigoushengqingjilu";
  import zb_caigoushenghe from "./caigoguanli/zb_caigoushenghe";
  import zb_caigoushenghejilu from "./caigoguanli/zb_caigoushenghejilu";
  import zb_cheliangAll from "./cheliangguanli/zb_cheliangAll";
  import zb_peisong from "./peisong/zb_peisong";
  import zb_shoppeisong from "./peisong/zb_shoppeisong";
  import zb_peisongjilu from "./peisong/zb_peisongjilu";
  //---------------
  //zhb
  import ShangpingCx from "../zhuhaibo/ShangpingCx";
  import ShangpingfengleiCx from "../zhuhaibo/ShangpingfengleiCx";
  import GongyingshangCx from "../zhuhaibo/GongyingshangCx";
  import GongyingshangSh from "../zhuhaibo/GongyingshangSh";
  import ShanghuCx from "../zhuhaibo/ShanghuCx";
  import ShanghuSh from "../zhuhaibo/ShanghuSh";
  import UserdtailsCx from "../zhuhaibo/UserdtailsCx";
  //---------------
  // 何思杰
  import cangkuQuery from '../hesijie/CangkuQuery';

  //--------------
 export default {
    components:{
      //张蓓:
      zb_caidanAll,
      zb_yuangoAll,
      zb_juese,
      zb_zhiweiAll,
      zb_qxAll,
      zb_caigoushengqing,
      zb_caigoushengqingjilu,
      zb_caigoushenghe,
      zb_caigoushenghejilu,
      zb_cheliangAll,
      zb_peisong,
      zb_shoppeisong,
      zb_peisongjilu,
      //zhb
      ShangpingCx,
      ShangpingfengleiCx,
      GongyingshangCx,
      GongyingshangSh,
      ShanghuCx,
      ShanghuSh,
      UserdtailsCx,

      // 何思杰
      cangkuQuery

    },
    data(){
      return{
        ios:"el-icon-sort",
        permission:[],
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 2
      }
    },
    methods:{
      sx(){
        this.qxquery()
      },
      tc(){
        sessionStorage.removeItem("yg");
        this.$router.push("/xszweilcom")
      },
      qh(){
        this.$router.push("/xszweilcom")
      },
      qxquery(){
        var yg = sessionStorage.getItem("ygid");
        var yloginname = sessionStorage.getItem("yloginname");
        this.$store.commit('setsessios',yloginname)
        this.$axios.post("qx/qxAll.action?ygid="+yg).then(val=>{
          this.permission = val.data
        })
      },
      addTab(targetName,linkurl) {

        //判断 打开了没有
        var res =  this.editableTabs.find((item)=>{return item.title ==targetName;});
        if(res!=undefined){
          //已打开的    ---选中
          this.editableTabsValue = res.name;
        }else{
          //未打开的   ----添加
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: targetName,
            name: newTabName,
            content: linkurl
          });
          console.log(this.editableTabs)
          this.editableTabsValue = newTabName;

        }



      },
      addTab1(targetName,linkurl){
        this.addTab(targetName,linkurl)
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
    ,
    created() {
      this.qxquery()
    },

  }
</script>

<style scoped>

  .el-menu-item.is-active {
    color: #303133;
  }
  .el-menu {
    border-right: solid 1px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #FFF;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;

  }
  .el-menu[data-v-73687153] {
    border-right: solid 1px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #FFF;
  }
  .el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -7px;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    font-size: 12px;
  }

  #div1{
    width: 100%;
    height: 80px;
    background-color: #f6f8fa;
  }
  #div2{
    width: 100%;
    height: 83px;
    background-color: #eaeef1;
  }
  #span{
    width: 200px;
    height: 80px;
    background-color: #d3d9e0;
    font-family: "微软雅黑";
    font-size: 25px;
    line-height: 80px;
  }
  #span1{
    width: 200px;
    height: 80px;
    font-family: "微软雅黑";
    font-size: 25px;
    line-height: 80px;
    margin: -73px 0px 0px 0px;
  }
  #span2:hover{
    color: red;
  }
  #span3{
    width: 200px;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
  }
  #tc:hover{
    color: red;
  }
</style>
