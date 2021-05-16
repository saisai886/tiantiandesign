<template>
    <div>
      <el-tabs v-model="activeTab" @tab-click="ghssp" type="border-card">
        <el-tab-pane v-for="g in ghs" :name="g.gid.toString()"  :label="g.gname" style="height: 330px;">
          <el-table
            :data="tableData.filter(data => !search || data.gsname.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            height="340"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="right" inline class="demo-table-expand">
                  <el-form-item label="单价:">
                    <span>{{ props.row.gsprice }}</span>
                  </el-form-item>
                  <el-form-item label="最大数量:">
                    <span>{{ props.row.gscount }}</span>
                  </el-form-item>
                  <el-form-item label="描述:">
                    <span>{{props.row.gsmiaoshu}}</span>
                  </el-form-item>
                  <el-form-item label="来源地址:">
                    <span>{{props.row.gschandi}}</span>
                  </el-form-item>
                  <el-form-item label="生产日期:">
                    <span>{{props.row.gstime}}</span>
                  </el-form-item>
                  <el-form-item label="保质期:">
                    <span>{{props.row.gsbozhi}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              :selectable='checkboxT'
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="供货商商品编号"
              prop="gsid">
            </el-table-column>
            <el-table-column
              label="供货商商品名称"
              prop="gsname">
            </el-table-column>
            <el-table-column
              label="供货商商品图片"
              prop="gsimg">
              <template slot-scope="scope">
                <img style="width: 50px;height: 50px" :src="'http://localhost:8090/tian/img/'+scope.row.gsimg"/>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="250px"
            >
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入商品名称搜索"/>
              </template>
              <template slot-scope="props">
                商品数量:{{props.row.gscount==0?"无库存":props.row.gscount}}
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="float: left;margin-top: 20px" @click="tj">
            确认
          </el-button>

          <el-pagination
            style="margin:25px 0px 0px -150px"
            background
            :page-size="pageSize"
            :current-page="pageNo"
            :total="total"
            @current-change="currentPage">
          </el-pagination>

        </el-tab-pane>
      </el-tabs>

      <el-dialog :visible.sync="cgdanshow" title="采购申请单">
        <div style="height: 400px;">
        <el-table
          @select-all = "qx"
          @select="ddsqxz"
          :data="tjsp"
          height="350"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55"
            align="center"
            disabled="false">
          </el-table-column>
          <el-table-column
            label="供货商商品编号"
            prop="gsid"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column align="center"
            label="供货商商品名称"
            prop="gsname"
            width="200">
          </el-table-column>

          <el-table-column
            label="供货商商品图片"
            prop="gsimg"
            width="200"
            align="center">
            <template slot-scope="scope">
              <img style="width: 50px;height: 50px" :src="'http://localhost:8090/tian/img/'+scope.row.gsimg"/>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            prop="gsprice"
            width="200"
            align="center">
            <template slot-scope="scope">
              {{scope.row.gsprice | fh}}
            </template>
          </el-table-column>
          <el-table-column
            label="采购数量"
            width="200">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.zb_num" @change="handleChange(scope.row.gsid)" :min="1" :max="scope.row.gscount">1</el-input-number>
              <br>
              <span>余剩商品数量：{{scope.row.gscount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="小计"
             width="100"
            align="center">
            <template slot-scope="scope">
               <label>{{scope.row.zb_xj | fh}}</label>
            </template>
          </el-table-column>
        </el-table>
          <el-button @click="tjshengqingdan" style="margin-top: 20px;float: right" type="primary">
            添加申请采购单
          </el-button>

          <h2 style="margin-right: 40px;font-family: 微软雅黑;margin-top: 20px;float: right">
            总金额：<label style="color: red">{{he | fh}}</label>
          </h2>
          <h2 style="font-family: 微软雅黑;margin-top: 20px;float: left">
            采购人：<label>{{yloginname}}</label>
          </h2>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "zb_caigoushengqing",
      data(){
          return{
            activeTab:"1",
            cg:{
              cgallmoney:0,
              ygid:0,
              cgcorporate:"天天生鲜",
              cgaddress:"湖南天天生鲜地址"
            },
            //添加需要的商品
            tjsp:[],
            //供货商
            ghs:[],
            total:0,
            pageNo:1,
            pageSize:20,
            search:"",
            //展示供货商商品
            tableData:[],
            gid:0,
            caigo:[],
            cgdanshow:false,
            na:[],
            yloginname:""
          }
      },
    methods:{
      tjshengqingdan(){
        if(this.na.length==0){
          return false;
        }
        var arrcg = []
        arrcg.push(this.cg)
        var cgzhi = JSON.stringify(arrcg)
        var zfj = {
          headers: {
            'Content-Type':'application/json;charset=UTF-8'
          }
        }
        this.$confirm('是否提交采购申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("cg/cginsert.action",cgzhi,zfj).then(value => {
            if(value.data!="" || value.data!=0){
              this.cgxiangxi(value.data)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消申请'
          });
        });


      },
      cgxiangxi(id){
        this.na.forEach(value => {
          value.gscount = id
        })
        var cgxx = JSON.stringify(this.na)
        var zfj = {
          headers: {
            'Content-Type':'application/json;charset=UTF-8'
          }
        }
        this.$axios.post("cgxx/cgxxinsert.action",cgxx,zfj).then(value => {
          if(value.data>=1){
            this.$notify({
              title: "提示",
              message: "采购单申请成功",
              type: 'success',
              duration: 2000
            });
            this.cgdanshow = false
          }
        })
      },
      checkboxT(row) {
        if (row.gscount == 0) {
          return false;//禁用
        } else {
          return true;//不禁用
        }
      },
      qx(value){
        this.na =  value
      },
      ddsqxz(val){
        this.na =  val
      },
          //采购数量
      handleChange(gsid){
        this.tjsp.forEach(value=>{
          if(value.gsid==gsid){
            var xj = parseInt(value.gsprice)*parseInt(value.zb_num)
            value.zb_xj = xj
          }
        })
      },
          tj(){
            var yloginname = sessionStorage.getItem("yloginname");
            var yg = sessionStorage.getItem("ygid");
            this.cg.ygid = yg;
            this.yloginname = yloginname

            this.caigo.forEach(value=>{
              value.zb_xj = value.gsprice
            })
            this.tjsp = this.caigo
            this.cgdanshow = true
           },
          //获取到需要采购商品的值
      handleSelectionChange(val){
        this.caigo = val
      },
      currentPage(val){
        this.pageNo = val
        this.All()
      },
      ghssp(e){
        this.gid = parseInt(this.activeTab)
        var param =  new URLSearchParams();
        param.append("pageNo",this.pageNo)
        param.append("pageSize",this.pageSize)
        param.append("gid",this.gid)
        this.$axios.post("ghs/ghsspAll.action",param).then(value => {
          this.tableData = value.data.list
          this.total =  value.data.total
        })
      },
          ghsAll(){
            this.$axios.post("ghs/ghsAll.action").then(value=>{
              this.ghs = value.data
            })
          },
      All(){
        var param =  new URLSearchParams();
        param.append("pageNo",this.pageNo)
        param.append("pageSize",this.pageSize)
        param.append("gid",parseInt(this.activeTab))
        this.$axios.post("ghs/ghsspAll.action",param).then(value => {
          this.tableData = value.data.list
          this.total =  value.data.total
        })
      }
    },
      created() {
          this.ghsAll()
          this.All()
      },
      filters:{
          fh(value){
            return value+"¥"
          }
      },
      computed:{
        he:function () {
          var he = 0;
          this.na.forEach(zhi=>{
            this.tjsp.forEach(value=>{
              if(value.gsid==zhi.gsid){
                   he += parseInt(zhi.zb_xj);
              }
            })
          })
          this.cg.cgallmoney = he
          return he;
        }
      }
    }
</script>

<style>
  .el-table-filter {
    max-height: 300px;
    overflow: auto;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .div1{
    width: 270px;
  }
  .el-input el-input--mini{
    width: 100px;
  }
  .el-scrollbar__bar.is-vertical {
    opacity: 1;
    width: 5px;
  }

  .el-select-dropdown{
    max-width: 243px;
  }
  .el-select-dropdown__item{
    display: inline-block;
  }
  .el-select-dropdown__item span {
    min-width: 105px;
    display: inline-block;
  }
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    /*-webkit-box-shadow: 0 1px 3px rgb(0 0 0  30%);*/
    /*box-shadow: 0 1px 3px rgb(0 0 0 30%);*/
    box-sizing: border-box;
    width: 90%;
  }
</style>
