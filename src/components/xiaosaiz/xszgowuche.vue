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
              <el-link :underline="false">我的收货地址</el-link>
           </span>
        </el-col>
      </el-row>
      </el-header>
    </el-container>
    <div style="width: 1500px;height: 50px;">

    </div>



<!--购物车表-->
    <div style="width: 1500px;height: 470px">
    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <!--        多选框-->
      <el-table-column align="center"  type="selection" width="55" :selectable="canSelect"></el-table-column>
      <!--        商品图片-->
      <el-table-column label="商品" prop="img" width="110px" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px;" :src="scope.row.img"/>
        </template>
      </el-table-column>
      <!--        商品名字-->
      <el-table-column label="商品名" prop="name" align="center"></el-table-column>
      <!--        上下架状态-->
<!--      <el-table-column label="状态"  prop="prize" width="110px" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag :type="goodsStatus(scope.row.status)">{{scope.row.status==1?"下架":"在售"}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <!--        商品单价-->
      <el-table-column label="单价" prop="prize" width="110px" align="center">
        <template slot-scope="scope">
          <span>&yen;</span>{{scope.row.price}}
        </template>
      </el-table-column>
      <!--        商品数量-->
      <el-table-column label="数量"  prop="num" width="140px" align="center">
        <template slot-scope="scope">
          <el-input-number size="mini" v-model="scope.row.nums" :min="1" :disabled="scope.row.status==1?true:false"></el-input-number>
        </template>
      </el-table-column>
      <!--        商品小计-->
      <el-table-column label="小计"  prop="allPrize" width="110px" align="center">
        <template slot-scope="scope">
          <span>&yen;</span>{{parseFloat(scope.row.price*scope.row.nums).toFixed(2)}}
        </template>
      </el-table-column>
      <!--        操作-->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <!--            <el-button size="mini" :disabled="scope.row.status==1?true:false" type="warning" @click="handleEdit(scope.$index, scope.row)">移到收藏</el-button>-->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" :disabled="scope.row.status==1?true:false" type="success" >结算</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <hr>
<!--尾部-->



        <div class="balance" style="width: 1500px;height: 100px;background-color: rgb(245,248,250);margin-bottom: auto">
          <span style="margin-left: -1080px">
            <el-checkbox >全选</el-checkbox>
            &nbsp;&nbsp;&nbsp;
            <span style="font-size: 12px;font-family: 微软雅黑">共<span class="spanText">{{changeNumPri(1)}}</span>件商品</span>
          </span>


          <ul class="balance_ul1" style="float: right;margin-right: 50px">
            <span class="balance_ul2" >

                  <span>总价<span class="spanText">&yen;{{changeNumPri(2)}}</span></span>
                  <span>
                      <el-button type="danger">全部结算</el-button>
                  </span>
              </span>
          </ul>
        </div>





  </div>



</div>
</template>

<script>






export default {
  name: "xszgowuche",
  data(){
    return {
      Gonwuche:"",
      tableData: [{
        name: 'iPhone',
        price:6338.90,
        img:"",
        nums:1
      },
        {
          name: 'iPhone1',
          price:6338.90,

          img:"",
          nums:1
        },{
          name: 'iPhone2',
          price:6338.90,

          img:"",
          nums:1
        }
      ],
      search : '',
      //选中列表
      multipleSelection : [],
      chooseList : [],
      badeg:"" //标记数量
    }
  },
  methods:{
    canSelect(row) {
      if(row.status==1)
        return false;
      else return true;
    },
    goodsStatus(status)
    {
      if(status=="1")
        return "danger";
      else if(status=="2")
        return "";
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
          allPricess += this.tableData[i].nums*this.tableData[i].price;
          allNumss += this.tableData[i].nums;
        }
      }

      this.badeg=allNumss; //当前数量
      if(which=='2'){
        return parseFloat(allPricess).toFixed(2);
      }else{
        return allNumss;
      }
    },
    // 多选操作
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },



    trolleychaxu(){

      this.$axios()

    },


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
  line-height: 320px;
}

</style>
