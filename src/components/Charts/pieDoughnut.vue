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
        tooltip: {
          trigger: "item"
        },
        legend: {
          top: "5%",
          left: "center",
          show: false
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "80%"],
            center: ["40%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" }
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