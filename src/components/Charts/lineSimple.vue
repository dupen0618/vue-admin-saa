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
      default: "lineSample"
    },
    id: {
      type: String,
      default: "lineSample"
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
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
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