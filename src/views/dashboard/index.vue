<template>
  <div class="components-container box_container">
    <split-pane
      split="horizontal"
      @resize="resize"
      :min-percent="5"
      :default-percent="10"
    >
      <template slot="paneL">
        <!-- 标题 -->
        <topTitle :equipmentName="equipmentName" :equipmentIp="equipmentIp" />
      </template>
      <template slot="paneR">
        <split-pane split="vertical" :default-percent="25">
          <template slot="paneL">
            <!-- 左侧 -->
            <leftStatus
              :flowOption1="flowOption1"
              :flowOption2="flowOption2"
              :speedOption1="speedOption1"
              :speedOption2="speedOption2"
              :temperatureOption1="temperatureOption1"
              :temperatureOption2="temperatureOption2"
              :humidityOption1="humidityOption1"
              :humidityOption2="humidityOption2"
              :statusList="statusList"
              :suctionCupGasOption="suctionCupGasOption"
              :cylinderGasOption="cylinderGasOption"
              :suctionNozzleLifeOption="suctionNozzleLifeOption"
              :powerConsumptionOption="powerConsumptionOption"
            />
          </template>
          <template slot="paneR">
            <split-pane split="vertical" :default-percent="67">
              <template slot="paneL">
                <split-pane split="horizontal" :default-percent="65">
                  <template slot="paneL">
                    <!-- 中间视频 -->
                    <middleVideo />
                  </template>
                  <template slot="paneR">
                    <!-- 中间底部表格 -->
                    <BottomInfoList />
                  </template>
                </split-pane>
              </template>
              <template slot="paneR">
                <!-- 右侧 -->
                <rightDataAlarm :dataAnalysis="dataAnalysis" />
              </template>
            </split-pane>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>
<script>
import splitPane from "vue-splitpane";
import topTitle from "./components/topTitle.vue";
import leftStatus from "./components/leftStatus.vue";
import rightDataAlarm from "./components/rightDataAlarm.vue";
import bottomInfoList from "./components/bottomInfoList.vue";
import BottomInfoList from "./components/bottomInfoList.vue";
import middleVideo from "./components/middleVideo.vue";
import { fetchData, fetchLeftStatusData } from "@/api/dashboard";

