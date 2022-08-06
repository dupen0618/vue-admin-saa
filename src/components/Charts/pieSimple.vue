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
      default: "pieDoughnut"
    },
    id: {
      type: String,
      default: "pieDoughnut"
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
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
          show: false
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "80%",
            label: {
              normal: {
                position: "inner",
                show: false
              }
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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