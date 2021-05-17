<template>
  <div>

    <el-dialog title="仓库信息" :visible.sync="dialog">
      <el-form v-model="cangku"  >
        <el-form-item label="请选择仓库名称"   :label-width="formLabelWidth">
          <el-select v-model="cangku.scid"      clearable  placeholder="请选择仓库名称">
            <el-option
              v-for="item in cangku"
              :key="item.scid"
              :label="item.scname"
              :value="item.scid"
              ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="ru">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog title="审核信息" :visible.sync="dialogTableVisible">
        <el-radio v-model="radio" label="1">通过</el-radio>
        <el-radio v-model="radio" label="2">不通过</el-radio>
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
      <el-button type="primary" @click="na">确 定</el-button>
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
        label="审核时间"
        prop="cgshentime"
        width="150px"
      >
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
        label="状态">
        <template scope="scope">
          <div :style="scope.row.cgchuku">
            {{scope.row.cgchuku=='ck001'?'已出库':'待出库'}}
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
                     @click="shenhequery(scope.$index, scope.row)">审核</el-button>
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
        name: "RukuShengHe",
      data() {
        return {
          tableData: [],
          cgdan: '',
          total:0,
          pageNo:1,
          pageSize:5,
          search:"",
          dialogTableVisible:false,
          gridData: [],
          radio:'1',
          cangku:[],
          dialog:false,
          formLabelWidth: '250px',
          cgid:0,
          cgdans:''
        }
      },
      methods: {
        getmenu(){
          var _this =this;
          var params = new URLSearchParams();
          params.append("cgdan",this.cgdan);  //查询条件
          params.append("pageNo",this.pageNo); //分页
          params.append("pageSize",5);
          this.$axios.post("rukus/rukushow.action",params).then(function (response) {
            _this.total=response.data.total
            _this.tableData = response.data.list;
          }).catch();
        },
        shenhequery(index, row) {
          this.cgid=row.cgid
          this.cgdans=row.cgdan
          this.dialogTableVisible = true
          var _this =this;
          var params = new URLSearchParams();
          params.append("cgid",row.cgid);  //查询条件
          this.$axios.post("rukus/rukuQueryId.action",params).then(function (response) {
            _this.gridData = response.data;
          }).catch();
        },
        fenye(val){
          this.pageNo =val;
          this.getmenu()
        },
        ss(){
          this.getmenu()
        },
        na(){
             if(this.radio=='1'){
               this.dialog=true
               var _this =this;
               this.$axios.post("rukus/cangkuShow.action").then(function (response) {
                 _this.cangku=response.data
               }).catch();
             }
               else  {
               this.$confirm('此操作将不通过审核, 是否继续?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 this.dialogTableVisible = false
                 var _this =this;
                 var params = new URLSearchParams();
                 params.append("cgid",this.cgid);
                 params.append("cgdan",this.cgdans);
                 this.$axios.post("rukus/cangkuShenheNo.action",params).then(function (response) {
                   console.log(1)
                   let Obj = JSON.stringify(_this.gridData);
                   let config = {
                     headers: {
                       "Content-Type": "application/json;charsetset=UTF-8"
                     },
                   };
                   _this.$axios.post("rukus/rukuInsertNos.action",Obj,config).then(function (response) {
                     _this.getmenu()
                     _this.$message({
                       type: 'success',
                       message: '操作成功！!'
                     });
                   }).catch();
                 }).catch();

               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '操作已取消'
                 });
               });
             }

        },
        ru() {
          if (this.cangku.scid == undefined || this.cangku.scid =="") {
            this.$notify({
              title: '警告',
              message: '请选择仓库',
              type: 'warning'
            });
          } else {

            this.$confirm('是否确定保存？', '确认信息', {
              distinguishCancelAndClose: true,
              confirmButtonText: '保存',
              cancelButtonText: '放弃修改'
            })
              .then(() => {
                this.dialogTableVisible = false
                this.dialog = false
                var _this =this;
                console.log(this.gridData)
                var params = new URLSearchParams();
                params.append("scid",this.cangku.scid);
                params.append("cgid",this.cgid);
                params.append("cgdan",this.cgdans);
                this.$axios.post("rukus/rukuUpdateStaus.action",params).then(function (response) {
                  let Obj = JSON.stringify(_this.gridData);
                  let config = {
                    headers: {
                      "Content-Type": "application/json;charsetset=UTF-8"
                    },
                  };
                  _this.$axios.post("rukus/rukuInsertShop.action",Obj,config).then(function (response) {

                  }).catch();

                  _this.getmenu()
                }).catch();
                this.$message({
                  type: 'info',
                  message: '保存修改'
                });
              })
              .catch(action => {
                this.$message({
                  type: 'info',
                  message: action === 'cancel'
                    ? '放弃保存'
                    : '停留在当前页面'
                })
              });

          }
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
