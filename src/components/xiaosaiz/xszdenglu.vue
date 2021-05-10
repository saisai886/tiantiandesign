<template>
    <div>

      <div style="float: left;color: orange"><h3>您好,请登录</h3></div>
      <div style="clear: both"></div>

      <el-form :model="loginuser" ref="loginuser" :rules="rules">

        <el-form-item  prop="username">
          <el-input placeholder="请输入用户名" suffix-icon="el-icon-user-solid" v-model="loginuser.username" clearable="clearable">
          </el-input>
        </el-form-item>

        <el-form-item style="margin-top: 40px" prop="passwpod">
          <el-input type="password" placeholder="请输入密码" suffix-icon="el-icon-s-platform" v-model="loginuser.passwpod" clearable="clearable">
          </el-input>
        </el-form-item>

        <el-form-item style="margin-top: 40px">
          <el-button type="primary" @click="login('loginuser')">登   录</el-button>
          <el-button type="primary" @click="reset('loginuser')">重   置</el-button>

        </el-form-item>


      </el-form>



    </div>
</template>

<script>
    export default {
        name: "xszdenglu",
       data(){
          return {
            loginuser:{
              username:"",
              passwpod:""
            },
            rules:{
              username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              passwpod:[
                { required: true, message: '请输入密码', trigger: 'blur' },
              ]
            }


          }
       },



      methods:{
        reset(formname){
          this.$refs[formname].resetFields();
        },
        login(loginuser){
           this.$refs[loginuser].validate((valida)=>{
             if(valida){

             var params=new URLSearchParams();
             params.append("uname",this.loginuser.username)
             params.append("upawssword",this.loginuser.passwpod)

               var _this=this

               this.$axios.post("xszuser/xszlogin.action",params).then(function (val) {
                 if (val.data!=""){
                   //登录成功
                  console.log(val.data)
                   _this.$message({
                     message:"欢迎您"+val.data.uname,
                     type:"success",
                     showClose:true
                   })

                   _this.$emit("user",val.data)

                 }else {
                   //登录失败 账户密码不正确
                   _this.$notify({
                     title:"登录失败",
                     type:"error",
                     message:"您输入的账户名密码不正确请重新输入",
                     duration:5000
                   })
                 }
               }).catch()
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
