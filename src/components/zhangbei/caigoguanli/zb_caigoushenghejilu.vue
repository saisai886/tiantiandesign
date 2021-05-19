<template>
    <div>
      <el-table
        :data="cgdanshenghejiluAll"
        stripe
        style="width: 100%">
        <el-table-column
          prop="cgdan"
          label="采购单"
          >
        </el-table-column>
        <el-table-column
          prop="cgshentime"
          label="审核时间"
          >
        </el-table-column>
        <el-table-column
          prop="cdxxzhuangtai"
          label="状态"
          >
          <template slot-scope="scope">
            <span style="color: #78dc15" v-if="scope.row.cgzhuangtai=='c001'">
              采购单通过
            </span>
            <span style="color: red" v-if="scope.row.cgzhuangtai=='c002'">
              采购单未通过
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="primary"  @click="shenghejiluchek(scope.row.cgid)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin:25px 0px 0px -150px"
        background
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total"
        @current-change="currentPage">
      </el-pagination>



      <el-dialog :visible.sync="cgdanshenghejilushow" title="采购审核单记录" style="font-family: 新宋体">
        <div>
          <el-table
            :data="cgdanshenghexxjiluAll"
            stripe
            style="width: 100%"
            height="250">
            <el-table-column
              prop="cgid"
              label="采购编号"
              >
            </el-table-column>
            <el-table-column
              prop="gname"
              label="供应商名称"
              >
            </el-table-column>
            <el-table-column
              prop="gsname"
              label="商品名称"
             >
            </el-table-column>
            <el-table-column
              prop="cdcoun"
              label="采购数量"
              >
            </el-table-column>
            <el-table-column
              prop="cdxiaoji"
              label="小计"
             >
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              >
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.cdxxzhuangtai">
                  <el-radio label="cdxx001">通过</el-radio>
                  <el-radio label="cdxx002">不通过</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px;margin-left: 600px">
            <el-button type="primary" @click="cgdanshenghejilushow=false">
              关闭
            </el-button>
            <el-button type="primary" @click="weicgdanshenghejilushow=true">
              查询未通过商品
            </el-button>
          </div>
          <span style="float: left">
           采购商品共:{{spzs}},
            <label style="color: #78dc15">{{tg |tjtg}}</label>,
            <label style="color: red">{{btg |tjbtg}}</label>
          </span>
        </div>
      </el-dialog>


      <el-dialog :visible.sync="weicgdanshenghejilushow" title="采购审核单记录" style="font-family: 新宋体">
        <div>
          <el-table
            :data="weicgdanshenghexxjiluAll"
            stripe
            style="width: 100%"
            height="250">
            <el-table-column
              prop="cgid"
              label="采购编号"
             >
            </el-table-column>
            <el-table-column
              prop="gname"
              label="供应商名称"
              >
            </el-table-column>
            <el-table-column
              prop="gsname"
              label="商品名称"
             >
            </el-table-column>
            <el-table-column
              prop="cdcoun"
              label="采购数量"
              >
            </el-table-column>
            <el-table-column
              prop="cdxiaoji"
              label="小计"
             >
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              >
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.cdxxzhuangtai">
                  <el-radio label="cdxx001">通过</el-radio>
                  <el-radio label="cdxx002">不通过</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px;margin-left: 600px">
            <el-button type="primary" @click="weicgdanshenghejilushow=false">
              关闭
            </el-button>
         </div>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "zb_caigoushenghejilu",
      data(){
          return{
            weicgdanshenghejilushow:false,
            cgdanshenghejilushow:false,
            //采购单
            cgdanshenghejiluAll:[],
            //通过商品
            cgdanshenghexxjiluAll:[],
            //未通过
            weicgdanshenghexxjiluAll:[],
            pageNo:1,
            pageSize:5,
            total:0,
            spzs:0,
            tg:0,
            btg:0
          }
      },
      methods:{
        shenghejiluchek(cgid){
          this.cgdanshenghejilushow = true
          this.$axios.post("cgxx/cggAll.action?cgid="+cgid).then(value => {
            this.spzs = value.data.length
            var arrtg =  value.data.filter(value=>{
              return value.cdxxzhuangtai =="cdxx001"
            })
            var arrbtg =  value.data.filter(value=>{
              return value.cdxxzhuangtai =="cdxx002"
            })

             this.cgdanshenghexxjiluAll  = arrtg
             this.weicgdanshenghexxjiluAll = arrbtg
             this.tg = arrtg.length
             this.btg= arrbtg.length
          })
        },
        currentPage(value){
          this.pageNo = value
          this.cgshenghejiluAll()
        },
        cgshenghejiluAll(){
          var param =  new URLSearchParams();
          param.append("pageNo",this.pageNo)
          param.append("pageSize",this.pageSize)
          this.$axios.post("cg/cgshjlAll.action",param).then(value => {
            this.cgdanshenghejiluAll = value.data.list
            this.total  =  value.data.total
          })
        }
      },
      created() {
          this.cgshenghejiluAll()
      },
      filters:{
          tjtg(value){
            return "通过商品数量:"+value;
          },
         tjbtg(value){
          return "未通过商品数量:"+value;
        }
      }
    }
</script>

<style>
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    /*-webkit-box-shadow: 0 1px 3px rgb(0 0 0  30%);*/
    /*box-shadow: 0 1px 3px rgb(0 0 0 30%);*/
    box-sizing: border-box;
    width: 65%;
  }
</style>
