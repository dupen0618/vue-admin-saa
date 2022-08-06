<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
import { EleResize } from "@/utils/esresize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "thermometerChart"
    },
    id: {
      type: String,
      default: "thermometerChart"
    },
    width: {
      type: String,
      default: "50px"
    },
    height: {
      type: String,
      default: "50px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id), null, {
        renderer: "canvas",
        useDirtyRect: false
      });
      let resizeDiv = document.getElementById(this.id);

      var option;

      option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            //radius: '15',
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: "#FFAB91"
            },
            progress: {
              show: true,
              width: 10
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              distance: -16,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: "#999"
              }
            },
            splitLine: {
              distance: -20,
              length: 14,
              lineStyle: {
                width: 3,
                color: "#999"
              }
            },
            axisLabel: {
              distance: -20,
              color: "#999",
              fontSize: 20,
              show: false
            },
            anchor: {
              show: false
            },
            title: {
              offsetCenter: [0, "90%"] //设置完成率位置
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-15%"],
              fontSize: 10,
              fontWeight: "bolder",
              formatter: "{value} °C",
              color: "auto"
            },
            data: [
              {
                value: 20,
                name: "温度"
              }
            ]
          },
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: "#FD7347"
            },
            progress: {
              show: true,
              width: 3
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 20
              }
            ]
          }
        ]
      };
      var cha = this.chart;
      setInterval(function() {
        const random = +(Math.random() * 60).toFixed(2);
        cha.setOption({
          series: [
            {
              data: [
                {
                  value: random,
                  name: "温度"
                }
              ]
            },
            {
              data: [
                {
                  value: random
                }
              ]
            }
          ]
        });
      }, 2000);

      if (option && typeof option === "object") {
        this.chart.setOption(option);
      }

      let listener = function() {
        this.chart.resize();
      };
      EleResize.on(resizeDiv, listener);
    }
  }
};
</script>