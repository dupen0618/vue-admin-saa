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
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
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
            progress: {
              show: true,
              width: 10
            },
            axisLine: {
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: "#999"
              }
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 20,
              show: false
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 5
              }
            },
            title: {
              offsetCenter: [0, "115%"] //设置完成率位置
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              offsetCenter: [0, "70%"]
            },
            data: [
              {
                value: 70,
                name: "速度"
              }
            ]
          }
        ]
      };

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