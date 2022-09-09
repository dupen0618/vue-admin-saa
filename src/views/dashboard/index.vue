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
                    <middleVideo :middleVideoList="middleVideoList" />
                  </template>
                  <template slot="paneR">
                    <!-- 中间底部表格 -->
                    <BottomInfoList />
                  </template>
                </split-pane>
              </template>
              <template slot="paneR">
                <!-- 右侧 -->
                <rightDataAlarm
                  :dataAnalysis="dataAnalysis"
                  :list="dataAlarmList"
                  :alarmFrequencyOption="alarmFrequencyOption"
                />
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
import {
  fetchData,
  fetchLeftStatusData,
  fetchDataAlarmList,
  fetchAlarmFrequencyData,
  fetchMaintenanceDateAndRuningStausData,
  reloadProductionConfig,
} from "@/api/dashboard";
import { parseTime } from "@/utils";

const statusName = {
  "-99": { eng: "offline", chn: "未連線" },
  "-1": { eng: "offline", chn: "設備未開機" },
  0: { eng: "other", chn: "設備待機狀態" },
  1: { eng: "normal", chn: "設備啟動運轉中" },
  2: { eng: "alarm", chn: "設備異常停止中" },
  3: { eng: "other", chn: "設備異常停止中" },
  4: { eng: "other", chn: ":機台暫停" },
  5: { eng: "alarm", chn: "設備警報通知(不停機)" },
  6: { eng: "other", chn: "設備保養" },
};

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
        suctionCupGasOption: {
          min: 0,
          max: 100,
          data: 70,
          optionData: 70,
          color: "#00A9FF",
          earlyWarning: 50,
          warning: 60,
        },
        cylinderGasOption: {
          min: 0,
          max: 100,
          data: 70,
          optionData: 70,
          color: "#00A9FF",
          earlyWarning: 50,
          warning: 60,
        },
        suctionNozzleLifeOption: {
          min: 0,
          max: 100,
          data: 70,
          optionData: 70,
          color: "#00A9FF",
          earlyWarning: 50,
          warning: 60,
        },
        powerConsumptionOption: {
          min: 0,
          max: 100,
          data: 70,
          optionData: 70,
          color: "#00A9FF",
          earlyWarning: 50,
          warning: 60,
        },
      },
      colorList: ["#00A9FF", "#FFFF00", "#FF0000"],
      dataAnalysis: {
        planQty: 0,
        nowQty: 0,
        completionRate: 0,
      },
      dataAlarmList: [],
      alarmFrequencyData: [
        { period: "01-08 00", sum: 820 },
        { period: "01-08 01", sum: 932 },
        { period: "01-08 02", sum: 901 },
        { period: "01-08 03", sum: 934 },
        { period: "01-08 04", sum: 1290 },
        { period: "01-08 05", sum: 1330 },
        { period: "01-08 06", sum: 1320 },
        { period: "01-08 07", sum: 820 },
        { period: "01-08 08", sum: 932 },
        { period: "01-08 09", sum: 901 },
        { period: "01-08 10", sum: 934 },
        { period: "01-08 11", sum: 1290 },
        { period: "01-08 12", sum: 1330 },
        { period: "01-08 13", sum: 1320 },
        { period: "01-08 14", sum: 901 },
        { period: "01-08 15", sum: 934 },
        { period: "01-08 16", sum: 1290 },
        { period: "01-08 17", sum: 1330 },
        { period: "01-08 18", sum: 1320 },
        { period: "01-08 19", sum: 820 },
        { period: "01-08 20", sum: 932 },
        { period: "01-08 21", sum: 901 },
        { period: "01-08 22", sum: 934 },
        { period: "01-08 23", sum: 1290 },
      ],
      middleVideoList: {
        maintenanceDate: "2022-09-06",
        runingStatus: {
          textStyle: "video-title-text-right-normal",
          text: "設備啟動運轉中",
          icon: "el-icon-normal",
        },
      },
      refreshTimer: undefined,
    };
  },
  mounted() {
    if (this.$route.params.equipmentIp == undefined) this.equipmentIp = "/";
    else this.equipmentIp = this.$route.params.equipmentIp;
    this.init();

    this.timer = setInterval(() => {
      this.init();
    }, 5000); //单位是毫
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
                color: this.statusList.suctionCupGasOption.color,
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: this.statusList.suctionCupGasOption.color,
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
                color: this.statusList.suctionCupGasOption.color,
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
                color: this.statusList.cylinderGasOption.color,
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: this.statusList.cylinderGasOption.color,
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
                color: this.statusList.cylinderGasOption.color,
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
                color: this.statusList.suctionNozzleLifeOption.color,
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: this.statusList.suctionNozzleLifeOption.color,
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
                color: this.statusList.suctionNozzleLifeOption.color,
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
                color: this.statusList.powerConsumptionOption.color,
              },
            },
            // 指针
            pointer: {
              itemStyle: {
                color: this.statusList.powerConsumptionOption.color,
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
                color: this.statusList.powerConsumptionOption.color,
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
    alarmFrequencyOption() {
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          textStyle: {
            fontSize: 15,
            color: "rgba(251, 248, 248, 1)",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.alarmFrequencyData.map((e) => e.period),
        },
        yAxis: {
          name: "个",
          type: "value",
        },
        series: [
          {
            name: "报警频次数",
            data: this.alarmFrequencyData.map((e) => e.sum),
            type: "line",
            areaStyle: {},
          },
        ],
      };
    },
  },
  methods: {
    init() {
      this.fatchData();
      this.fetchLeftStatusData();
      this.fetchDataAlarmList();
      this.fetchAlarmFrequencyData();
      this.fetchMaintenanceDateAndRuningStaus();
      this.reloadProductionConfig();
    },
    fatchData() {
      fetchData({ equipmentIp: this.equipmentIp }).then((response) => {
        var json = JSON.parse(response.data);
        this.equipmentName = json.machineName;
        this.setDataAnalysis(json);

        // this.dataAnalysis.numberOfPlans = this.getNumberOfPlans(
        //   new Date().getDay(),
        //   json
        // );
      });
    },
    // 加载设备状态，主要是那右侧那几个仪表盘的数据
    fetchLeftStatusData() {
      console.log(this.statusList);
      fetchLeftStatusData({ equipmentIp: this.equipmentIp }).then(
        (response) => {
          var json = JSON.parse(response.data);
          this.statusList.suctionCupGasOption.data = json.suctionCupGas;
          var result = json.suctionCupGas / 1000;
          this.statusList.suctionCupGasOption.OptionData = result;
          if (
            result >= this.statusList.suctionCupGasOption.earlyWarning &&
            result < this.statusList.suctionCupGasOption.warning
          ) {
            this.statusList.suctionCupGasOption.color = this.colorList[1];
          } else if (result >= this.statusList.suctionCupGasOption.warning) {
            this.statusList.suctionCupGasOption.color = this.colorList[2];
          } else {
            this.statusList.suctionCupGasOption.color = this.colorList[0];
          }

          this.statusList.cylinderGasOption.data = json.cylinderGas;
          result = json.cylinderGas / 100;
          this.statusList.cylinderGasOption.optionData = result;
          if (
            result >= this.statusList.cylinderGasOption.earlyWarning &&
            result < this.statusList.cylinderGasOption.warning
          ) {
            this.statusList.cylinderGasOption.color = this.colorList[1];
          } else if (result >= this.statusList.cylinderGasOption.warning) {
            this.statusList.cylinderGasOption.color = this.colorList[2];
          } else {
            this.statusList.cylinderGasOption.color = this.colorList[0];
          }

          this.statusList.suctionNozzleLifeOption.data = json.suctionNozzleLife;
          result = json.suctionNozzleLife / 1000;
          this.statusList.suctionNozzleLifeOption.optionData = result;
          if (
            result >= this.statusList.suctionNozzleLifeOption.earlyWarning &&
            result < this.statusList.suctionNozzleLifeOption.warning
          ) {
            this.statusList.suctionNozzleLifeOption.color = this.colorList[1];
          } else if (
            result >= this.statusList.suctionNozzleLifeOption.warning
          ) {
            this.statusList.suctionNozzleLifeOption.color = this.colorList[2];
          } else {
            this.statusList.suctionNozzleLifeOption.color = this.colorList[0];
          }

          this.statusList.powerConsumptionOption.data = json.powerConsumPtion;
          result = json.powerConsumPtion / 100;
          this.statusList.powerConsumptionOption.optionData = result;
          if (
            result >= this.statusList.powerConsumptionOption.earlyWarning &&
            result < this.statusList.powerConsumptionOption.warning
          ) {
            this.statusList.powerConsumptionOption.color = this.colorList[1];
          } else if (result >= this.statusList.powerConsumptionOption.warning) {
            this.statusList.powerConsumptionOption.color = this.colorList[2];
          } else {
            this.statusList.powerConsumptionOption.color = this.colorList[0];
          }
        }
      );
    },
    // 加载报警信息表格数据数据
    fetchDataAlarmList() {
      fetchDataAlarmList({ equipmentIp: this.equipmentIp }).then((res) => {
        var json = JSON.parse(res.data);
        //if()
        this.dataAlarmList = json.items;
      });
    },
    // 加载报警频次折线图数据
    fetchAlarmFrequencyData() {
      var now = new Date();
      var endTime = parseTime(now);
      var yesterday = now.setDate(now.getDate() - 1);
      var startTime = parseTime(yesterday);
      // var startTime = "2022-01-08 16:00:00";
      // var endTime = "2022-01-09 16:00:00";
      fetchAlarmFrequencyData({
        ipAddr: this.equipmentIp,
        startTime: startTime,
        endTime: endTime,
      }).then((res) => {
        var json = JSON.parse(res.data);
        if (json != undefined && json.items != null) {
          var data = [];
          json.items.forEach((element) => {
            data.push({
              period: element.period.substring(5),
              sum: element.sum,
            });
          });
          this.alarmFrequencyData = data;
        }
      });
    },
    // 加载视频上方悬浮的保养日期和设备运行状态数据
    fetchMaintenanceDateAndRuningStaus() {
      fetchMaintenanceDateAndRuningStausData({
        equipmentIp: this.equipmentIp,
      }).then((res) => {
        var json = JSON.parse(res.data);
        if (json != null) {
          var data = {};
          json.items.forEach((element) => {
            if (element.maintenanceDate != null)
              data.maintenanceDate = element.maintenanceDate.substr(0, 10);
            else data.maintenanceDate = "未设置";
            data.runingStatus = this.SetRuningStatus(element.machineStatus);
          });
          this.middleVideoList = data;
        }
      });
    },
    reloadProductionConfig() {
      reloadProductionConfig({ equipmentIp: this.equipmentIp }).then((res) => {
        var json = JSON.parse(res.data);
        if (json != null) this.setStatusList(json);
      });
    },
    // 设置左侧那几个仪表盘的取值范围
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
    // 设置数据分析数据，包括今日计划数
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
    //设置视频右侧运行状态
    SetRuningStatus(val) {
      return {
        textStyle: "video-title-text-right-" + statusName[val].eng,
        text: statusName[val].chn,
        icon: "el-icon-" + statusName[val].eng,
      };
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
  destroyed: function () {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.refreshTimer);
    this.refreshTimer = null;
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
