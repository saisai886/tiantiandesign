
<template>
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
                 if(val.data=="登陆成功"){
                   this.$notify({
                     title: val.data,
                     message: "欢迎"+this.form.name,
                     type: 'success',
                     duration:2000
                   });
                    this.$router.push("/zb_hotai")
                 }else {
                   this.$notify.error({
                     title: '错误',
                     message: val.data,
                     duration:2000
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
    margin-left:150px;
    margin: auto;
    border: 1px solid #DCDFE6;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px #DCDFE6;
  }

</style>
