<template>
     <div>

       <el-dialog title="审核信息" :visible.sync="dialogTableVisible">
         <el-table
           :data="gridData"
           style="width: 100%">
           <el-table-column type="expand">
             <template slot-scope="props">
               <el-form label-position="left" inline class="demo-table-expand">
                 <el-form-item label="公司名称">
                   <span>{{ props.row.gname }}</span>
                 </el-form-item>
                 <el-form-item label="地址">
                   <span>{{ props.row.gaddre }}</span>
                 </el-form-item>
                 <el-form-item label="电话">
                   <span>{{ props.row.gphone }}</span>
                 </el-form-item>
                 <el-form-item label="主体类型">
                   <span>{{ props.row.gzhutitype }}</span>
                 </el-form-item>
                 <el-form-item label="法人姓名">
                   <span>{{ props.row.gfaname }}</span>
                 </el-form-item>
                 <el-form-item label="营业执照">
                   <img :src="'http://127.0.0.1:8090/tian/'+props.row.gyingyeimg"   width="60px" height="60px">
                 </el-form-item>
               </el-form>
             </template>
           </el-table-column>

           <el-table-column property="gsname" label="商品名称"></el-table-column>
           <el-table-column property="gsprice" label="单价" ></el-table-column>
           <el-table-column property="cdcoun" label="采购数量" ></el-table-column>
           <el-table-column property="gsmiaoshu" label="描述"></el-table-column>
           <el-table-column  label="商品图片">
             <template scope="scope">
               <div :style="scope.row.gsimg">
                 <img :src="'http://127.0.0.1:8090/tian/'+scope.row.gsimg"   width="60px" height="60px">            </div>
             </template>
           </el-table-column>

         </el-table>
         <el-button @click="dialogTableVisible = false">取 消</el-button>
         <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
       </el-dialog>
       <el-table
         fit="fit"
         :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
         style="width: 100%">
         <el-table-column
           label="采购单号"
           prop="cgdan">
         </el-table-column>
         <el-table-column
           label="采购人"
           prop="ygname">
         </el-table-column>
         <el-table-column
           label="采购商城"
           prop="cgcorporate">
         </el-table-column>
         <el-table-column
           label="商城收货地址"
           prop="cgaddress">
         </el-table-column>
         <el-table-column
           label="总金额"
           prop="cgallmoney">
         </el-table-column>
         <el-table-column
           label="审核时间"
           prop="ckshenhetime"
           width="150px"
         >
         </el-table-column>
         <el-table-column
           label="状态">
           <template scope="scope">
             <div :style="scope.row.ckzhuangtai">
               {{scope.row.ckzhuangtai=='s001'?'已入库':'未入库'}}
             </div>
           </template>
         </el-table-column>


         <el-table-column
           align="right">
           <template slot="header" slot-scope="scope">
             <el-input
               v-model="cgdan"
               size="mini"
               placeholder="输入采购单号搜索"
               @input="ss"
             />
           </template>
           <template slot-scope="scope">
             <el-button type="primary" icon="el-icon-search"
                        @click="shenhequery(scope.$index, scope.row)">查询</el-button>
           </template>
         </el-table-column>
       </el-table>
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
        name: "RukuShengHeJilu",
      data() {
        return {
          tableData: [],
          total:0,
          pageNo:1,
          pageSize:5,
          search:"",
          cgdan:"",
          gridData: [],
          dialogTableVisible:false,
          formLabelWidth: '250px',
        }

        },
      methods:{
        getmenu(){
          var _this =this;
          var params = new URLSearchParams();
          params.append("cgdan",this.cgdan);  //查询条件
          params.append("pageNo",this.pageNo); //分页
          params.append("pageSize",5);
          this.$axios.post("rukus/rukuShenheshow.action",params).then(function (response) {
            _this.total=response.data.total
            _this.tableData = response.data.list;
          }).catch();
        },
      fenye(val){
        this.pageNo =val;
        this.getmenu()
      },
        shenhequery(index, row){
          this.dialogTableVisible=true
          var _this =this;
          var params = new URLSearchParams();
          params.append("cgid",row.cgid);  //查询条件
          this.$axios.post("rukus/rukuShenheJilushowIds.action",params).then(function (response) {
            _this.gridData = response.data;
          }).catch();
               console.log(row)
        },
      ss(){
        this.getmenu()
      }

      },
      created() {
          this.getmenu()
      }

    }
</script>

<style scoped>
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
</style>