export default {
  components: {
    splitPane,
    topTitle,
    leftStatus,
    rightDataAlarm,
    bottomInfoList,
    BottomInfoList,
    middleVideo,
  },
  data() {
    return {
      constants: {},
      equipmentName: "AIOT五号机",
      equipmentIp: undefined,
      statusList: {
        speedOption1: { min: 0, max: 180, data: 70 },
        speedOption2: { min: 0, max: 100, data: 70 },
        flowOption1: { min: 0, max: 120, data: 70 },
        flowOption2: { min: 0, max: 140, data: 70 },
        temperatureOption1: { min: 0, max: 180, data: 70 },
        temperatureOption2: { min: 0, max: 100, data: 70 },
        humidityOption1: { min: 0, max: 120, data: 70 },
        humidityOption2: { min: 0, max: 140, data: 70 },
        suctionCupGasOption: { min: 0, max: 100, data: 70, optionData: 70 },
        cylinderGasOption: { min: 0, max: 100, data: 70, optionData: 70 },
        suctionNozzleLifeOption: { min: 0, max: 100, data: 70, optionData: 70 },
        powerConsumptionOption: { min: 0, max: 100, data: 70, optionData: 70 },
      },
      dataAnalysis: {
        planQty: 0,
        nowQty: 0,
        completionRate: 0,
      },
    };
  },
  mounted() {
    this.equipmentIp = this.$route.params.equipmentIp;
    console.log("123" + this.equipmentIp + "456");
    this.fatchData();
    this.fetchLeftStatusData();
  },
  created() {
    // this.fatchData();
  },
  updated() {
    //this.fatchData();
  },
  computed: {
    speedOption1() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.speedOption1.min,
            max: this.statusList.speedOption1.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.speedOption1.data,
              },
            ],
          },
        ],
      };
    },
    speedOption2() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.speedOption2.min,
            max: this.statusList.speedOption2.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.speedOption2.data,
              },
            ],
          },
        ],
      };
    },
    flowOption1() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.flowOption1.min,
            max: this.statusList.flowOption1.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.flowOption1.data,
              },
            ],
          },
        ],
      };
    },
    flowOption2() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.flowOption2.min,
            max: this.statusList.flowOption2.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.flowOption2.data,
              },
            ],
          },
        ],
      };
    },
    temperatureOption1() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.temperatureOption1.min,
            max: this.statusList.temperatureOption1.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.temperatureOption1.data,
              },
            ],
          },
        ],
      };
    },
    temperatureOption2() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.temperatureOption2.min,
            max: this.statusList.temperatureOption2.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.temperatureOption2.data,
              },
            ],
          },
        ],
      };
    },
    humidityOption1() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.humidityOption1.min,
            max: this.statusList.humidityOption1.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.humidityOption1.data,
              },
            ],
          },
        ],
      };
    },
    humidityOption2() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.humidityOption2.min,
            max: this.statusList.humidityOption2.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.humidityOption2.data,
              },
            ],
          },
        ],
      };
    },
    suctionCupGasOption() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.suctionCupGasOption.min,
            max: this.statusList.suctionCupGasOption.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.suctionCupGasOption.optionData,
              },
            ],
          },
        ],
      };
    },
    cylinderGasOption() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.cylinderGasOption.min,
            max: this.statusList.cylinderGasOption.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.cylinderGasOption.optionData,
              },
            ],
          },
        ],
      };
    },
    suctionNozzleLifeOption() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.suctionNozzleLifeOption.min,
            max: this.statusList.suctionNozzleLifeOption.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.suctionNozzleLifeOption.optionData,
              },
            ],
          },
        ],
      };
    },
    powerConsumptionOption() {
      return {
        series: [
          {
            name: "Pressure",
            type: "gauge",
            // 开始角度
            startAngle: 180,
            // 结束角度
            endAngle: 0,
            // 半径
            radius: 65,
            min: this.statusList.powerConsumptionOption.min,
            max: this.statusList.powerConsumptionOption.max,
            // 位置下移
            center: ["50%", "90%"],
            axisLine: {
              lineStyle: {
                // 仪表盘宽度
                width: 10,
                // 颜色渐变
              },
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#00A9FF",
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: "#00A9FF",
              },
              icon: "path://M39.66,80a17,17,0,0,1-2-.14h0A19.74,19.74,0,0,1,23.82,72a18.45,18.45,0,0,1,.44-23,19.07,19.07,0,0,1,6.59-5.17.6.6,0,0,0,.39-.52c.89-5.67,1.8-11.33,2.69-17q1.14-7.18,2.27-14.38c.52-3.32,1-6.63,1.58-9.95A2.22,2.22,0,0,1,39.57,0a2.15,2.15,0,0,1,2.3,1,4.85,4.85,0,0,1,.44,1.52q1,6.2,2,12.4.93,5.86,1.85,11.73T48,38.37c.27,1.66.53,3.32.81,5a.59.59,0,0,0,.29.4,19.38,19.38,0,0,1,7.66,6.54,18.46,18.46,0,0,1,1.38,18.57,19.27,19.27,0,0,1-7.07,7.92,20.81,20.81,0,0,1-8.2,3l-.71.1a14.7,14.7,0,0,1-1.63.09Z",
              // 指针宽度
              width: "10",
              // 指针高度
              length: "30",
            },
            // 隐藏分隔线
            splitLine: {
              show: true,
            },
            // 隐藏刻度
            axisTick: {
              show: true,
              //distance: 0, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#00A9FF",
                width: 2,
              },
            },
            // 隐藏刻度
            axisLabel: {
              show: false,
            },
            // 隐藏详情
            detail: {
              show: false,
            },
            data: [
              {
                value: this.statusList.powerConsumptionOption.optionData,
              },
            ],
          },
        ],
      };
    },
  },
  methods: {
    fatchData() {
      fetchData({ equipmentIp: this.equipmentIp }).then((response) => {
        var json = JSON.parse(response.data);
        console.log(json);
        this.equipmentName = json.machineName;
        this.setStatusList(json);
        this.setDataAnalysis(json);

        // this.dataAnalysis.numberOfPlans = this.getNumberOfPlans(
        //   new Date().getDay(),
        //   json
        // );
      });
    },
    fetchLeftStatusData() {
      console.log(this.statusList);
      fetchLeftStatusData({ equipmentIp: this.equipmentIp }).then(
        (response) => {
          var json = JSON.parse(response.data);
          this.statusList.suctionCupGasOption.data = json.suctionCupGas;
          this.statusList.suctionCupGasOption.OptionData =
            json.suctionCupGas / 1000;
          this.statusList.cylinderGasOption.data = json.cylinderGas;
          this.statusList.cylinderGasOption.optionData = json.cylinderGas / 100;
          this.statusList.suctionNozzleLifeOption.data = json.suctionNozzleLife;
          this.statusList.suctionNozzleLifeOption.optionData =
            json.suctionNozzleLife / 1000;
          this.statusList.powerConsumptionOption.data = json.powerConsumPtion;
          this.statusList.powerConsumptionOption.optionData =
            json.powerConsumPtion / 100;
        }
      );
    },
    setStatusList(val) {
      this.statusList.suctionCupGasOption.min = val.suctionCupGasMin / 1000;
      this.statusList.suctionCupGasOption.max = val.suctionCupGasMax / 1000;
      this.statusList.cylinderGasOption.min = val.cylinderGasMin / 100;
      this.statusList.cylinderGasOption.max = val.cylinderGasMax / 100;
      this.statusList.suctionNozzleLifeOption.min =
        val.suctionNozzleLifeMin / 1000;
      this.statusList.suctionNozzleLifeOption.max =
        val.suctionNozzleLifeMax / 1000;
      this.statusList.powerConsumptionOption.min =
        val.powerConsumptionMin / 100;
      this.statusList.powerConsumptionOption.max =
        val.powerConsumptionMax / 100;
    },
    setDataAnalysis(json) {
      var hour = new Date().getHours();
      var planQty = 0;
      if (hour >= 8 && hour < 20) planQty = json.dayPlanQty;
      else planQty = json.nightPlanQty;
      this.dataAnalysis.nowQty = json.nowQty;
      this.dataAnalysis.planQty = planQty;
      this.dataAnalysis.completionRate =
        (json.nowQty / planQty).toFixed(2) * 100;
    },
    getNumberOfPlans(week, val) {
      switch (week) {
        case 1:
          return val.productionMon;
        case 2:
          return val.productionThurs;
        case 3:
          return val.productionWednes;
        case 4:
          return val.productionTues;
        case 5:
          return val.productionFri;
        case 6:
          return val.productionSatur;
        default:
          val.productionSun;
      }
    },
    resize() {
      console.log("resize");
    },
  },
};
</script>
<style scoped lang="css" src="@/assets/dashboard/index.css" />
<style scoped>
.components-container {
  position: relative;
  height: 100vh;
  color: aliceblue;
}

.right-container {
  /* background-color: #fce38a; */
  height: 200px;
}
</style>
