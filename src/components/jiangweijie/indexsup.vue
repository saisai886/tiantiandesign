<template>
  <el-container class="homeWrap">
    <!--头部-->
    <el-header >
        <img width="100px"  src="src/imagedesign/logo.png" alt="图片没有">


      <el-row style="top: 10px">
        <el-col :span="17"><div class="grid-content bg-purple-dark"></div></el-col>
        <el-col :span="7"><el-button  type="info" icon="el-icon-guide" ></el-button></el-col>
      </el-row>

    </el-header>
    <!--中间部分-->
   <div style="border: 1px solid green"></div>
    <el-container>

      <!--左侧-->
      <el-aside width="200px">
        <!---->
        <el-col :span="24">

          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#B3C0D1"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 900px">


            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title" @click="addTab('商品维护','supshangpingwh')">
               商品维护
            </span> <!--添加动态table标签，下面一样-->
            </el-menu-item>


            <el-submenu index="2" active>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品出库</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="addTab('出库申请','supshangpingchuku')"> 出库申请</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="addTab('出库记录','supshangpingchukujilu')">出库记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-shopping-cart-full"></i>
                <span>采购管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-3" @click="addTab('订单受理','supshangpingsogo')">订单受理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>统计管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-4" @click="addTab('货物统计','supshangpinghowu')">货物统计</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="1-5"  @click="addTab('财务管理','supshangpingcaiwu')">财务管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-col>




      </el-aside>
      <!--中间部分-->
      <el-main>
        <el-tabs v-model="editableTabsValue" type="card"  closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"

          >
        <component :is="item.content"></component>
          </el-tab-pane>
        </el-tabs>

      </el-main>
    </el-container>
    <!--尾部-->
    <el-footer style="background-color: #B3C0D1">

    </el-footer>
  </el-container>



</template>

<script>
import supshangpingwh from "./supshangpingwh";
import supshangpingsogo from "./supshangpingsogo";
import supshangpingchuku from "./supshangpingchuku";
import supshangpingchukujilu from "./supshangpingchukujilu";
import supshangpinghowu from "./supshangpinghowu";
import supshangpingcaiwu from "./supshangpingcaiwu";
export default {
  name: "indexsup",
  components:{supshangpingwh,supshangpingsogo,supshangpingchuku,supshangpingchukujilu,supshangpinghowu,supshangpingcaiwu},
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
      {
        title:'商品维护',
        name:'1',
        content:supshangpingwh
      }
      ],
      tabIndex:1
    }
  },
  methods:{

    //打开左侧
    handleOpen(key, keyPath) {
      console.log(keyPath);
    },
    //收起来左侧
    handleClose(key, keyPath) {
      console.log();
    },
    addTab(targetName,i) {

   var tit=this.editableTabs.find((item)=>{return item.title==targetName})

    if(tit!=undefined){
      this.editableTabsValue = tit.name;

    }else{
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: targetName,
        name: newTabName,
        content: i
      });
      this.editableTabsValue = newTabName;
    }



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

  },
  created() {
    this.editableTabsValue='1'
  }
}
</script>

<style scoped>
img{
  position: absolute;
  top: 10px;
  left: 60px;

}


.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


</style>
