<template>

  <div>

    <div style="float: left;color: limegreen"><h3>请注册...</h3></div>

    <div style="clear: both"></div>
    <el-form :model="zhuceform" ref="zhuceform" :rules="rules">

      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" suffix-icon="el-icon-user-solid" v-model="zhuceform.username" clearable="clearable">
        </el-input>
      </el-form-item>

      <el-form-item style="margin-top: 30px" prop="pwdone">
        <el-input type="password" placeholder="请输入密码" suffix-icon="el-icon-s-platform" v-model="zhuceform.pwdone" clearable="clearable">
        </el-input>
      </el-form-item>

      <el-form-item style="margin-top: 30px" prop="pwdtwo">
        <el-input type="password" placeholder="请重复密码" suffix-icon="el-icon-s-platform" v-model="zhuceform.pwdtwo" clearable="clearable">
        </el-input>
      </el-form-item>

      <el-form-item style="margin-top: 30px">
        <el-button type="primary" @click="zhuce('zhuceform')">注   册</el-button>
        <el-button type="primary" @click="reset('zhuceform')">重   置</el-button>

      </el-form-item>


    </el-form>




  </div>


</template>

<script>
    export default {
        name: "xszzhuce",
      data(){

          var passone=(rule,value,callback)=>{
            if(value===''){
              callback(new Error('请输入密码'))
            }else{
              if(this.zhuceform.pwdtwo!==''){
                this.$refs.zhuceform.validateField('pwdtwo')
              }
              callback();
            }
          }

          var passtwo=(rule,value,callback)=>{
            if(value===''){
              callback(new Error('请再次输入密码'))
            }else if(value !==this.zhuceform.pwdone){
              callback(new Error('两次密码输入不一致'))
            }else {
              callback();
            }
        }






          return{
            zhuceform:{
              username:"",
              pwdone:"",
              pwdtwo:"",
            },

            rules:{
              username:[
                {required:true,message:'请输入用户名',trigger:'blur'}
              ],

              pwdone:[
                {validator:passone,trigger: 'blur'}
              ],

              pwdtwo:[
                {validator:passtwo,trigger:'blur'}
              ]


            }




          }
      },

      methods:{
        reset(zhuceform){
          this.$refs[zhuceform].resetFields();
        },
        open(){
          this.$message({
            message: '该用户已有,重新注册',
            type: 'error'
          });
        },
        open1(){
          this.$message({
            message: '注册成功',
            type: 'success'
          });

        },


        //注册
        zhuce(zhuceform){
             this.$refs[zhuceform].validate((valida)=>{
               if (valida){
               var _this=this

                 var params=new URLSearchParams();
               params.append('uname',this.zhuceform.username);
               params.append("upawssword",this.zhuceform.pwdone)


                  this.$axios.post("/xszuser/xszfundusername.action",params).then(function (value){

                       if(value.data==false){
                        _this.open()
                       }
                       _this.open1()
                    var da={uname:_this.zhuceform.username,upawssword:_this.zhuceform.pwdone}
                     _this.$emit("user",da)

                  }).catch(function () {
                    alert("错误异常")
                  })





               //写到这里老蒋
                 //做查询操作看用户名存不存在 不存在就新增在回调函数里面再做新增请求
                 //存在的提示用户已存在 return false;
                 //注意一下我在xszweilcom做的动态组件 传值问题可以看一下那个动态组件后面加的属性








               }else{
                 return false;
               }

             })
        }

      }
    }
</script>

<style scoped>

</style>
