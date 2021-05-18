<template>
<div id="div">
  <el-container>
    <el-aside width="240px">

      <el-col :span="24">
        <el-menu
          style="height: 800px"
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu  index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group >
              <el-menu-item index="1-1"  @click="addTab('全部订单','dingdanshow')">全部订单</el-menu-item>
              <el-menu-item index="1-2" @click="addTab('待收货订单','daishouhuo')">待收货订单</el-menu-item>
              <el-menu-item index="1-3" @click="addTab('待提货订单','daitihuo')">待提货订单</el-menu-item>
              <el-menu-item index="1-4" @click="addTab('已提货订单','yitihuo')">已提货订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2" @click="addTab('统计营收','tongjiyingshou')">
            <i class="el-icon-menu"></i>
            <span slot="title">统计营收</span>
          </el-menu-item>
          <el-menu-item index="3" @click="addTab('资料维护','ziliaoweihu')">
            <i class="el-icon-document"></i>
            <span slot="title">资料维护</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
  <el-container>
    <el-header >
      <el-col :span="6">
      <el-image src="src/imagedesign/logo.png" @click="tiaozhuang">
<!--        <router-link to="xszweilcom"></router-link>-->
      </el-image>
      </el-col>

      <el-row style="top: 10px;float: right">
        <el-col :span="17"><div class="grid-content bg-purple-dark"></div></el-col>
        <el-col :span="7"><el-button  type="info" icon="el-icon-sort" @click="tiaozhuang">切换主页</el-button></el-col>
      </el-row>

    </el-header>
    <el-main>

      <el-tabs v-model="editableTabsValue" stretch="stretch" type="card" closable @tab-remove="removeTab">
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
    <el-footer >
    </el-footer>
  </el-container>
</el-container>
  </div>
</template>

<script>
   import dingdanshow from './Dingdanshow'
   import daishouhuo from './Daishouhuo'
   import daitihuo from './Daitihuo'
   import yitihuo from './Yitihuo'
   import tongjiyingshou from './Tongjiyingshou'
   import ziliaoweihu from './Ziliaoweihu'



    export default {
        name: "ShanghuShouye",
      data() {
        return {
          editableTabsValue: '1',
          editableTabs: [
            {
            title: '全部订单',
              name:'1',
              content: dingdanshow
            }
          ],
          tabIndex: 1

        }
      },

      methods: {
        handleNodeClick(data) {
          console.log(data);
        },

        tiaozhuang(){
          this.$router.push("xszweilcom");
        },
        addTab(targetName,dingdanshow) {

          var res =  this.editableTabs.find((item)=>{return item.title ==targetName;});
          if(res!=undefined){
            this.editableTabsValue = res.name;
          }else {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: targetName,
            name: newTabName,
            content: dingdanshow
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
      components:{
        dingdanshow,
        daishouhuo,
        daitihuo,
        yitihuo,
        tongjiyingshou,
        ziliaoweihu
      },
      created() {
        this.editableTabsValue='1'
      }

    }
</script>

<style scoped>

  .el-header,
  .el-footer {
    color: #333;
    text-align: center;
    height: 35px;
  }

  .el-aside {

    color: #333;
    text-align: center;
    height: 800px;
  }

  .el-main {

    color: #333;
    text-align: center;
    line-height: 160px;
  }



  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
