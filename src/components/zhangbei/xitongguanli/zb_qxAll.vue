<template>
    <div>
      <el-tabs @tab-click="yg1" type="border-card">
        <div class="di" :style="dis2">
          <span>请选择员工:</span>
          <el-select @change="ygxz" v-model="ygvalue" clearable placeholder="请选择">
            <el-option
              v-for="item in yg"
              :key="item.ygid"
              :label="item.ygname"
              :value="item.ygid">
            </el-option>
          </el-select>
        </div>
        <el-tab-pane label="为员工赋予角色" style="height: 330px;">
          <div style="margin-top: 20px;float: left;width: 50%;height: 100%">
            <el-checkbox-group  v-model="checkboxGroup1" size="small">
              <div>
              <el-checkbox v-for="r in role" :label="r.rid" border>
                {{r.rname}}
              </el-checkbox>
          </div>
              </el-checkbox-group>
          </div>
          <div  class="buttons">
            <el-button @click="ygjsqr" style="margin: 300px 0px 0px 0px">确定</el-button>
          </div>
        </el-tab-pane>

        <div class="di" :style="dis1">
          <span>输入关键字:</span>
          <el-input style="width: 215px"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
          </el-input>
          <br>
          <br>
          <br>
          <span>请选择角色:</span>
          <el-select @change="xz" v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in role"
              :key="item.rid"
              :label="item.rname"
              :value="item.rid">
            </el-option>
          </el-select>
        </div>

        <el-tab-pane label="为角色赋予权限" style="height: 100%;width: 60%;">
          <el-tree
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :filter-node-method="filterNode"
            check-strictly="check-strictly"
            :props="defaultProps">
          </el-tree>
          <div class="buttons">
            <el-button @click="getHalfCheckedKeys">确定</el-button>
            <el-button @click="resetChecked">清空</el-button>
          </div>

        </el-tab-pane>

      </el-tabs>
    </div>
</template>

<script>
    export default {
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
         }
        },
      data() {
        return {
          ygvalue:"",
          yg:[],
          checkboxGroup1: [],
          dis1:'display:none',
          dis2:'display:block',
          role:[],
          value:"",
          filterText:"",
          data: [],
          defaultProps: {
            children: 'children',
            label: 'label',
            id:'id'
          }
        }
      },
      methods: {
        ygjsqr(){
          if(this.ygvalue==""){
            alert("请选择员工")
            return false;
          }
          var arr = []
          if(this.checkboxGroup1.length==0){
            arr.push({
              rid:0,
              ygid:this.ygvalue
            })
          }
          this.checkboxGroup1.forEach(value=>{
            arr.push({
              rid:value,
              ygid:this.ygvalue
            })
          })
        var zhi =  JSON.stringify(arr)
        var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$axios.post("ygjs/ygjsinsert.action",zhi,zfj).then(value=>{
              this.$notify({
                title: "提示",
                message: "授权成功",
                type: 'success',
                duration: 1000
              });
              this.ygxz()
          })
        },
        ygxz(){
          this.$axios.post("js/ygjsAll.action?ygid="+this.ygvalue).then(value => {
              var arr = []
              value.data.forEach(value=>{
                 arr.push(value.rid)
              })
            this.checkboxGroup1 = arr
          })
        },
        ygAll(){
          this.$axios.post("ygdl/yglist.action").then(value => {
            this.yg = value.data
          })
        },
        xz(){
         this.$axios.post("qx/jsqxAll.action?rid="+this.value).then(value => {
            var arr = []
            value.data.forEach(value=>{
             arr.push(value.pid)
           })
           console.log(value.data)
           // this.$refs.tree.setCheckedNodes(value.data);
           this.$refs.tree.setCheckedKeys(arr);
         })
        },
        //获取确认
        getHalfCheckedKeys(){
          if(this.value==""){
            alert("请选择角色")
            return false;
          }
         var pid = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
         var arr = []
          if(pid.length==0){
            arr.push({
              pid:0,
              rid:this.value
            })
          }
          pid.forEach(value=>{
            arr.push({
              pid:value,
              rid:this.value
            })
          })
          var zhi = JSON.stringify(arr)
          var zfj = {
            headers: {
              'Content-Type':'application/json;charset=UTF-8'
            }
          }
          this.$axios.post("jsqx/jsqxinsert.action",zhi,zfj).then(value => {
              this.$notify({
                title: "提示",
                message: "授权成功",
                type: 'success',
                duration: 1000
              });
            this.sqA1l()
            this.xz()
          })
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        yg1(e){
          if(e.label=="为角色赋予权限"){
            this.dis1 = 'display:block'
            this.dis2 = 'display:none'
          }else {
            this.dis1 = 'display:none'
            this.dis2 = 'display:block'
          }
        },
        //设置
        setCheckedKeys() {
          this.$refs.tree.setCheckedKeys([3]);
        },
        resetChecked() {
          this.$refs.tree.setCheckedKeys([]);
        },
        sqA1l(){
          this.$axios.post("qx/sqAll.action").then(value=>{
            this.data = value.data
          })
        },
        roleAll(){
          this.$axios.post("js/roleAll.action").then(value => {
             this.role = value.data
          })
        }
      },
      created() {
        this.sqA1l()
        this.roleAll()
        this.ygAll()
      }
    }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .di{
   width: 40%;
    height: 100%;
    opacity: inherit;
    left: 10px;
    float: right;
  }

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
  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 13px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-checkbox.is-bordered.el-checkbox--small {
    margin: 0px 35px 20px 67px;
    padding: 5px 15px 5px 10px;
    border-radius: 3px;
    height: 32px;
  }
</style>
