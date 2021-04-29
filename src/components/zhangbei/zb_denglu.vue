
<template>
  <div id="div1">
   <div id="div">
    <h2>商城后台登录</h2>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" type="text" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :plain="true" type="primary" @click="djdl('form')">登录</el-button>
        <el-button @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          form:{
            name:"",
            password:""
          },
          rules:{
            name:[{
              required:true,
              message:"请输入用户名",
              trigger:'blur'
            }],
            password:[{
              required:true,
              message:"请输入密码",
              trigger:'blur'
            }]
          }
        }
      },
      methods:{
        djdl(formname){
          var params = new URLSearchParams()
          params.append("yloginname",this.form.name)
          params.append("ygpwd",this.form.password)

          this.$refs[formname].validate(valid=>{
            if(valid){
              this.$axios.post("ygdl/ygdenglu.action",params).then(val=> {

                if(val.data!=""){
                   this.$notify({
                     title: "登入成功",
                     message: "欢迎"+this.form.name,
                     type: 'success',
                     duration:1000
                   });
                    sessionStorage.setItem("yg",val.data);
                    sessionStorage.setItem("yloginname",val.data.yloginname);
                    sessionStorage.setItem("ygid",val.data.ygid);
                    this.$store.commit('setsessios',val.data)
                    this.$router.push("/zb_hotai")
                 }else {
                   this.$notify.error({
                     title: '错误',
                     message: "用户名或密码错误",
                     duration:1000
                   });
                 }
              })
            }else {
              this.$message({
                showClose: true,
                message: '请输入用户名或密码',
                type: 'error'
              });
              return false
            }
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  #div{
    width: 350px;
    margin: 0px 0px 0px 800px;
    border: 1px solid #DCDFE6;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    top: 160px;
    background-color: white;
  }
  #div1{
    width: 100%;
    height: 664px;
    background-image:url("../../imagedesign/后台绿色后台.jpg");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }

</style>
