<template>
    <div style="width: 500px;margin: auto">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商户名称" prop="shname">
          <el-input v-model="ruleForm.shname"></el-input>
        </el-form-item>
        <el-form-item label="负责人姓名" prop="shfuzename">
          <el-input v-model="ruleForm.shfuzename"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="shphone">
          <el-input v-model="ruleForm.shphone"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="shfuzecard">
          <el-input v-model="ruleForm.shfuzecard"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="shzhizhao">
<!--          <input type="file" v-bind="ruleForm.shzhizhao"  @change="getFile($event)"></input>-->
<!--          <img :src="'http://127.0.0.1:8090/tian/'+ruleForm.shzhizhao"   width="60px" height="60px">-->
<!--          -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
            :on-change="filess"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
           <el-form-item label="注册日期" prop="name">
          <span>{{ruleForm.shzhucetime}}</span>
        </el-form-item>

        <el-form-item label="店铺地址" prop="shaddr">
          <el-input type="textarea" v-model="ruleForm.shaddr"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Ziliaoweihu",
      data() {
        return {
          ruleForm: {},
          fileList:[],
          rules: {
            shname: [
              { required: true, message: '请输入商户名称', trigger: 'blur' }
            ],
            shfuzename: [
              { required: true, message: '请输入负责人姓名', trigger: 'blur' }
            ],
            shphone: [
              { required: true, message: '请输入联系方式', trigger: 'blur' },
              { min: 9, max: 11, message: '长度在 9 到 11 个字符', trigger: 'blur' }
            ],
            shfuzecard: [
              { required: true, message: '请输入身份证', trigger: 'blur' },
              { min: 18, max: 18, message: '长度在 18字符', trigger: 'blur' }
            ],
            fileList: [
              { required: true, message: '请选择营业执照', trigger: 'blur' }
            ],
            shaddr: [
              { required: true, message: '请输入店铺地址', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        getmenus(){
          var user=JSON.parse(sessionStorage.getItem("xszuser")) //拿到保存的用户
          var params = new URLSearchParams();
          params.append("uid",user.uid);//查询商户所需ID
          var _this =this;
          this.$axios.post("shanhuziliaoweihu/ziliaoweihu.action",params).then(function (response) {
            _this.fileList=[]
            var d={name:response.data.shzhizhao,shid:0}  //自定义文件赋值
            _this.fileList.push(d)
            _this.ruleForm=response.data
          }).catch();
        },
        filess(item,filet){ //文件添加赋值
          this.ruleForm.shzhizhao=item.name
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              let Obj = JSON.stringify(this.ruleForm);
              let config = {
                headers: {
                  "Content-Type": "application/json;charsetset=UTF-8"
                },
              };
              this.$axios.post("shanhuziliaoweihu/ziliaoweihuUpdate.action",Obj,config).then(function (response) {
                _this.getmenus();
              }).catch();
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      created() {
          this.getmenus();
      }
    }
</script>

<style scoped>

</style>
