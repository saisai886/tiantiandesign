<template>
    <div id="main" style="width: 600px;height:500px;">

    </div>
</template>

<script>
  import * as echarts from 'echarts';
    export default {
        name: "GongYingshangTongji",
      data(){
        return {
          // zhi:[{name:this.name}]
           names:"",
          value:1,
          zhi:[]
        }

      },
      methods:{
        getmenus(){
          var _this=this
          this.$axios.post("hsjtongji/GongYingshangTongjiShow.action").then(function (response) {
            for (var i=0;i<response.data.length;i++){
              _this.names=response.data[i].gname
              _this.value=1
              var gys={name:_this.names,value:_this.value}
              _this.zhi.push(gys)
            }
             console.log( _this.zhi)
          }).catch();
        },
          echarts(){
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
              tooltip: {
                trigger: 'item'
              },
              legend: {
                top: '5%',
                left: 'center'
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '40',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data:this.zhi

                }
              ]
            };

            option && myChart.setOption(option);

          }
      },
      mounted() {
        this.echarts();
      },
      created() {
          this.getmenus()
      },
      watch:{
        zhi: function(newval,oldval) {
          this.echarts()
        },
        deep:true


      }
    }
</script>

<style scoped>

</style>
