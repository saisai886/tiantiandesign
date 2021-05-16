<template>
    <div id="app">
      <div id="main" style="width: 400px;height:300px;float: left"></div>
      <div id="main2" style="width: 400px;height:300px;float: right"></div>
    </div>
</template>

<script>
  import * as echarts from 'echarts';
    export default {
        name: "Tongjiyingshou",
      data(){
        return {
            jiliruen: [],
            jiliruenname:[]
        }
      },
      methods:{
          getdate(){
            var user=JSON.parse(sessionStorage.getItem("xszuser")) //拿到保存的用户
            var params = new URLSearchParams();
            params.append("uid",user.uid);//查询商户所需ID
            var _this =this;
            this.$axios.post("hsjshanghu/yingyeliruen.action",params).then(function (response) {
               _this.jiliruenname= ['2021','2022']
              _this.jiliruen=response.data
            }).catch();
          },
          echart(){
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
              title: {
                text: '营业利润',
                subtext: '全年收入(元)',
                left: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: this.jiliruenname,
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '直接访问',
                  type: 'bar',
                  barWidth: '60%',
                  data: this.jiliruen
                }
              ]
            };

            option && myChart.setOption(option);
          }

      },
  mounted() {
    this.echart();
  },
      created() {
          this.getdate()
      },
      watch:{
          jiliruen: function(newval,oldval) {
             this.echart()
          },
          jiliruenname: function(newval,oldval) {
             this.echart()
          },
          deep:true


      }

    }
</script>

<style scoped>

</style>
