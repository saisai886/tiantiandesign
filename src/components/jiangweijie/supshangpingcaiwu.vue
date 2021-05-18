<template>
  <div id="main" style="width: 600px;height:500px;">

  </div>
</template>

<script>
  import * as echarts from "echarts";

  export default {
  name: "supshangpingcaiwu",
  data() {
    return {
      names:"",
      value:1,
      zhi:[]
    };
  },
  methods: {
    getmenus(){
      var user=JSON.parse(sessionStorage.getItem("xszuser")) //拿到保存的用户
      var params = new URLSearchParams();
      params.append("uid",user.uid);//查询商户所需ID
      var _this =this;
      this.$axios.post("jwjgystj/GongYingshangCaiwuuTongji.action",params).then(function (response) {
        var st = Object.keys(response.data)
        var st2 = Object.values(response.data)
        var gyscaiwu={}
        for (var i = 0; i < st.length; i++) {
          for (var j = 0; j < st2.length; j++) {
            _this.names = st[i]
            _this.value =  st2[i]
            gyscaiwu = {name: _this.names, value: _this.value}
          }

          _this.zhi.push(gyscaiwu)
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
