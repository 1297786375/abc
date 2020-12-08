<template>
  <div>
    <div
      id="main"
      style="width: 1100px; height: 400px; border: 1px solid #ccc"
    ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      classarr: "classlist/classarr",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      reqclassify: "classlist/reqclassify",
    }),
  },
  watch: {
    classarr: {
      handler() {
        var myChart = echarts.init(document.getElementById("main"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "近一周的订单数量",
          },
          tooltip: {},
          legend: {
            data: ["销量"], 
          },
          xAxis: {
            data: this.classarr.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: this.classarr.map((item) => item.children.length),
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  mounted() {
    this.reqclassify();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: this.classarr.map((item) => item.catename),
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: this.classarr.map((item) => item.children.length),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>
<style>
</style>