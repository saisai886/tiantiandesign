<template>
  <div>
    <h1>个人中心</h1>
    <el-button type="success" @click="beibei">我的后台</el-button>
    <el-button type="primary" @click="laojiang">供应商后台</el-button>
    <el-button type="warning" @click="hesijie">商户后台</el-button>
  </div>
</template>

<script>
    export default {
        name: "xszgerenzhongx",
      methods:{
        beibei(){
          this.$router.push("/zb_denglu")
        },
        laojiang(){
          this.$router.push("/indexsup")
        },
        hesijie(){
          this.$router.push("/shanghuShouye")
        }

      }
    }
</script>

<style scoped>

</style>
